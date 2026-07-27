// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'has',
    validate: (filter, validation) =>
    {
        return validation.field(filter.field);
    },
    build: (query, method, filter) =>
    {
        return query[method + 'JsonSupersetOf'](filter.field, database.filters.Fn('get.listed', filter.value));
    }
});
