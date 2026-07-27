// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('run.schema', async function(addon, connection = 'primary')
{
    this.locked = async (trx) =>
    {
        await trx.raw("select pg_advisory_xact_lock(hashtext('onetype.schema'))");
    };

    this.standing = async (trx, table, parsed) =>
    {
        const found = await trx.raw('select to_regclass(?) as name', [table]);
        const present = found.rows[0].name;

        await trx.raw('CREATE TABLE IF NOT EXISTS ?? (' + parsed.body.join(', ') + ') ' + parsed.clauses.join(' '), [table]);

        return present;
    };

    this.synced = async (trx, table, parsed) =>
    {
        const present = await this.standing(trx, table, parsed);
        const actions = new Set();

        present || actions.add('created');

        const shared = {
            trx: trx,
            table: table,
            columns: parsed.columns,
            indexes: parsed.indexes,
            desired: await this.Fn('get.describe', trx, parsed.body),
            existing: await this.Fn('get.columns', trx, table),
            actions: actions,
            present: present
        };

        await this.Fn('sync.columns', shared);
        await this.Fn('sync.defaults', shared);
        await this.Fn('sync.indexes', shared);

        return actions;
    };

    const knex = database.Fn('get.connection', connection);
    const table = addon.Table().name;
    const parsed = this.Fn('make.parse', addon.Schema());

    if(!parsed.columns.length)
    {
        throw onetype.Error(400, 'The addon :addon: names a table but no columns.', { addon: addon.name });
    }

    if(knex.onetype?.memory)
    {
        return this.Fn('run.create', knex, table, parsed);
    }

    return knex.transaction(async (trx) =>
    {
        await this.locked(trx);

        const actions = await this.synced(trx, table, parsed);

        if(actions.size)
        {
            console.log('Schema :1: :2', table, [...actions].join(', '));
        }
    });
});
