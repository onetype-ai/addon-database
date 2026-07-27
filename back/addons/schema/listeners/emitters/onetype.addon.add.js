// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.emitters.catch('onetype.addon.add', (addon) =>
{
    if(!addon.Table || !addon.Table() || !addon.Schema().length)
    {
        return;
    }

    const held = database.schema.StoreGet('registered');
    const registered = held ? held : [];

    registered.push(addon);
    database.schema.StoreSet('registered', registered);

    Object.keys(database.Items()).forEach((connection) => database.schema.Fn('do.queue', addon, connection));
});
