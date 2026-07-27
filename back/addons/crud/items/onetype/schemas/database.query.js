// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.schemas.ItemAdd({
    id: 'database.query',
    description: 'The database query shape.',
    addon: 'database',
    config: {
        page: {
            type: 'number',
            value: 1,
            description: 'Page number, 1-based.'
        },
        limit: {
            type: 'number',
            value: 10,
            description: 'Rows per page.'
        },
        sort_field: {
            type: 'string',
            description: 'Field to sort by.'
        },
        sort_direction: {
            type: 'string',
            value: 'asc',
            description: 'Sort direction: asc or desc.'
        }
    }
});
