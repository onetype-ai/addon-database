// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'between',
    validate: (filter, validation) =>
    {
        validation.field(filter.field);
        validation.between(filter.value);
    },
    build: (query, method, filter) =>
    {
        return query[method + 'Between'](filter.field, filter.value);
    }
});
