// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

const STEP = {
    minute: 60000,
    hour: 3600000,
    day: 86400000,
    week: 604800000,
    month: null,
    year: null
};

const AGGREGATES = ['count', 'sum', 'avg', 'min', 'max'];

database.metrics.Fn('make.build', async function(knex, query, { field, interval, aggregate, value })
{
    this.checked = (type) =>
    {
        if(!(interval in STEP))
        {
            throw onetype.Error(400, 'The interval :interval: is not one of :list:.', {
                interval: interval,
                list: Object.keys(STEP).join(', ')
            });
        }

        if(!AGGREGATES.includes(type))
        {
            throw onetype.Error(400, 'The aggregate :aggregate: is not one of :list:.', {
                aggregate: type,
                list: AGGREGATES.join(', ')
            });
        }
    };

    this.counted = (type) =>
    {
        if(type === 'count')
        {
            return query.knex.raw('COUNT(*)');
        }

        return query.knex.raw(type.toUpperCase() + '(??)', [value]);
    };

    this.grouped = async (type) =>
    {
        return knex
            .clear('select')
            .clear('order')
            .select({ date: query.knex.raw('date_trunc(?, ??)', [interval, field]) })
            .select({ value: this.counted(type) })
            .groupByRaw('1')
            .orderByRaw('1 ASC');
    };

    this.mapped = (rows) =>
    {
        const map = {};

        rows.forEach((row) =>
        {
            const read = parseFloat(row.value);

            map[new Date(row.date).toISOString()] = read ? read : 0;
        });

        return map;
    };

    const type = aggregate ? aggregate : 'count';

    this.checked(type);

    const rows = await this.grouped(type);

    return rows.length ? this.Fn('make.span', this.mapped(rows), interval, STEP) : [];
});
