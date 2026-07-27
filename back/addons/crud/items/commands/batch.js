// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.AddonReady('commands', (commands) =>
{
    commands.Item({
        id: 'database:crud:batch',
        exposed: true,
        method: 'POST',
        endpoint: '/api/database/batch',
        description: 'Runs several database calls in one request, answering each in the order it was given.',
        in: {
            operations: {
                type: 'array',
                description: 'The calls to run, in order.',
                each: {
                    type: 'object',
                    description: 'One call, which kind it is and what it carries.',
                    config: {
                        type: {
                            type: 'string',
                            required: true,
                            description: 'Which call to run, find, create, update or delete.'
                        },
                        data: {
                            type: 'json',
                            value: {},
                            description: 'What that call carries, read as if it were sent on its own.'
                        }
                    }
                }
            }
        },
        out: {
            results: {
                type: 'array',
                description: 'What each call answered, in the order they were given.',
                each: {
                    type: 'json',
                    description: 'One answer, its data, its message and its code.'
                }
            }
        },
        callback: async function(properties, resolve)
        {
            const operations = properties.operations;

            if(!operations || !operations.length)
            {
                return resolve({ results: [] });
            }

            const map = {
                find: 'database:crud:find',
                create: 'database:crud:create',
                update: 'database:crud:update',
                delete: 'database:crud:delete'
            };

            const results = await Promise.all(operations.map((operation) =>
            {
                return database.crud.Fn('run.operation', commands, map[operation.type], operation, this.http);
            }));

            resolve({ results });
        }
    });
});
