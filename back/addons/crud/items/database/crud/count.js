// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'count',
    type: ['find'],
    async callback(chain)
    {
        const query = chain.query;
        const result = await database.crud.Fn('run.execute', query, (knex) => knex.count('* as count'), 0);

        if(query.total !== undefined)
        {
            return query.total;
        }

        return typeof result === 'number' ? result : parseInt(result[0]?.count ? result[0].count : 0);
    }
});
