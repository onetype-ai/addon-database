// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('sync.defaults', async function({ trx, table, columns, desired, actions })
{
    this.valued = async (name, target) =>
    {
        const statement = target.value === null
            ? 'ALTER TABLE ?? ALTER COLUMN ?? DROP DEFAULT'
            : 'ALTER TABLE ?? ALTER COLUMN ?? SET DEFAULT ' + target.value;

        await trx.raw(statement, [table, name]);

        actions.add('~' + name);
    };

    this.required = async (name, target) =>
    {
        const word = target.required ? 'SET' : 'DROP';

        await trx.raw('ALTER TABLE ?? ALTER COLUMN ?? ' + word + ' NOT NULL', [table, name]);

        actions.add('~' + name);
    };

    this.matched = async (current) =>
    {
        for(const column of columns)
        {
            const target = desired[column.name];
            const live = current[column.name];

            if(target.value !== live.value)
            {
                await this.valued(column.name, target);
            }

            if(target.required !== live.required)
            {
                await this.required(column.name, target);
            }
        }
    };

    await this.matched(await this.Fn('get.columns', trx, table));
});
