// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.schema.Fn('get.columns', async function(trx, relation)
{
    const rows = (await trx.raw(`
        select a.attname as name,
            format_type(a.atttypid, a.atttypmod) as type,
            a.attnotnull as required,
            pg_get_expr(d.adbin, d.adrelid) as value
        from pg_attribute a
        left join pg_attrdef d on d.adrelid = a.attrelid and d.adnum = a.attnum
        where a.attrelid = ?::regclass and a.attnum > 0 and not a.attisdropped`, [relation])).rows;

    const columns = {};

    rows.forEach((row) => columns[row.name] = {
        type: row.type,
        required: row.required,
        value: row.value && row.value.includes('nextval') ? null : row.value
    });

    return columns;
});
