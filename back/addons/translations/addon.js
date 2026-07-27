// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.translations = onetype.Addon('database.translations', (addon) =>
    {
        addon.Description('A value per language for the fields an addon names. Rows are written in the default language, the rest live here.');

        addon.Table('database_translations');

        addon.Field('entity', {
            type: 'string',
            required: true,
            description: 'The addon whose row this translates.'
        });

        addon.Field('entity_id', {
            type: 'number',
            required: true,
            description: 'The row this translates.'
        });

        addon.Field('language', {
            type: 'string',
            required: true,
            description: 'The language this value is written in.'
        });

        addon.Field('field', {
            type: 'string',
            required: true,
            description: 'The field this value stands in for.'
        });

        addon.Field('value', {
            type: 'string',
            description: 'What the field reads in this language.'
        });

        addon.Field('updated_at', {
            type: 'string',
            description: 'When this value was last written.',
            metadata: {
                cast: 'date'
            }
        });

        addon.Field('created_at', {
            type: 'string',
            description: 'When this value was first written.',
            metadata: {
                cast: 'date'
            }
        });

        addon.Schema('entity varchar(255)');
        addon.Schema('entity_id bigint');
        addon.Schema('language varchar(255)');
        addon.Schema('field varchar(255)');
        addon.Schema('value text');
        addon.Schema('updated_at timestamptz');
        addon.Schema('created_at timestamptz default now()');
        addon.Schema('primary key (entity, entity_id, language, field)');
    });
});
