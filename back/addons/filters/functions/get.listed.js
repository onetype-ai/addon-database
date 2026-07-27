// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('get.listed', function(value)
{
    if(Array.isArray(value))
    {
        return value;
    }

    if(value === null || value === undefined || value === '')
    {
        return [];
    }

    return [value];
});
