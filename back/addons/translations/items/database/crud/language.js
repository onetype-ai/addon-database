// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'language',
    type: ['find', 'create', 'update'],
    callback(chain, language)
    {
        database.translations.Fn('get.target', chain).language = language;

        return chain;
    }
});
