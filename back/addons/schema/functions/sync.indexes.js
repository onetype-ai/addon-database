// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('sync.indexes', async function({ trx, table, indexes, actions, present })
{
    this.named = (index) =>
    {
        const ending = index.unique ? 'unique' : 'index';

        return table + '_' + index.columns.join('_') + '_' + ending;
    };

    this.live = async () =>
    {
        const found = await trx.raw('select indexname from pg_indexes where schemaname = current_schema() and tablename = ?', [table]);

        return found.rows.map((row) => row.indexname);
    };

    this.created = async (index, name) =>
    {
        const list = index.columns.map(() => '??').join(', ');
        const method = index.method ? 'USING ' + index.method + ' ' : '';
        const unique = index.unique ? 'UNIQUE ' : '';

        await trx.raw('CREATE ' + unique + 'INDEX ?? ON ?? ' + method + '(' + list + ')', [name, table, ...index.columns]);

        present && actions.add('+' + name);
    };

    this.ours = (name) =>
    {
        if(!name.startsWith(table + '_'))
        {
            return false;
        }

        return name.endsWith('_index') ? true : name.endsWith('_unique');
    };

    this.wanted = async (declared, live) =>
    {
        for(const [position, index] of indexes.entries())
        {
            if(!live.includes(declared[position]))
            {
                await this.created(index, declared[position]);
            }
        }
    };

    this.stale = async (declared, live) =>
    {
        for(const name of live)
        {
            if(this.ours(name) && !declared.includes(name))
            {
                await trx.raw('DROP INDEX ??', [name]);

                actions.add('-' + name);
            }
        }
    };

    const declared = indexes.map((index) => this.named(index));
    const live = await this.live();

    await this.wanted(declared, live);
    await this.stale(declared, live);
});
