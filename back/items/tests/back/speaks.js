// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'database:back/languages',
        addon: 'database.languages',
        description: 'The languages the instance speaks are registered items, they come back in order, and one of them is the language rows are written in.',
        callback: function({ assert })
        {
            this.languages = onetype.AddonGet('database.languages');

            this.registered = () =>
            {
                this.languages.Item({
                    id: 'FR',
                    name: 'Francais',
                    order: 30
                });

                this.languages.Item({
                    id: 'ES',
                    name: 'Espanol',
                    order: 20
                });

                assert.truthy(this.languages.ItemGet('FR'), 'a language registers like anything else');
                assert.equal(this.languages.ItemGet('FR').Get('name'), 'Francais', 'and carries what to call it');
            };

            this.ordered = () =>
            {
                const codes = this.languages.Fn('get.codes');

                assert.truthy(codes.indexOf('ES') < codes.indexOf('FR'), 'a lower order comes first');
            };

            this.based = () =>
            {
                this.languages.Item({
                    id: 'IT',
                    name: 'Italiano',
                    order: 10,
                    default: true
                });

                assert.equal(this.languages.Fn('get.default'), 'IT', 'the language marked default is the one rows are written in');
            };

            this.unmarked = () =>
            {
                this.languages.ItemRemove('IT');

                assert.equal(this.languages.Fn('get.default'), this.languages.Fn('get.codes')[0], 'with none marked, the first registered stands in');
            };

            this.registered();
            this.ordered();
            this.based();
            this.unmarked();
        }
    });
});
