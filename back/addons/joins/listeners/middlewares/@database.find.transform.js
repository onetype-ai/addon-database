// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.middlewares.intercept('@database.find.transform', async (middleware) =>
{
    const { records, query } = middleware.value;

    if(query.joins?.length)
    {
        middleware.value.records = await database.joins.Fn('make.build', records, query.joins);
    }

    await middleware.next();
});
