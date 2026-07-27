// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'database:crud:find',
        exposed: true,
        silent: true,
        method: 'POST',
        endpoint: '/api/database/find',
        description: 'Reads rows from any exposed table, filtered, joined, searched, sorted and paged.',
        in: database.crud.Fn('get.asked'),
        out: database.crud.Fn('get.answered'),
        callback: async function(properties, resolve)
        {
            const open = database.crud.Fn('get.exposed', properties.addon, 'filter');

            if(open.refused)
            {
                return resolve(null, ...open.refused);
            }

            const find = open.addon.Find();
            const narrowed = database.crud.Fn('do.narrow', find, open.expose, properties);

            if(narrowed)
            {
                return resolve(null, ...narrowed);
            }

            if(open.expose.find)
            {
                const allowed = open.expose.find.call({
                    http: this.http,
                    properties: properties
                }, find);

                if(allowed !== true)
                {
                    return resolve(null, typeof allowed === 'string' ? allowed : 'The read was refused.', 400);
                }
            }

            const result = await database.crud.Fn('get.result', find, properties);

            if(result.refused)
            {
                return resolve(null, ...result.refused);
            }

            if(result.answered)
            {
                return resolve(result.answered);
            }

            resolve(database.crud.Fn('get.sliced', result.plain, open.expose, properties));
        }
    });
});
