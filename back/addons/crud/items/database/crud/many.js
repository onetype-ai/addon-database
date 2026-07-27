// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'many',
    type: ['find'],
    async callback(chain, set = false)
    {
        const query = chain.query;

        const result = await database.crud.Fn('run.execute', query, (knex) =>
        {
            knex[query.distinct ? 'distinct' : 'select'](query.select ? query.select : '*');

            if(query.sort)
            {
                knex.orderBy(query.sort.field, query.sort.direction);
            }

            if(query.limit > 0)
            {
                knex.limit(query.limit);

                if(query.offset)
                {
                    knex.offset(query.offset);
                }
                else if(query.page > 1)
                {
                    knex.offset((query.page - 1) * query.limit);
                }
            }
        });

        const rows = await result;
        let records = rows.map((record) => database.Fn('map.cast', query.addon, record));

        const after = await onetype.middlewares.run('@database.find.transform', { records, query });

        database.crud.Fn('assert.middleware', after, '@database.find.transform');

        return after.value.records.map((data) => query.addon.ItemAdd(data, null, set, set));
    }
});
