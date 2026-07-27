// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('map.serialize', function(query)
{
    this.carried = (state, source, names) =>
    {
        names.forEach((name) =>
        {
            const value = source[name];

            if(!value || (Array.isArray(value) && !value.length))
            {
                return;
            }

            state[name] = value;
        });

        return state;
    };

    this.joined = (entry) =>
    {
        const written = this.carried({
            addon: (entry.required ? '*' : '') + entry.addon,
            field: entry.field,
            output: entry.output
        }, entry, ['filters', 'select', 'sort', 'search']);

        if(entry.joins.length)
        {
            written.joins = entry.joins.map((nested) => this.joined(nested));
        }

        return written;
    };

    this.ordered = (state) =>
    {
        if(!query.sort_field)
        {
            return;
        }

        state.sort_field = query.sort_field;
        state.sort_direction = query.sort_direction;
    };

    const state = this.carried({
        addon: query.addon,
        page: query.page,
        limit: query.limit
    }, query, ['language', 'filters', 'search', 'select', 'offset', 'distinct']);

    this.ordered(state);

    if(query.joins.length)
    {
        state.joins = query.joins.map((entry) => this.joined(entry));
    }

    return state;
});
