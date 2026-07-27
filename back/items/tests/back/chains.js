// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'database:back/chains',
        addon: 'database.crud',
        description: 'Every item registered on crud becomes a method on the chain, so an addon outside this package can add one and it is there.',
        callback: async function({ assert })
        {
            this.crud = onetype.AddonGet('database.crud');

            this.declared = () =>
            {
                return onetype.Addon('chained', (addon) =>
                {
                    addon.Description('A table written to prove the chain, nothing else uses it.');

                    addon.Field('id', {
                        type: 'number',
                        description: 'Row id.'
                    });

                    addon.Field('name', {
                        type: 'string',
                        description: 'A word to read back.'
                    });

                    addon.Field('age', {
                        type: 'number',
                        description: 'A number to count over.'
                    });

                    addon.Table('chained');
                    addon.Schema('id serial primary key');
                    addon.Schema('name text');
                    addon.Schema('age int');
                });
            };

            this.added = () =>
            {
                this.crud.Item({
                    id: 'proofStep',
                    type: ['find'],
                    order: 500,
                    callback(chain, word)
                    {
                        chain.query.proof = word;

                        return chain;
                    }
                });
            };

            this.grown = (chained) =>
            {
                const chain = chained.Find();

                assert.equal(typeof chain.proofStep, 'function', 'an item registered on crud is a method on the chain');
                assert.equal(typeof chain.filter, 'function', 'alongside the ones this package registers');

                chain.proofStep('reached');

                assert.equal(chain.query.proof, 'reached', 'and calling it reaches the query it was built for');
            };

            this.paged = async (chained) =>
            {
                const written = [['Ana', 30], ['Bob', 20], ['Cyd', 40]];

                for(const [name, age] of written)
                {
                    await chained.Item({
                        name: name,
                        age: age
                    }).Create();
                }

                const page = await chained.Find().limit(2).page(1).many();

                assert.equal(page.length, 2, 'a limit cuts the page to size');
            };

            this.ordered = async (chained) =>
            {
                const sorted = await chained.Find().sort('age', 'desc').many();

                assert.equal(sorted.map((row) => row.Get('name')).join(','), 'Cyd,Ana,Bob', 'a sort orders the rows by the field it names');
            };

            this.counted = async (chained) =>
            {
                assert.equal(await chained.Find().count(), 3, 'a count answers how many there are');
                assert.equal(await chained.Find().sum('age'), 90, 'a sum adds the field it names');
                assert.equal(await chained.Find().filter('name', 'Ana').exists(), true, 'exists answers whether any row matches');
            };

            const chained = this.declared();

            this.added();

            await onetype.AddonGet('database').Fn('get.ready');

            this.grown(chained);

            await this.paged(chained);
            await this.ordered(chained);
            await this.counted(chained);
        }
    });
});
