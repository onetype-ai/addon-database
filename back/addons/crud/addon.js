// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.crud = onetype.Addon('database.crud', (addon) =>
    {
        addon.Description('The chain every table call is built from. Each item registered here becomes one method on it, so a chain grows by registration.');

        addon.Field('id', {
            type: 'string',
            required: true,
            description: 'Method name added to the chain (filter, one, many, language).'
        });

        addon.Field('type', {
            type: 'array',
            required: true,
            each: { type: 'string' },
            description: 'Chains this method belongs to (find, create, update, delete).'
        });

        addon.Field('order', {
            type: 'number',
            value: 100,
            description: 'Order the method is attached; lower first.'
        });

        addon.Field('callback', {
            type: 'function',
            required: true,
            description: '(chain, ...args) => chain to keep building, or => a result to end it.'
        });
    });
});
