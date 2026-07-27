// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('sync.columns', async function({ trx, table, columns, desired, existing, actions, present })
{
    this.added = async (column) =>
    {
        await trx.raw('ALTER TABLE ?? ADD COLUMN ' + column.line, [table]);

        present && actions.add('+' + column.name);
    };

    this.retyped = async (column) =>
    {
        const type = desired[column.name].type;

        await trx.raw('ALTER TABLE ?? ALTER COLUMN ?? TYPE ' + type + ' USING ??::' + type, [table, column.name, column.name]);

        actions.add('~' + column.name);
    };

    this.dropped = async (name) =>
    {
        await trx.raw('ALTER TABLE ?? DROP COLUMN ??', [table, name]);

        actions.add('-' + name);
    };

    this.wanted = async () =>
    {
        for(const column of columns)
        {
            if(!(column.name in existing))
            {
                await this.added(column);
            }
            else if(desired[column.name].type !== existing[column.name].type)
            {
                await this.retyped(column);
            }
        }
    };

    this.stale = async () =>
    {
        for(const name of Object.keys(existing))
        {
            if(!(name in desired))
            {
                await this.dropped(name);
            }
        }
    };

    await this.wanted();
    await this.stale();
});
