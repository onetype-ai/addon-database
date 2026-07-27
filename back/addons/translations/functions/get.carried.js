// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.translations.Fn('get.carried', function(item, field)
{
    const value = item.Get(field);

    if(value === null)
    {
        return false;
    }

    return value !== undefined;
});
