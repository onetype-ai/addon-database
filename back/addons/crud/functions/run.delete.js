// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.delete', async function(chain)
{
    const item = chain.item;
    const knex = database.Fn('get.connection', chain.connection ? chain.connection : 'primary');
    const table = item.addon.Table().name;

    return knex.transaction(async (transaction) =>
    {
        const id = item.Get('id');
        const hooks = Object.assign({}, chain.context, {
            item: item,
            transaction: transaction,
            addon: item.addon,
            write: true
        });

        await database.crud.Fn('run.hook', '@database.delete.before', hooks);

        if(hooks.write)
        {
            await transaction(table).where('id', id).del();
            item.Set('id', null);
        }

        await database.crud.Fn('run.hook', '@database.delete.after', hooks);

        return item;
    });
});
