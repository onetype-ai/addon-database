// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'sort',
    type: ['find'],
    callback(chain, field, direction = 'asc')
    {
        database.crud.Fn('assert.field', field);

        direction = String(direction).toLowerCase();

        if(!['asc', 'desc'].includes(direction))
        {
            throw onetype.Error(400, 'Invalid sort direction :direction:.', { direction });
        }

        chain.query.sort = { field: database.Fn('get.column', chain.query.addon, field), direction };
        return chain;
    }
});
