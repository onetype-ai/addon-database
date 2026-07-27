// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.languages.Fn('get.codes', function()
{
    return Object.values(this.Items())
        .sort((first, second) => first.Get('order') - second.Get('order'))
        .map((item) => item.Get('id'));
});
