// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.operation', async function(commands, id, operation, http)
{
    this.answered = (data, message, code) =>
    {
        return {
            data: data,
            message: message,
            code: code
        };
    };

    if(!id)
    {
        return this.answered(null, 'The operation ' + operation.type + ' is not one this api runs.', 400);
    }

    const command = commands.ItemGet(id);

    if(!command)
    {
        return this.answered(null, 'The command ' + id + ' is not registered.', 404);
    }

    try
    {
        const result = await command.Fn('run', operation.data, { http: http });

        return this.answered(result.data, result.message, result.code);
    }
    catch(error)
    {
        return this.answered(null, error.message, 500);
    }
});
