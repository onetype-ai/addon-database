// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'select',
    type: ['find'],
    callback(chain, fields)
    {
        fields = Array.isArray(fields) ? fields : [fields];

        if(!fields.length)
        {
            throw onetype.Error(400, 'Select needs at least one field.');
        }

        fields.forEach((field) => database.crud.Fn('assert.field', field));

        chain.query.select = fields.map((field) => database.Fn('get.column', chain.query.addon, field));
        return chain;
    }
});
