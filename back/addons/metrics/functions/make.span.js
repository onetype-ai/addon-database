// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.metrics.Fn('make.span', function(map, interval, step)
{
    this.stepped = (cursor) =>
    {
        if(step[interval])
        {
            return cursor.setTime(cursor.getTime() + step[interval]);
        }

        if(interval === 'month')
        {
            return cursor.setUTCMonth(cursor.getUTCMonth() + 1);
        }

        return cursor.setUTCFullYear(cursor.getUTCFullYear() + 1);
    };

    const keys = Object.keys(map).sort();
    const cursor = new Date(keys[0]);
    const last = new Date(keys[keys.length - 1]).getTime();
    const spanned = [];

    while(cursor.getTime() <= last)
    {
        const current = cursor.toISOString();

        spanned.push({
            date: current,
            value: map[current] ? map[current] : 0
        });

        this.stepped(cursor);
    }

    return spanned;
});
