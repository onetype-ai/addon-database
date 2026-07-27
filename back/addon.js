// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

const database = onetype.Addon('database', (addon) =>
{
    addon.Description('Rows on a server, reached the OneType way. Every addon that names a table gets create, read, update and delete, plus a find chain.');

    addon.Field('id', {
        type: 'string',
        required: true,
        description: 'Connection id used everywhere as { connection: id } (e.g. "primary").'
    });

    addon.Field('type', {
        type: 'string',
        value: 'remote',
        options: ['remote', 'memory'],
        description: 'Where the connection lives, remote on a server or memory in this process, memory asking for pg-mem.'
    });

    addon.Field('hostname', {
        type: 'string',
        description: 'Server host.'
    });

    addon.Field('port', {
        type: 'number',
        value: 5432,
        description: 'Server port.'
    });

    addon.Field('username', {
        type: 'string',
        description: 'User.'
    });

    addon.Field('password', {
        type: 'string',
        description: 'Password.'
    });

    addon.Field('database', {
        type: 'string',
        description: 'Database name.'
    });

    addon.Field('connection', {
        type: 'function|object',
        description: 'Live knex instance, set by the connection event once built.'
    });

    addon.Field('onConnect', {
        type: 'function',
        description: 'Runs with the knex once the connection stands and its schema is synced, the place to seed or to clear.'
    });

    addon.Field('onDisconnect', {
        type: 'function',
        description: 'Runs with the knex before the connection closes, the place to clean up after it.'
    });
});

export default database;
