// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('get.describe', async function(trx, body)
{
    await trx.raw(`CREATE TABLE _onetype_describe (${body.join(', ')})`);

    const columns = await database.schema.Fn('get.columns', trx, '_onetype_describe');

    await trx.raw('DROP TABLE _onetype_describe');

    return columns;
});
