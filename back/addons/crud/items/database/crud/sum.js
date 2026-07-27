// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'sum',
    type: ['find'],
    async callback(chain, field)
    {
        return database.crud.Fn('get.aggregate', chain.query, 'sum', field);
    }
});
