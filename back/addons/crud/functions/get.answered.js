// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('get.answered', function()
{
    return {
        items: {
            type: 'array',
            description: 'The rows on this page.',
            each: {
                type: 'json',
                description: 'One row, carrying the fields that were read.'
            }
        },
        total: {
            type: 'number',
            description: 'How many rows matched before the page was cut.'
        },
        page: {
            type: 'number',
            description: 'Which page these rows came from.'
        },
        pages: {
            type: 'number',
            description: 'How many pages the matching rows fill.'
        },
        limit: {
            type: 'number',
            description: 'How many rows a page carries.'
        },
        value: {
            type: 'number',
            description: 'The single number answered where a count or an aggregate was asked for.'
        },
        data: {
            type: 'array',
            description: 'The grouped numbers answered where metrics were asked for.',
            each: {
                type: 'json',
                description: 'One group, its span and its number.'
            }
        }
    };
});
