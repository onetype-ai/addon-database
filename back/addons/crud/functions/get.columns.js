// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.columns', function(addon)
{
    const columns = [];

    for(const field of Object.values(addon.Fields().data))
    {
        const parsed = onetype.DataParseConfig(field.define);

        if(parsed.virtual)
        {
            continue;
        }

        columns.push({
            name: parsed.metadata?.column ? parsed.metadata.column : field.name,
            line: null,
            array: false,
            primary: field.name === 'id',
            auto: field.name === 'id'
        });
    }

    return columns;
});
