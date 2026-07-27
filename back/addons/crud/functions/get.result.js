// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.result', async function(find, properties)
{
    this.aggregated = async () =>
    {
        const type = properties.aggregate.type;

        if(!['sum', 'avg', 'min', 'max'].includes(type))
        {
            return { refused: ['The aggregate ' + type + ' is not one of sum, avg, min, max.', 400] };
        }

        return { answered: { value: await find[type](properties.aggregate.field) } };
    };

    this.measured = async () =>
    {
        const asked = properties.metrics;

        return { answered: { data: await find.metrics(asked.field, asked.interval, asked.aggregate, asked.value) } };
    };

    if(properties.count)
    {
        return { answered: { value: await find.count() } };
    }

    find.page(properties.page ? properties.page : 1);
    find.limit(Math.min(properties.limit ? properties.limit : 50, 500));

    if(properties.aggregate)
    {
        return this.aggregated();
    }

    if(properties.metrics)
    {
        return this.measured();
    }

    return { plain: await find.plain() };
});
