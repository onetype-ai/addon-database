// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.languages = onetype.Addon('database.languages', (addon) =>
    {
        addon.Description('The languages this instance speaks. One is the default, the rest are what a row may be translated into.');

        addon.Field('id', {
            type: 'string',
            description: 'The code this language answers to, two letters, EN or DE.'
        });

        addon.Field('name', {
            type: 'string',
            description: 'What to call it where a person reads it.'
        });

        addon.Field('default', {
            type: 'boolean',
            value: false,
            description: 'Whether rows are written in this language, only one may carry it.'
        });

        addon.Field('order', {
            type: 'number',
            value: 100,
            description: 'Where it falls in a list, lower comes first.'
        });
    });
});
