// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.expose', function()
{
    this.listed = (what) =>
    {
        return {
            type: 'array',
            value: [],
            description: 'The fields a caller may ' + what + ', empty opens none.',
            each: {
                type: 'string',
                description: 'One field name.'
            }
        };
    };

    this.guarded = (what) =>
    {
        return {
            type: 'function',
            description: 'Called before a ' + what + ' reaches the table, answering false refuses it.'
        };
    };

    return {
        filter: this.listed('filter on'),
        sort: this.listed('sort by'),
        select: this.listed('read'),
        find: this.guarded('read'),
        create: this.guarded('write'),
        update: this.guarded('change'),
        delete: this.guarded('removal')
    };
});
