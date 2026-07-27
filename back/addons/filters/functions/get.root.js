// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('get.root', function(chain)
{
    if(!chain.query.filters)
    {
        chain.query.filters = {
            kind: 'group',
            type: 'AND',
            children: []
        };
    }

    if(!chain.query.impossible)
    {
        chain.query.impossible = false;
    }

    return chain.query.filters;
});
