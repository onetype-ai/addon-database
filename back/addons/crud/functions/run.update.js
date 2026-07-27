// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('run.update', async function(chain)
{
    const item = chain.item;
    const knex = database.Fn('get.connection', chain.connection ? chain.connection : 'primary');
    const table = item.addon.Table().name;
    const { fields, skip } = await database.crud.Fn('get.fields', item, {
        update: true,
        whitelist: chain.context.whitelist ? chain.context.whitelist : null
    });

    return knex.transaction(async (transaction) =>
    {
        const id = item.Get('id');
        const hooks = Object.assign({}, chain.context, {
            item: item,
            transaction: transaction,
            addon: item.addon,
            fields: fields,
            skip: skip,
            write: true
        });

        await database.crud.Fn('run.hook', '@database.update.before', hooks);

        if(hooks.write)
        {
            await transaction(table).where('id', id).update(fields);
            database.crud.Fn('map.apply', item, await transaction(table).where('id', id).first(), skip);
        }

        await database.crud.Fn('run.hook', '@database.update.after', hooks);

        return item;
    });
});
