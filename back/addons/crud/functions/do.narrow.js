// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('do.narrow', function(find, expose, properties)
{
    this.filtered = () =>
    {
        for(const filter of properties.filters ? properties.filters : [])
        {
            if(!expose.filter.includes(filter.field))
            {
                return ['The field ' + filter.field + ' is not open to filtering.', 400];
            }

            find.filter(filter.field, filter.value, filter.operator ? filter.operator : 'EQUALS');
        }

        return null;
    };

    this.sorted = () =>
    {
        if(!properties.sort_field)
        {
            return null;
        }

        if(!expose.sort.includes(properties.sort_field))
        {
            return ['The field ' + properties.sort_field + ' is not open to sorting.', 400];
        }

        find.sort(properties.sort_field, properties.sort_direction ? properties.sort_direction : 'asc');

        return null;
    };

    const refused = this.filtered();

    if(refused)
    {
        return refused;
    }

    properties.search && find.search(properties.search);
    properties.distinct && find.distinct();
    properties.offset && find.offset(properties.offset);

    database.joins.Fn('do.apply', find, properties.joins);

    return this.sorted();
});
