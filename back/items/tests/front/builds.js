// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'database:front/builds',
        addon: 'database',
        description: 'The browser builds the same chain the server does, keeps the query it is building to itself, and holds no connection of its own.',
        callback: async function({ run, assert })
        {
            this.shaped = async () =>
            {
                const answered = await run(() =>
                {
                    const chain = onetype.AddonGet('database').Fn('find', { name: 'posts' });

                    return Object.keys(chain).filter((name) => typeof chain[name] === 'function').sort().join(',');
                });

                ['filter', 'orFilter', 'sort', 'select', 'limit', 'page', 'many', 'one', 'count'].forEach((named) =>
                {
                    assert.match(answered, named, 'the browser chain carries ' + named);
                });
            };

            this.sealed = async () =>
            {
                const answered = await run(() =>
                {
                    const chain = onetype.AddonGet('database').Fn('find', { name: 'posts' });

                    chain.filter('title', 'One');
                    chain.sort('title', 'desc');

                    return JSON.stringify(Object.keys(chain).filter((name) => typeof chain[name] !== 'function'));
                });

                assert.equal(answered, '[]', 'the query it is building is its own, nothing on the chain is left open to a caller');
            };

            this.quiet = async () =>
            {
                const answered = await run(() =>
                {
                    const named = Object.keys(onetype.AddonGet('database').functions.data);

                    return JSON.stringify({
                        connection: named.includes('get.connection'),
                        transaction: named.includes('run.transaction'),
                        find: named.includes('find')
                    });
                });

                const read = JSON.parse(answered);

                assert.equal(read.connection, false, 'the browser holds no connection, the server keeps those');
                assert.equal(read.transaction, false, 'nor transactions');
                assert.equal(read.find, true, 'but it does build a find');
            };

            await this.shaped();
            await this.sealed();
            await this.quiet();
        }
    });
});
