// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'one',
    type: ['find'],
    async callback(chain, set = false)
    {
        chain.query.limit = 1;
        const results = await chain.many(set);
        return results.length > 0 ? results[0] : null;
    }
});
