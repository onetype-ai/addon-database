// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'database:back/translates',
        addon: 'database.translations',
        description: 'A row reads back in the language asked for, naming none reads the default, and an untranslated field is the same in every language.',
        callback: async function({ assert })
        {
            this.database = onetype.AddonGet('database');
            this.languages = onetype.AddonGet('database.languages');

            this.spoken = () =>
            {
                this.languages.Item({
                    id: 'EN',
                    name: 'English',
                    order: 1,
                    default: true
                });

                this.languages.Item({
                    id: 'DE',
                    name: 'Deutsch',
                    order: 2
                });
            };

            this.declared = () =>
            {
                return onetype.Addon('translated', (addon) =>
                {
                    addon.Description('A table written to prove translations, nothing else uses it.');

                    addon.Field('id', {
                        type: 'number',
                        description: 'Row id.'
                    });

                    addon.Field('title', {
                        type: 'string',
                        description: 'A field that carries a value per language.'
                    });

                    addon.Field('slug', {
                        type: 'string',
                        description: 'A field that reads the same in every language.'
                    });

                    addon.Table('translated');
                    addon.Schema('id serial primary key');
                    addon.Schema('title text');
                    addon.Schema('slug text');
                    addon.Translations(['title']);
                });
            };

            this.written = async (translated) =>
            {
                const made = await translated.Item({
                    title: 'Hello',
                    slug: 'hello'
                }).Create();

                made.Set('title', 'Hallo');

                await made.Update().language('DE');

                return made;
            };

            this.spoken();

            const translated = this.declared();

            await this.database.Fn('get.ready');
            await this.written(translated);

            const base = await translated.Find().one();
            const german = await translated.Find().language('DE').one();

            assert.equal(base.Get('title'), 'Hello', 'naming no language reads the default');
            assert.equal(german.Get('title'), 'Hallo', 'naming a language reads that language, without listing them all');
            assert.equal(german.Get('slug'), 'hello', 'a field outside the translated list reads the same in every language');
        }
    });
});
