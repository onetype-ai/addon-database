// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'database:crud:update',
        exposed: true,
        method: 'POST',
        endpoint: '/api/database/update',
        description: 'Changes a row in any table open to the api.',
        in: {
            addon: {
                type: 'string',
                required: true,
                description: 'The addon whose table to change.'
            },
            data: {
                type: 'json',
                required: true,
                description: 'The fields to change, carrying the id of the row to change.'
            }
        },
        out: {
            item: {
                type: 'json',
                description: 'The row as it now stands.'
            }
        },
        callback: async function(properties, resolve)
        {
            const open = database.crud.Fn('get.exposed', properties.addon, 'update');

            if(open.refused)
            {
                return resolve(null, ...open.refused);
            }

            const found = await database.crud.Fn('get.row', open.addon, properties.data?.id);

            if(found.refused)
            {
                return resolve(null, ...found.refused);
            }

            Object.entries(properties.data).forEach(([name, value]) =>
            {
                found.item.Set(name, value);
            });

            const allowed = await open.expose.update.call({
                http: this.http,
                properties: properties,
                item: found.item
            });

            if(allowed !== true)
            {
                return resolve(null, typeof allowed === 'string' ? allowed : 'The change was refused.', 400);
            }

            await found.item.Update();

            const fields = open.expose.select ? open.expose.select : Object.keys(open.addon.Fields().data);

            resolve({ item: found.item.Get(fields) });
        }
    });
});
