// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('assert.value', function(value)
{
    if(value !== null && !['number', 'string', 'boolean'].includes(typeof value))
    {
        throw onetype.Error(400, 'Value must be string, number, or boolean, got :type:.', { type: typeof value });
    }
});
