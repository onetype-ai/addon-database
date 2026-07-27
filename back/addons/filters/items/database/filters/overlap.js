// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Item({
    id: 'overlap',
    validate: (filter, validation) =>
    {
        validation.field(filter.field);

        filter.value = database.filters.Fn('get.listed', filter.value);

        return filter.value.length ? undefined : false;
    },
    build: (query, method, filter) =>
    {
        return query[method](function()
        {
            filter.value.forEach((value) => this.orWhereJsonSupersetOf(filter.field, [value]));
        });
    }
});
