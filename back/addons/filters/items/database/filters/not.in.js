// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'not.in',
    validate: (filter, validation) =>
    {
        validation.field(filter.field);

        if(Array.isArray(filter.value) && filter.value.length)
        {
            return;
        }

        return false;
    },
    build: (query, method, filter) =>
    {
        return query[method](filter.field, 'not in', filter.value);
    }
});
