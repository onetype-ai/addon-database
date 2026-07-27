// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.ItemOn('add', function(item)
{
    const held = database.schema.StoreGet('registered');
    const registered = held ? held : [];

    registered.forEach((addon) => database.schema.Fn('do.queue', addon, item.Get('id')));
});
