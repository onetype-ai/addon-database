// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.joins.Fn('do.apply', function(find, joins)
{
    this.narrowed = (sub, join) =>
    {
        (join.filters ? join.filters : []).forEach((filter) =>
        {
            sub.filter(filter.field, filter.value, filter.operator ? filter.operator : 'EQUALS');
        });

        join.search && sub.search(join.search);
    };

    this.shaped = (sub, join) =>
    {
        join.select && sub.select(join.select);

        join.sort && sub.sort(join.sort.field, join.sort.direction ? join.sort.direction : 'asc');
    };

    this.nested = (sub, join) =>
    {
        this.narrowed(sub, join);
        this.shaped(sub, join);

        join.joins && this.Fn('do.apply', sub, join.joins);
    };

    (joins ? joins : []).forEach((join) =>
    {
        find.join(join.addon, join.field, join.output, (sub) =>
        {
            this.nested(sub, join);
        });
    });
});
