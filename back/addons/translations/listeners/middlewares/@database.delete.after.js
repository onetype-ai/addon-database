// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.middlewares.intercept('@database.delete.after', async (middleware) =>
{
    const { item, transaction, addon } = middleware.value;
    const fields = database.translations.Fn('get.fields', addon);

    if(!fields)
    {
        return await middleware.next();
    }

    await transaction('database_translations')
        .where({
            entity: addon.name,
            entity_id: String(item.Get('id'))
        })
        .del();

    await middleware.next();
});
