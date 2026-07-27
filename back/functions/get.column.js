// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('get.column', function(addon, name)
{
    const field = addon.FieldGet(name);

    if(!field)
    {
        return name;
    }

    const column = onetype.DataParseConfig(field.define).metadata?.column;

    return column ? column : name;
});
