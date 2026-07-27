// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('tests.back', (tests) =>
{
    tests.Item({
        id: 'database:back/exposes',
        addon: 'database.crud',
        description: 'A table reaches the api only through what Expose opens, so a field left closed is neither filtered on nor answered with.',
        callback: async function({ assert })
        {
            this.commands = onetype.AddonGet('commands');

            this.declared = () =>
            {
                return onetype.Addon('opened', (addon) =>
                {
                    addon.Description('A table written to prove what Expose opens, nothing else uses it.');

                    addon.Field('id', {
                        type: 'number',
                        description: 'Row id.'
                    });

                    addon.Field('title', {
                        type: 'string',
                        description: 'A field the api may read and filter on.'
                    });

                    addon.Field('secret', {
                        type: 'string',
                        description: 'A field the api is never shown.'
                    });

                    addon.Table('opened');
                    addon.Schema('id serial primary key');
                    addon.Schema('title text');
                    addon.Schema('secret text');

                    addon.Expose({
                        filter: ['title'],
                        sort: ['title'],
                        select: ['id', 'title'],
                        find: () =>
                        {
                            return true;
                        },
                        create: () =>
                        {
                            return true;
                        }
                    });
                });
            };

            this.ran = async (id, data) =>
            {
                return this.commands.ItemGet(id).Fn('run', data);
            };

            this.written = async () =>
            {
                const answered = await this.ran('database:crud:create', {
                    addon: 'opened',
                    data: {
                        title: 'One',
                        secret: 'never'
                    }
                });

                assert.equal(answered.code, 200, 'a write through the api lands');
                assert.falsy('secret' in answered.data.item, 'and answers only the fields Expose opened');
            };

            this.read = async () =>
            {
                const answered = await this.ran('database:crud:find', { addon: 'opened' });

                assert.equal(answered.code, 200, 'a read through the api lands');
                assert.equal(answered.data.items[0].title, 'One', 'and carries the fields it opened');
                assert.falsy('secret' in answered.data.items[0], 'and none it did not');
            };

            this.refused = async () =>
            {
                const closed = await this.ran('database:crud:find', {
                    addon: 'opened',
                    filters: [{
                        field: 'secret',
                        value: 'never'
                    }]
                });

                assert.equal(closed.code, 400, 'filtering on a closed field is refused');

                const missing = await this.ran('database:crud:find', { addon: 'nobody-registered-this' });

                assert.equal(missing.code, 404, 'and so is a table that is not registered');

                const shut = await this.ran('database:crud:delete', {
                    addon: 'opened',
                    id: '1'
                });

                assert.equal(shut.code, 403, 'an operation Expose never opened is refused too');
            };

            this.declared();

            await onetype.AddonGet('database').Fn('get.ready');

            if(!this.commands)
            {
                return assert.truthy(onetype.AddonGet('opened').Expose(), 'without commands loaded, Expose still stands on its own');
            }

            await this.written();
            await this.read();
            await this.refused();
        }
    });
});
