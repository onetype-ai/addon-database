// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.aggregate', async function(query, type, field)
{
    database.crud.Fn('assert.field', field);

    field = database.Fn('get.column', query.addon, field);

    const result = await database.crud.Fn('run.execute', query, (knex) => knex[type](`${field} as result`), 0);

    return typeof result === 'number' ? result : parseFloat(result[0]?.result ? result[0].result : 0);
});
