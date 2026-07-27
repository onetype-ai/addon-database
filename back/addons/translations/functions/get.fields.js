// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.translations.Fn('get.fields', function(addon)
{
    this.spelled = () =>
    {
        return Object.values(addon.fields.data)
            .filter((field) => String(field.define.type).split('|').includes('string'))
            .filter((field) => !['id', 'created_at', 'updated_at'].includes(field.name))
            .map((field) => field.name);
    };

    const asked = addon.Translations();

    if(!asked)
    {
        return null;
    }

    return asked === true ? this.spelled() : asked;
});
