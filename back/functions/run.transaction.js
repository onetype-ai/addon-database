// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('run.transaction', async function(name = 'primary', callback)
{
    const knex = database.Fn('get.connection', name);

    return await knex.transaction(callback);
});
