// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.exposed', function(name, operation)
{
    const addon = onetype.AddonGet(name);

    if(!addon)
    {
        return { refused: ['The addon ' + name + ' is not registered.', 404] };
    }

    const expose = addon.Expose();

    if(!expose)
    {
        return { refused: ['The addon ' + name + ' is not open to the database api.', 403] };
    }

    if(!expose[operation])
    {
        return { refused: ['The addon ' + name + ' does not open ' + operation + ' to the database api.', 403] };
    }

    return {
        addon: addon,
        expose: expose,
        refused: null
    };
});
