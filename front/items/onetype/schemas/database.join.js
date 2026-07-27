// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('onetype.schemas', function(schemas)
{
    schemas.ItemAdd({
        id: 'database.join',
        description: 'One table pulled in alongside the rows asked for.',
        addon: 'database',
        config: {
            addon: {
                type: 'string',
                required: true,
                description: 'The addon whose table to pull in.'
            },
            field: {
                type: 'string',
                required: true,
                description: 'The field on these rows that points at that table.'
            },
            output: {
                type: 'string',
                description: 'What to call the pulled in rows on the result, the addon name where none is given.'
            },
            select: {
                type: 'array',
                description: 'The fields to read from that table, empty reads them all.',
                each: {
                    type: 'string',
                    description: 'One field name.'
                }
            }
        }
    });
});
