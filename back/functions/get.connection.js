// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('get.connection', function(connection = 'primary', callback = null)
{
    const knex = typeof connection === 'string' ? database.ItemGet(connection)?.Get('connection') : connection;

    if(!knex)
    {
        throw onetype.Error(400, 'Database connection :1: not found.', connection);
    }

    return callback ? callback(knex) : knex;
});
