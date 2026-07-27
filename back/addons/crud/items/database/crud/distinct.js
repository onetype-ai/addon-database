// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'distinct',
    type: ['find'],
    callback(chain, value = true)
    {
        chain.query.distinct = Boolean(value);
        return chain;
    }
});
