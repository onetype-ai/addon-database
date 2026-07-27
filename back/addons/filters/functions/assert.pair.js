// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('assert.pair', function(filter, validation)
{
    validation.field(filter.field);
    validation.value(filter.value);
});
