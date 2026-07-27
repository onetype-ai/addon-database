// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'metrics',
    type: ['find'],
    async callback(chain, field, interval, aggregate, value)
    {
        const query = chain.query;

        if(query.impossible)
        {
            return [];
        }

        const from = query.from ? query.from : query.addon.Table().name;
        const knex = query.knex(from);

        const middleware = await onetype.middlewares.run('@database.find.execute', { knex, query });

        database.crud.Fn('assert.middleware', middleware, '@database.find.execute');

        field = database.Fn('get.column', query.addon, field);
        value = value ? database.Fn('get.column', query.addon, value) : value;

        return database.metrics.Fn('make.build', knex, query, {
            field: field,
            interval: interval,
            aggregate: aggregate,
            value: value
        });
    }
});
