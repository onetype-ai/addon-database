// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.front', (tests) =>
{
    tests.Item({
        id: 'database:front/batches',
        addon: 'database',
        description: 'Calls made in the same tick are gathered into one request, and a single call on its own goes straight to the route it names.',
        callback: async function({ network, run, eval: read, assert })
        {
            this.answered = () =>
            {
                return {
                    '/api/database/': {
                        data: {
                            results: [{
                                data: null,
                                message: 'ok',
                                code: 200
                            }, {
                                data: null,
                                message: 'ok',
                                code: 200
                            }]
                        },
                        message: 'ok',
                        code: 200
                    }
                };
            };

            this.alone = async () =>
            {
                network(this.answered());

                await run(async () =>
                {
                    await onetype.AddonGet('database').Fn('run.batch', 'create', { addon: 'posts' });
                });

                const sent = await read('window.__requests.length ? window.__requests[0].url : "nothing"');

                assert.equal(sent, '/api/database/create', 'one call on its own goes to the route it names');
            };

            this.gathered = async () =>
            {
                network(this.answered());

                await run(async () =>
                {
                    const database = onetype.AddonGet('database');

                    await Promise.all([
                        database.Fn('run.batch', 'create', { addon: 'posts' }),
                        database.Fn('run.batch', 'update', { addon: 'posts' })
                    ]);
                });

                assert.equal(await read('window.__requests.length'), 1, 'two calls in the same tick reach the server as one request');
                assert.equal(await read('window.__requests[0].url'), '/api/database/batch', 'and that request is the batch route');
            };

            await this.alone();
            await this.gathered();
        }
    });
});
