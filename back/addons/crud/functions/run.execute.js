// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.execute', async function(query, build, empty = [])
{
    if(query.impossible)
    {
        return empty;
    }

    const knex = query.knex(query.from ? query.from : query.addon.Table().name);

    build(knex);

    const middleware = await onetype.middlewares.run('@database.find.execute', { knex, query });

    database.crud.Fn('assert.middleware', middleware, '@database.find.execute');

    return query.records !== undefined ? query.records : knex;
});
