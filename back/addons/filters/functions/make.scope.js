// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('make.scope', function(query, group, parent)
{
    const frame = {};

    this.added = (field, value, operator, type) =>
    {
        this.Fn('do.push', query, group, {
            field: field,
            value: value,
            operator: operator,
            type: type
        });

        return frame;
    };

    frame.filter = (field, value, operator = 'EQUALS') =>
    {
        return this.added(field, value, operator, 'AND');
    };

    frame.orFilter = (field, value, operator = 'EQUALS') =>
    {
        return this.added(field, value, operator, 'OR');
    };

    frame.group = (type = 'AND') =>
    {
        const child = {
            kind: 'group',
            type: type,
            children: []
        };

        group.children.push(child);

        return this.Fn('make.scope', query, child, frame);
    };

    frame.end = () =>
    {
        return parent;
    };

    return frame;
});
