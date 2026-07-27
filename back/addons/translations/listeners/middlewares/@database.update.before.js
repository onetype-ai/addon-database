// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.middlewares.intercept('@database.update.before', async (middleware) =>
{
    const { addon, language, languages } = middleware.value;

    if(!database.translations.Fn('get.fields', addon))
    {
        return await middleware.next();
    }

    const context = database.translations.Fn('get.context', { language, languages });

    if(!context.skip)
    {
        middleware.value.write = false;
    }

    await middleware.next();
});

onetype.middlewares.intercept('@database.update.after', async (middleware) =>
{
    const { item, transaction, addon, language, languages, whitelist } = middleware.value;
    let fields = database.translations.Fn('get.fields', addon);

    if(!fields)
    {
        return await middleware.next();
    }

    const context = database.translations.Fn('get.context', { language, languages });

    if(context.skip)
    {
        return await middleware.next();
    }

    if(whitelist)
    {
        fields = fields.filter(field => whitelist.includes(field));
    }

    const stamp = new Date().toISOString();

    const rows = fields
        .filter((field) => database.translations.Fn('get.carried', item, field))
        .map(field => ({
            entity: addon.name,
            entity_id: String(item.Get('id')),
            language: context.language,
            field,
            value: String(item.Get(field)),
            updated_at: stamp
        }));

    if(rows.length)
    {
        await transaction('database_translations')
            .insert(rows)
            .onConflict(['entity', 'entity_id', 'language', 'field'])
            .merge(['value', 'updated_at']);
    }

    const cleared = fields.filter((field) => !database.translations.Fn('get.carried', item, field));

    if(cleared.length)
    {
        await transaction('database_translations')
            .where({
                entity: addon.name,
                entity_id: String(item.Get('id')),
                language: context.language
            })
            .whereIn('field', cleared)
            .del();
    }

    await middleware.next();
});
