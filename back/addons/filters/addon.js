// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.filters = onetype.Addon('database.filters', (addon) =>
    {
        addon.Description('The operators a filter may name. Each item is one operator, saying how it validates its value and how it becomes a WHERE.');

        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Operator token, uppercase, the lookup key (EQUALS, CONTAINS, NEAR).'
        });

        addon.Field('order', {
            type: 'number',
            value: 100,
            description: 'Resolution order when iterating; lower runs first.'
        });

        addon.Field('validate', {
            type: 'function',
            description: 'Optional (filter, validation, query) => void|false. Validates input; returns false to skip the filter; may set query.impossible.'
        });

        addon.Field('build', {
            type: 'function',
            required: true,
            description: 'Synchronous (query, method, filter) => void. Applies the operator to the knex query inside its callback.'
        });
    });
});
