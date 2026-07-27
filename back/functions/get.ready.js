// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('get.ready', function()
{
    return database.schema.StoreGet('chain') ? database.schema.StoreGet('chain') : Promise.resolve();
});
