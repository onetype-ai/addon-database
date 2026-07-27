// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.ItemOn('add', function(item)
{
    if(item.Get('connection'))
    {
        return;
    }

    item.Set('connection', database.Fn('make.connection', item));
});
