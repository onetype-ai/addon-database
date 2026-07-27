// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('run.create', async function(knex, table, parsed)
{
    this.indexes = async (indexes) =>
    {
        for(const index of indexes)
        {
            const name = `${table}_${index.columns.join('_')}_${index.unique ? 'unique' : 'index'}`;
            const list = index.columns.map(() => '??').join(', ');
            const method = index.method ? `USING ${index.method} ` : '';

            await knex.raw(`CREATE ${index.unique ? 'UNIQUE ' : ''}INDEX IF NOT EXISTS ?? ON ?? ${method}(${list})`, [name, table, ...index.columns]);
        }
    };

    const { body, indexes, clauses } = parsed;

    await knex.raw(`CREATE TABLE IF NOT EXISTS ?? (${body.join(', ')}) ${clauses.join(' ')}`, [table]);

    await this.indexes(indexes);
});
