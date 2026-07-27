// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.emitters.catch('onetype.addon.item.init', (item) =>
{
    item.Create = function({ connection = 'primary' } = {})
    {
        return database.crud.Fn('make.chain', 'create', { item, connection });
    };

    item.Update = function({ connection = 'primary' } = {})
    {
        return database.crud.Fn('make.chain', 'update', { item, connection });
    };

    item.Delete = function({ connection = 'primary' } = {})
    {
        return database.crud.Fn('make.chain', 'delete', { item, connection });
    };
});
