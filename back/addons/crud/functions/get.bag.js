// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.bag', function(item, columns)
{
    this.loose = (declared, field) =>
    {
        const parsed = onetype.DataParseConfig(field.define);

        if(parsed.virtual || parsed.metadata?.spread)
        {
            return false;
        }

        return !declared.has(database.Fn('get.column', item.addon, field.name));
    };

    const declared = new Set(columns.map((column) => column.name));
    const bag = {};

    Object.values(item.addon.Fields().data)
        .filter((field) => this.loose(declared, field))
        .forEach((field) =>
        {
            bag[field.name] = item.Get(field.name);
        });

    return bag;
});
