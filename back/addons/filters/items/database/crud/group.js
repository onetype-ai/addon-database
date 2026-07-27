// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'group',
    type: ['find'],
    callback(chain, type = 'AND')
    {
        const child = {
            kind: 'group',
            type: type,
            children: []
        };

        database.filters.Fn('get.root', chain).children.push(child);

        return database.filters.Fn('make.scope', chain.query, child, chain);
    }
});
