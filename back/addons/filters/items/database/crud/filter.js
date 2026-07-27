// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'filter',
    type: ['find'],
    callback(chain, field, value, operator = 'EQUALS')
    {
        database.filters.Fn('do.push', chain.query, database.filters.Fn('get.root', chain), {
            field: field,
            value: value,
            operator: operator,
            type: 'AND'
        });

        return chain;
    }
});
