// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'null',
    validate: (filter, validation) =>
    {
        return validation.field(filter.field);
    },
    build: (query, method, filter) =>
    {
        return query[method + 'Null'](filter.field);
    }
});
