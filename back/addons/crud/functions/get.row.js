// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.row', async function(addon, id)
{
    if(!id || (typeof id !== 'string' && typeof id !== 'number'))
    {
        return { refused: ['The row to act on was named by neither a string nor a number.', 400] };
    }

    const item = await addon.Find().filter('id', id).one(true);

    if(!item)
    {
        return { refused: ['The row ' + id + ' is not in ' + addon.name + '.', 404] };
    }

    return {
        item: item,
        refused: null
    };
});
