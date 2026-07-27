// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('assert.middleware', function(result, name)
{
    if(!result.errors.length)
    {
        return result;
    }

    const first = result.errors[0];

    throw onetype.Error(first.code ? first.code : 500, 'The hook :name: refused: :reason:.', {
        name: name,
        reason: first.message ? first.message : String(first)
    });
});
