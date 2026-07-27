// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'equals',
    validate: (filter, validation) =>
    {
        return database.filters.Fn('assert.pair', filter, validation);
    },
    build: (query, method, filter) =>
    {
        if(filter.value === null)
        {
            return query[method + 'Null'](filter.field);
        }

        return query[method](filter.field, '=', filter.value);
    }
});
