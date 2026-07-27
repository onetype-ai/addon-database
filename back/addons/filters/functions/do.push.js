// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('do.push', function(query, group, filter)
{
    this.rules = () =>
    {
        return {
            field: (field) =>
            {
                return database.crud.Fn('assert.field', field);
            },
            value: (value) =>
            {
                return database.crud.Fn('assert.value', value);
            },
            between: (value) =>
            {
                return database.crud.Fn('assert.between', value);
            }
        };
    };

    const item = this.Fn('get.operator', filter.operator);

    const written = {
        kind: 'filter',
        field: database.Fn('get.column', query.addon, filter.field),
        value: filter.value,
        operator: item.Get('id'),
        type: filter.type
    };

    const validate = item.Get('validate');

    if(validate && validate.call({}, written, this.rules(), query) === false)
    {
        return;
    }

    group.children.push(written);
});
