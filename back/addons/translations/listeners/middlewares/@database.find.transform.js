// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

onetype.middlewares.intercept('@database.find.transform', async (middleware) =>
{
    const { records, query } = middleware.value;

    if(!records.length)
    {
        return await middleware.next();
    }

    const fields = database.translations.Fn('get.fields', query.addon);

    if(!fields || !fields.length)
    {
        return await middleware.next();
    }

    const context = database.translations.Fn('get.context', {
        language: query.language,
        languages: query.languages
    });

    if(context.skip)
    {
        return await middleware.next();
    }

    const ids = records.map((record) => record.id);

    const rows = await query.knex('database_translations')
        .where({
            entity: query.addon.name,
            language: context.language
        })
        .whereIn('field', fields)
        .whereIn('entity_id', ids.map(String))
        .select('entity_id', 'field', 'value');

    const overlay = {};

    for(const row of rows)
    {
        if(!overlay[row.entity_id])
        {
            overlay[row.entity_id] = {};
        }

        const record = overlay[row.entity_id];
        record[row.field] = row.value;
    }

    const types = {};

    for(const field of fields)
    {
        const define = query.addon.FieldGet(field)?.define;
        types[field] = define ? onetype.DataParseConfig(define).type.split('|')[0] : 'string';
    }

    for(const record of records)
    {
        const translated = overlay[String(record.id)];

        if(translated)
        {
            for(const field of fields)
            {
                if(translated[field] !== null && translated[field] !== undefined)
                {
                    record[field] = database.Fn('map.cast.value', translated[field], types[field]);
                }
            }
        }
    }

    await middleware.next();
});
