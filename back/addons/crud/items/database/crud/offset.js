// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'offset',
    type: ['find'],
    callback(chain, offset)
    {
        chain.query.offset = offset;
        return chain;
    }
});
