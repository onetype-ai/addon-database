// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'exists',
    type: ['find'],
    async callback(chain)
    {
        chain.query.limit = 1;
        return (await chain.count()) > 0;
    }
});
