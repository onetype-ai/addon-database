// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.crud.Fn('make.chain', function(operation, state)
{
    this.knex = (connection) =>
    {
        if(typeof connection !== 'string')
        {
            return connection;
        }

        return database.ItemGet(connection)?.Get('connection');
    };

    this.query = (chain) =>
    {
        const connection = chain.connection ? chain.connection : 'primary';

        return {
            addon: chain.addon,
            knex: this.knex(connection),
            sort: null,
            search: null,
            limit: 250,
            page: 1,
            offset: null,
            distinct: false,
            select: null
        };
    };

    this.named = (id) =>
    {
        const camel = id.replace(/\.(\w)/g, (found, letter) => letter.toUpperCase());

        return camel === id ? [id] : [id, camel];
    };

    this.grown = (chain) =>
    {
        Object.values(this.Items())
            .filter((item) => item.Get('type').includes(operation))
            .sort((first, second) => first.Get('order') - second.Get('order'))
            .forEach((item) =>
            {
                const callback = item.Get('callback');

                this.named(item.Get('id')).forEach((name) =>
                {
                    chain[name] = (...args) => callback(chain, ...args);
                });
            });
    };

    this.closed = (chain) =>
    {
        if(operation !== 'find')
        {
            chain.then = (resolve, reject) => this.Fn('run.chain', chain).then(resolve, reject);

            return;
        }

        onetype.emitters.fire('database.find', {
            methods: chain,
            query: chain.query,
            addon: chain.addon
        });
    };

    const chain = Object.assign({
        operation: operation,
        context: {}
    }, state);

    if(operation === 'find')
    {
        chain.query = this.query(chain);
    }

    this.grown(chain);
    this.closed(chain);

    return chain;
});
