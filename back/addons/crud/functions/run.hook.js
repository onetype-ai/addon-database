// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.hook', async function(name, context)
{
    const result = await onetype.middlewares.run(name, context);

    database.crud.Fn('assert.middleware', result, name);

    return result.value;
});
