// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.init', (addon) =>
{
    addon.database = { table: null };

    addon.Table = function(value)
    {
        if(value === undefined)
        {
            return addon.database.table;
        }

        const table = addon.database.table = {};

        if(typeof value === 'function')
        {
            value({
                Name(name)
                {
                    table.name = name;
                }
            });

            return;
        }

        table.name = value;
    };
});
