// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'plain',
    type: ['find'],
    async callback(chain)
    {
        const query = chain.query;

        const [items, total] = await Promise.all([
            chain.many(false),
            chain.count()
        ]);

        return {
            items: items.map((item) => item.GetData()),
            total,
            page: query.page,
            pages: query.limit > 0 ? Math.ceil(total / query.limit) : 1,
            limit: query.limit
        };
    }
});
