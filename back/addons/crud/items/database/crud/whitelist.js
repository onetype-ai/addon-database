// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'whitelist',
    type: ['update'],
    callback(chain, fields)
    {
        chain.context.whitelist = fields;
        return chain;
    }
});
