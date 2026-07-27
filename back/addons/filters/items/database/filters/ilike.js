// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'ilike',
    validate: (filter, validation) =>
    {
        return database.filters.Fn('assert.pair', filter, validation);
    },
    build: (query, method, filter) =>
    {
        return query[method + 'ILike'](filter.field, filter.value);
    }
});
