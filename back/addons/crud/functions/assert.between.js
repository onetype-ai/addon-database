// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('assert.between', function(value)
{
    if(!Array.isArray(value) || value.length !== 2)
    {
        throw onetype.Error(400, 'BETWEEN requires an array of exactly 2 elements.');
    }
});
