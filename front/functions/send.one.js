// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('send.one', async function(entry)
{
    try
    {
        const response = await fetch('/api/database/' + entry.type, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry.data)
        });

        const result = await response.json();

        entry.resolve({
            data: result.data,
            message: result.message,
            code: result.code
        });
    }
    catch(error)
    {
        entry.resolve({
            data: null,
            message: error.message,
            code: 500
        });
    }
});
