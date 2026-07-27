// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('do.disconnect', async function(connection = null)
{
    this.wanted = () =>
    {
        return connection ? [database.ItemGet(connection)].filter(Boolean) : Object.values(database.Items());
    };

    this.broke = (item, error) =>
    {
        onetype.Error(500, 'Connection :id: broke its onDisconnect (:message:).', {
            id: item.Get('id'),
            message: error.message
        });
    };

    this.close = async (item) =>
    {
        const knex = item.Get('connection');
        const callback = item.Get('onDisconnect');

        callback && await Promise.resolve(callback(knex, item)).catch((error) => this.broke(item, error));
        knex && await knex.destroy();
        item.Set('connection', null);
    };

    for(const item of this.wanted())
    {
        await this.close(item);
    }
});
