// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('do.connect', function(item)
{
    this.after = () =>
    {
        const chain = database.schema ? database.schema.StoreGet('chain') : null;

        return chain ? chain : Promise.resolve();
    };

    this.broke = (error) =>
    {
        onetype.Error(500, 'Connection :id: broke its onConnect (:message:).', {
            id: item.Get('id'),
            message: error.message
        });
    };

    const callback = item.Get('onConnect');

    if(!callback)
    {
        return;
    }

    const chain = this.after().then(() => callback(item.Get('connection'), item)).catch(this.broke);

    database.schema && database.schema.StoreSet('chain', chain);
});
