// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('get.method', function(index, type)
{
    if(index === 0)
    {
        return 'where';
    }

    return type === 'OR' ? 'orWhere' : 'where';
});
