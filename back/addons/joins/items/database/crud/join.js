// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Item({
    id: 'join',
    type: ['find'],
    callback(chain, addon, field, output = null, builder = null)
    {
        const query = chain.query;
        query.joins = query.joins ? query.joins : [];

        let required = false;

        if(addon.startsWith('*'))
        {
            required = true;
            addon = addon.slice(1);
        }

        const config = query.addon.FieldGet(field);

        if(!config)
        {
            throw onetype.Error(400, 'Join field :field: not found on :addon:.', { field, addon: query.addon.name });
        }

        const out = output ? output : field;
        const parsed = onetype.DataParseConfig(config.define);
        const many = parsed.type.includes('array');
        const existing = query.addon.FieldGet(out);

        if(existing)
        {
            if(!onetype.DataParseConfig(existing.define).virtual)
            {
                throw onetype.Error(400, 'The join output :output: is already a field on :addon:.', {
                    output: out,
                    addon: query.addon.name
                });
            }
        }
        else
        {
            query.addon.Field(out, many ? {
                type: 'array',
                value: [],
                virtual: true
            } : {
                type: 'object',
                virtual: true
            });
        }

        query.joins.push({
            addon: addon,
            field: field,
            output: out,
            many: many,
            builder: builder,
            required: required,
            parent: chain
        });

        return chain;
    }
});
