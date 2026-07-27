// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.middlewares.intercept('@database.find.execute', async (middleware) =>
{
    const { knex, query } = middleware.value;

    if(query.filters?.children?.length)
    {
        database.filters.Fn('make.build', knex, query.filters);
    }

    await middleware.next();
});
