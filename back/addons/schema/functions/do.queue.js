// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('do.queue', function(addon, connection)
{
    const chain = (this.StoreGet('chain') ? this.StoreGet('chain') : Promise.resolve()).then(() => database.schema.Fn('run.schema', addon, connection));

    chain.catch((error) =>
    {
        onetype.Error(500, 'The schema for :addon: did not sync: :reason:.', {
            addon: addon.name,
            reason: error.message
        });
    });

    this.StoreSet('chain', chain);
});
