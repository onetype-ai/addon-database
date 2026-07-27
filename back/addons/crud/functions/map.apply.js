// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('map.apply', function(item, record, skip = null)
{
    const data = database.Fn('map.cast', item.addon, record);

    Object.entries(data).forEach(([key, value]) =>
    {
        if(skip && skip.has(key))
        {
            return;
        }

        item.Set(key, value);
    });
});
