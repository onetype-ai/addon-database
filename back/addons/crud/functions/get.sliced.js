// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.sliced', function(result, expose, properties)
{
    this.allowed = () =>
    {
        if(properties.select?.length)
        {
            return properties.select.filter((field) => expose.select.includes(field));
        }

        return [...expose.select];
    };

    this.joined = (allowed) =>
    {
        for(const join of properties.joins ? properties.joins : [])
        {
            if(join.output && !allowed.includes(join.output))
            {
                allowed.push(join.output);
            }
        }

        return allowed;
    };

    if(!expose.select || !expose.select.length)
    {
        return result;
    }

    const allowed = this.joined(this.allowed());

    result.items = result.items.map((item) =>
    {
        const written = {};

        allowed.forEach((field) =>
        {
            written[field] = item[field];
        });

        return written;
    });

    return result;
});
