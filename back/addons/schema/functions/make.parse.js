// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

const CONSTRAINTS = ['primary key', 'foreign key', 'constraint ', 'check ', 'check('];
const CLAUSES = ['partition by'];

database.schema.Fn('make.parse', function(lines)
{
    this.name = (token) =>
    {
        return token.replace(/"/g, '').toLowerCase();
    };

    this.group = (line) =>
    {
        return line.slice(line.indexOf('(') + 1, line.lastIndexOf(')')).split(',').map((name) => this.name(name.trim()));
    };

    this.using = (bare) =>
    {
        const found = /^(?:index|unique) using (\w+)/.exec(bare);

        return found ? found[1] : null;
    };

    this.generated = (bare) =>
    {
        if(bare.includes('serial') || bare.includes('identity'))
        {
            return true;
        }

        return bare.includes('primary key') ? bare.includes('default') : false;
    };

    const parsed = {
        body: [],
        columns: [],
        indexes: [],
        clauses: []
    };

    const primary = [];

    for(const raw of lines)
    {
        const line = raw.trim().replace(/\s+/g, ' ');

        if(!line)
        {
            continue;
        }

        const bare = line.toLowerCase().replace(/'[^']*'/g, '');

        if(CLAUSES.some((clause) => bare.startsWith(clause)))
        {
            parsed.clauses.push(line);
            continue;
        }

        if(bare.startsWith('index ') || bare.startsWith('index(') || bare.startsWith('unique ') || bare.startsWith('unique('))
        {
            parsed.indexes.push({
                unique: bare.startsWith('unique'),
                method: this.using(bare),
                columns: this.group(line)
            });

            continue;
        }

        parsed.body.push(line);

        if(CONSTRAINTS.some((constraint) => bare.startsWith(constraint)))
        {
            if(bare.startsWith('primary key'))
            {
                primary.push(...this.group(line));
            }

            continue;
        }

        parsed.columns.push({
            name: this.name(line.split(' ')[0]),
            line,
            array: bare.includes('[]'),
            primary: bare.includes('primary key'),
            auto: this.generated(bare)
        });
    }

    for(const column of parsed.columns)
    {
        if(primary.includes(column.name))
        {
            column.primary = true;
        }
    }

    return parsed;
});
