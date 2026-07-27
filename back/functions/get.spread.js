// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('get.spread', function(addon)
{
    for(const field of Object.values(addon.Fields().data))
    {
        if(onetype.DataParseConfig(field.define).metadata?.spread)
        {
            return field.name;
        }
    }

    return null;
});
