// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'not.null',
    validate: (filter, validation) =>
    {
        return validation.field(filter.field);
    },
    build: (query, method, filter) =>
    {
        return query[method + 'NotNull'](filter.field);
    }
});
