// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'page',
    type: ['find'],
    callback(chain, page)
    {
        if(typeof page !== 'number' || !Number.isInteger(page) || page < 1)
        {
            throw onetype.Error(400, 'Page must be >= 1, received :page:.', { page });
        }

        chain.query.page = page;
        return chain;
    }
});
