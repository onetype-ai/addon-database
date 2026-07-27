// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('assert.field', function(field)
{
    if(typeof field !== 'string' || !(/^[a-zA-Z][a-zA-Z0-9_\.]{0,63}$/.test(field)))
    {
        throw onetype.Error(400, 'Invalid field name :field:.', { field });
    }
});
