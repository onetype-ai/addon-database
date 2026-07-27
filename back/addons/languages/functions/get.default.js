// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.languages.Fn('get.default', function()
{
    const marked = Object.values(this.Items()).find((item) => item.Get('default'));

    if(marked)
    {
        return marked.Get('id');
    }

    const first = this.Fn('get.codes')[0];

    return first ? first : null;
});
