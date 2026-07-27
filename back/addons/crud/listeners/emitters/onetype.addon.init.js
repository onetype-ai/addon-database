// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.emitters.catch('onetype.addon.init', (addon) =>
{
    addon.database.expose = null;

    addon.Find = function({ connection = 'primary' } = {})
    {
        return database.crud.Fn('make.chain', 'find', { addon, connection });
    };

    addon.Expose = function(config)
    {
        if(config === undefined)
        {
            return addon.database.expose;
        }

        addon.database.expose = onetype.DataDefine(config, database.crud.Fn('get.expose'));
    };
});
