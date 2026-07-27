// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'database:back/operators',
        addon: 'database.filters',
        description: 'Every operator registered as a filter narrows the rows the way its name says, and one that is not registered is refused.',
        callback: async function({ assert })
        {
            this.declared = () =>
            {
                return onetype.Addon('filtered', (addon) =>
                {
                    addon.Description('A table written to prove the filter operators, nothing else uses it.');

                    addon.Field('id', {
                        type: 'number',
                        description: 'Row id.'
                    });

                    addon.Field('name', {
                        type: 'string',
                        description: 'A word to match on.'
                    });

                    addon.Field('age', {
                        type: 'number',
                        description: 'A number to compare, left empty on one row.'
                    });

                    addon.Table('filtered');
                    addon.Schema('id serial primary key');
                    addon.Schema('name text');
                    addon.Schema('age int');
                });
            };

            this.filled = async (filtered) =>
            {
                const written = [['Ana', 30], ['Bob', 20], ['Cyd', 40], ['Dee', null]];

                for(const [name, age] of written)
                {
                    await filtered.Item({
                        name: name,
                        age: age
                    }).Create();
                }
            };

            this.named = async (filtered, field, value, operator) =>
            {
                const found = await filtered.Find().filter(field, value, operator).many();

                return found.map((row) => row.Get('name')).sort().join(',');
            };

            this.compared = async (filtered) =>
            {
                assert.equal(await this.named(filtered, 'name', 'Ana', 'EQUALS'), 'Ana', 'EQUALS takes the row that matches');
                assert.equal(await this.named(filtered, 'name', 'Ana', 'NOT EQUALS'), 'Bob,Cyd,Dee', 'NOT EQUALS takes the rest');
                assert.equal(await this.named(filtered, 'age', 30, 'LESS'), 'Bob', 'LESS takes what falls below');
                assert.equal(await this.named(filtered, 'age', 30, 'GREATER'), 'Cyd', 'GREATER takes what rises above');
                assert.equal(await this.named(filtered, 'age', 30, 'LESS EQUALS'), 'Ana,Bob', 'LESS EQUALS takes the boundary too');
                assert.equal(await this.named(filtered, 'age', 30, 'GREATER EQUALS'), 'Ana,Cyd', 'GREATER EQUALS takes it as well');
            };

            this.matched = async (filtered) =>
            {
                assert.equal(await this.named(filtered, 'name', 'A%', 'LIKE'), 'Ana', 'LIKE matches the pattern');
                assert.equal(await this.named(filtered, 'name', 'a%', 'ILIKE'), 'Ana', 'ILIKE matches it whatever the case');
                assert.equal(await this.named(filtered, 'name', 'a%', 'NOT ILIKE'), 'Bob,Cyd,Dee', 'NOT ILIKE takes the rows it does not match');
            };

            this.bounded = async (filtered) =>
            {
                assert.equal(await this.named(filtered, 'age', null, 'NULL'), 'Dee', 'NULL takes the row with nothing there');
                assert.equal(await this.named(filtered, 'age', null, 'NOT NULL'), 'Ana,Bob,Cyd', 'NOT NULL takes the rows that carry a value');
                assert.equal(await this.named(filtered, 'age', [20, 30], 'BETWEEN'), 'Ana,Bob', 'BETWEEN takes what falls inside');
                assert.equal(await this.named(filtered, 'name', ['Ana', 'Bob'], 'IN'), 'Ana,Bob', 'IN takes the rows it lists');
                assert.equal(await this.named(filtered, 'name', ['Ana', 'Bob'], 'NOT IN'), 'Cyd,Dee', 'NOT IN takes the rows it does not');
            };

            this.refused = async (filtered) =>
            {
                let refused = false;

                try
                {
                    await filtered.Find().filter('name', 'Ana', 'NOBODY REGISTERED THIS').many();
                }
                catch(error)
                {
                    refused = error.message.includes('not registered');
                }

                assert.truthy(refused, 'an operator nobody registered is refused, not quietly ignored');
            };

            const filtered = this.declared();

            await onetype.AddonGet('database').Fn('get.ready');
            await this.filled(filtered);

            await this.compared(filtered);
            await this.matched(filtered);
            await this.bounded(filtered);
            await this.refused(filtered);
        }
    });
});
