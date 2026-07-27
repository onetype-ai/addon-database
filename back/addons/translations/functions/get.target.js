// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.translations.Fn('get.target', function(chain)
{
    return chain.operation === 'find' ? chain.query : chain.context;
});
