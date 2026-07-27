// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import Knex from 'knex';
import database from '#database/addon.js';

database.Fn('make.connection', function(item)
{
    this.remote = () =>
    {
        return Knex({
            client: 'pg',
            acquireConnectionTimeout: 1000,
            pool: {
                min: 0,
                max: 25,
                idleTimeoutMillis: 1000,
                acquireTimeoutMillis: 1000
            },
            connection: {
                port: item.Get('port'),
                host: item.Get('hostname'),
                user: item.Get('username'),
                password: item.Get('password'),
                database: item.Get('database')
            }
        });
    };

    this.memory = () =>
    {
        const knex = database.Fn('make.memory').adapters.createKnex(0, { client: 'pg' });

        knex.onetype = { memory: true };

        return knex;
    };

    return item.Get('type') === 'memory' ? this.memory() : this.remote();
});
