// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.filters.Fn('make.build', function(knex, root)
{
    if(!root || !root.children || !root.children.length)
    {
        return;
    }

    function apply(query, filter, index)
    {
        const method = database.filters.Fn('get.method', index, filter.type);
        const item = database.filters.Fn('get.operator', filter.operator);

        item.Get('build').call({}, query, method, filter);
    }

    function walk(group, query, index)
    {
        if(!group.children.length)
        {
            return;
        }

        const method = database.filters.Fn('get.method', index, group.type);

        query[method](function()
        {
            group.children.forEach((child, childIndex) =>
            {
                if(child.kind === 'filter')
                {
                    apply(this, child, childIndex);
                }
                else
                {
                    walk(child, this, childIndex);
                }
            });
        });
    }

    walk(root, knex, 0);
});
