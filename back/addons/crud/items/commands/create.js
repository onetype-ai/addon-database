// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'database:crud:create',
        exposed: true,
        method: 'POST',
        endpoint: '/api/database/create',
        description: 'Writes a new row to any table open to the api.',
        in: {
            addon: {
                type: 'string',
                required: true,
                description: 'The addon whose table to write to.'
            },
            data: {
                type: 'json',
                required: true,
                description: 'The fields the new row carries.'
            }
        },
        out: {
            item: {
                type: 'json',
                description: 'The row as it was written.'
            }
        },
        callback: async function(properties, resolve)
        {
            const open = database.crud.Fn('get.exposed', properties.addon, 'create');

            if(open.refused)
            {
                return resolve(null, ...open.refused);
            }

            const item = open.addon.Item(properties.data);

            const allowed = await open.expose.create.call({
                http: this.http,
                properties: properties,
                item: item
            });

            if(allowed !== true)
            {
                return resolve(null, typeof allowed === 'string' ? allowed : 'The write was refused.', 400);
            }

            const created = await item.Create();
            const fields = open.expose.select ? open.expose.select : Object.keys(open.addon.Fields().data);

            resolve({ item: created.Get(fields) });
        }
    });
});
