// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('map.cast', function(addon, record)
{
    this.read = (data, spread, name, value) =>
    {
        const field = addon.FieldGet(name);

        if(!field)
        {
            spread || (data[name] = value instanceof Date ? value.toISOString() : value);

            return;
        }

        const parsed = onetype.DataParseConfig(field.define);

        data[name] = this.Fn('map.cast.value', value, parsed.type.split('|')[0]);
    };

    this.opened = (data, spread) =>
    {
        if(!spread || !data[spread] || typeof data[spread] !== 'object')
        {
            return;
        }

        Object.entries(data[spread]).forEach(([name, value]) =>
        {
            (name in data) || (data[name] = value);
        });

        delete data[spread];
    };

    const map = this.Fn('get.map', addon);
    const spread = this.Fn('get.spread', addon);
    const data = {};

    Object.entries(record).forEach(([key, value]) =>
    {
        this.read(data, spread, map[key] ? map[key] : key, value);
    });

    this.opened(data, spread);

    return data;
});
