// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.create', async function(chain)
{
    const item = chain.item;
    const knex = database.Fn('get.connection', chain.connection ? chain.connection : 'primary');
    const table = item.addon.Table().name;
    const id = item.Get('id');
    const { fields } = await database.crud.Fn('get.fields', item);

    return knex.transaction(async (transaction) =>
    {
        const hooks = Object.assign({}, chain.context, {
            item: item,
            transaction: transaction,
            addon: item.addon,
            skip: false
        });

        await database.crud.Fn('run.hook', '@database.create.before', hooks);

        if(!hooks.skip)
        {
            const [record] = await transaction(table).insert(fields).returning('*');
            database.crud.Fn('map.apply', item, record);
        }

        item.addon.ItemRemove(id, false);

        const created = item.addon.ItemAdd({ id: item.Get('id') }, null, false);
        created.data = item.data;
        created.store = item.store;

        hooks.item = created;

        await database.crud.Fn('run.hook', '@database.create.after', hooks);

        return created;
    });
});
