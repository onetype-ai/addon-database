// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.fields', function(item, { update = false, whitelist = null } = {})
{
    const fields = {};
    const skip = new Set();
    const map = database.Fn('get.map', item.addon);

    let { columns } = database.schema.Fn('make.parse', item.addon.Schema());

    if(!columns.length)
    {
        columns = database.crud.Fn('get.columns', item.addon);
    }

    for(const column of columns)
    {
        if(column.primary && (column.auto || update))
        {
            continue;
        }

        const name = map[column.name] ? map[column.name] : column.name;

        if(update && (name === 'created' || name === 'created_at'))
        {
            continue;
        }

        const field = item.addon.FieldGet(name);

        if(!field)
        {
            continue;
        }

        const parsed = onetype.DataParseConfig(field.define);

        if(update && whitelist && !whitelist.includes(name) && !parsed.metadata?.spread)
        {
            skip.add(name);
            continue;
        }

        try
        {
            if(parsed.metadata?.spread)
            {
                fields[column.name] = JSON.stringify(database.crud.Fn('get.bag', item, columns));
            }
            else
            {
                fields[column.name] = column.array ? item.Get(name) : database.Fn('map.serialize', item.Get(name), parsed.type.split('|')[0]);
            }
        }
        catch(error)
        {
            throw onetype.Error(500, 'The field :field: could not be written: :reason:.', {
                field: name,
                reason: error.message
            });
        }
    }

    const declared = new Set(columns.map((column) => column.name));
    const stamps = update ? ['updated', 'updated_at'] : ['created', 'created_at', 'updated', 'updated_at'];

    stamps.forEach((name) =>
    {
        if(!declared.has(name))
        {
            return;
        }

        if((name === 'created' || name === 'created_at') && item.Get(name))
        {
            return;
        }

        fields[name] = new Date().toISOString();
    });

    return { fields, skip };
});
