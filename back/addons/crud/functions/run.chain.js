// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.chain', function(chain)
{
    return database.crud.Fn('run.' + chain.operation, chain);
});
