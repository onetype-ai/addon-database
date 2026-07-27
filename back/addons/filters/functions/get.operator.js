// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('get.operator', function(operator)
{
    const named = String(operator).trim().toLowerCase().replaceAll(' ', '.');
    const item = this.ItemGet(named);

    if(!item)
    {
        throw onetype.Error(400, 'The filter operator :operator: is not registered.', { operator: operator });
    }

    return item;
});
