// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('get.map', function(addon)
{
    const map = {};

    for(const field of Object.values(addon.Fields().data))
    {
        const column = onetype.DataParseConfig(field.define).metadata?.column;

        if(column)
        {
            map[column] = field.name;
        }
    }

    return map;
});
