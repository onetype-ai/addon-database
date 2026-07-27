// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.Fn('map.cast.value', function(value, type)
{
    this.stamped = (read) =>
    {
        return read instanceof Date ? read.toISOString() : read;
    };

    this.parsed = (read) =>
    {
        if(typeof read !== 'string')
        {
            return read;
        }

        try
        {
            return JSON.parse(read);
        }
        catch(error)
        {
            this.unread = error.message;

            return read;
        }
    };

    this.readers = {
        string: (read) =>
        {
            return String(this.stamped(read));
        },
        number: (read) =>
        {
            return Number(read);
        },
        boolean: (read) =>
        {
            return Boolean(read);
        },
        object: (read) =>
        {
            return this.parsed(read);
        },
        array: (read) =>
        {
            return this.parsed(read);
        }
    };

    if(value === null || value === undefined)
    {
        return value;
    }

    const reader = this.readers[type];

    return reader ? reader(value) : this.stamped(value);
});
