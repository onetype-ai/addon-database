// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'database.query',
        description: 'What a page of rows is asked for with.',
        addon: 'database',
        config: {
            filters: {
                type: 'array',
                description: 'Conditions the rows must meet.',
                each: {
                    type: 'object',
                    config: 'database.filter',
                    description: 'One condition, a field, a value and the operator between them.'
                }
            },
            page: {
                type: 'number',
                value: 1,
                description: 'Which page to read, counting from one.'
            },
            limit: {
                type: 'number',
                value: 10,
                description: 'How many rows a page carries.'
            },
            sort_field: {
                type: 'string',
                description: 'The field the rows come back ordered by.'
            },
            sort_direction: {
                type: 'string',
                value: 'asc',
                description: 'Which way that order runs, asc or desc.'
            }
        }
    });
});
