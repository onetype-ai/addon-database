// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('send.many', async function(batch)
{
    this.asked = () =>
    {
        return batch.map((entry) =>
        {
            return {
                type: entry.type,
                data: entry.data
            };
        });
    };

    this.refused = (batch, message, code) =>
    {
        batch.forEach((entry) =>
        {
            entry.resolve({
                data: null,
                message: message,
                code: code
            });
        });
    };

    this.handed = (batch, results) =>
    {
        batch.forEach((entry, place) =>
        {
            const answered = results[place];

            if(!answered)
            {
                return this.refused([entry], 'The batch answered nothing for this call.', 500);
            }

            entry.resolve({
                data: answered.data,
                message: answered.message,
                code: answered.code
            });
        });
    };

    try
    {
        const response = await fetch('/api/database/batch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ operations: this.asked() })
        });

        const result = await response.json();

        if(result.code !== 200 || !result.data?.results)
        {
            const message = result.message ? result.message : 'The batch failed.';

            return this.refused(batch, message, result.code ? result.code : 500);
        }

        this.handed(batch, result.data.results);
    }
    catch(error)
    {
        this.refused(batch, error.message, 500);
    }
});
