// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'search',
    type: ['find'],
    callback(chain, term)
    {
        chain.query.search = typeof term === 'string' && term.trim() ? term.trim() : null;
        return chain;
    }
});
