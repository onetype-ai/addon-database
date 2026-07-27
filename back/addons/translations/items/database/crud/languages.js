// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'languages',
    type: ['find', 'create', 'update'],
    callback(chain, languages)
    {
        database.translations.Fn('get.target', chain).languages = languages;

        return chain;
    }
});
