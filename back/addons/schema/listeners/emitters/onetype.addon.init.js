// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.init', (addon) =>
{
    addon.database.schema = [];

    addon.Schema = function(line)
    {
        if(line === undefined)
        {
            return addon.database.schema;
        }

        addon.database.schema.push(line);
    };

    addon.SchemaRun = function({ connection = 'primary' } = {})
    {
        return onetype.AddonGet('database.schema').Fn('run.schema', addon, connection);
    };
});
