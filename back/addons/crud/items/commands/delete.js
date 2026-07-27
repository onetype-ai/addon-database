// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'database:crud:delete',
        exposed: true,
        method: 'POST',
        endpoint: '/api/database/delete',
        description: 'Removes a row from any table open to the api.',
        in: {
            addon: {
                type: 'string',
                required: true,
                description: 'The addon whose table to remove from.'
            },
            id: {
                type: 'string',
                required: true,
                description: 'The row to remove.'
            }
        },
        out: {
            success: {
                type: 'boolean',
                description: 'Whether the row was removed.'
            }
        },
        callback: async function(properties, resolve)
        {
            const open = database.crud.Fn('get.exposed', properties.addon, 'delete');

            if(open.refused)
            {
                return resolve(null, ...open.refused);
            }

            const found = await database.crud.Fn('get.row', open.addon, properties.id);

            if(found.refused)
            {
                return resolve(null, ...found.refused);
            }

            const allowed = await open.expose.delete.call({
                http: this.http,
                properties: properties,
                item: found.item
            });

            if(allowed !== true)
            {
                return resolve(null, typeof allowed === 'string' ? allowed : 'The removal was refused.', 400);
            }

            await found.item.Delete();

            resolve({ success: true });
        }
    });
});
