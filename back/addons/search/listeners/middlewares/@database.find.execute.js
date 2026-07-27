// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.middlewares.intercept('@database.find.execute', async (middleware) =>
{
    const { knex, query } = middleware.value;

    if(!query.search)
    {
        return await middleware.next();
    }

    const fields = query.addon.Search();

    if(!fields || !fields.length)
    {
        throw onetype.Error(400, 'Search not configured on :addon:.', { addon: query.addon.name });
    }

    const term = '%' + query.search.replace(/[\\%_]/g, '\\$&') + '%';
    const columns = fields.map((field) => database.Fn('get.column', query.addon, field));

    knex.where(function()
    {
        for(let place = 0; place < columns.length; place++)
        {
            const method = place === 0 ? 'whereILike' : 'orWhereILike';
            this[method](columns[place], term);
        }
    });

    await middleware.next();
});
