// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.asked', function()
{
    return {
        addon: {
            type: 'string',
            required: true,
            description: 'The addon whose table to read.'
        },
        filters: {
            type: 'array',
            description: 'Conditions the rows must meet, joined with AND unless a group says otherwise.',
            each: {
                type: 'object',
                config: 'database.filter',
                description: 'One condition, a field, a value and the operator between them.'
            }
        },
        joins: {
            type: 'array',
            description: 'Tables to pull in alongside these rows.',
            each: {
                type: 'object',
                config: 'database.join',
                description: 'One table to pull in, and how it connects.'
            }
        },
        search: {
            type: 'string',
            description: 'Free text asked across the fields the addon opens to search.'
        },
        sort_field: {
            type: 'string',
            description: 'The field the rows come back ordered by.'
        },
        sort_direction: {
            type: 'string',
            value: 'asc',
            description: 'Which way that order runs, asc or desc.'
        },
        select: {
            type: 'array',
            description: 'The fields to read, empty reads them all.',
            each: {
                type: 'string',
                description: 'One field name.'
            }
        },
        page: {
            type: 'number',
            value: 1,
            description: 'Which page to read, counting from one.'
        },
        limit: {
            type: 'number',
            value: 50,
            description: 'How many rows a page carries.'
        },
        offset: {
            type: 'number',
            description: 'How many rows to step over, named instead of a page.'
        },
        distinct: {
            type: 'boolean',
            value: false,
            description: 'Whether repeated rows collapse into one.'
        },
        count: {
            type: 'boolean',
            value: false,
            description: 'Whether to answer how many there are rather than the rows.'
        },
        aggregate: {
            type: 'json',
            description: 'A sum, average, smallest or largest to answer instead of the rows.'
        },
        metrics: {
            type: 'json',
            description: 'A count grouped over a span of time, answered instead of the rows.'
        }
    };
});
