// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'limit',
    type: ['find'],
    callback(chain, limit)
    {
        if(typeof limit !== 'number' || !Number.isInteger(limit) || limit <= 0)
        {
            throw onetype.Error(400, 'Limit must be a positive integer, received :limit:.', { limit });
        }

        chain.query.limit = limit;
        return chain;
    }
});
