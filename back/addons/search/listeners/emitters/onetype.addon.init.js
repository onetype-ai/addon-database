// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.init', (addon) =>
{
    addon.database.search = null;

    addon.Search = function(config)
    {
        if(config === undefined)
        {
            return addon.database.search;
        }

        addon.database.search = config;
    };
});
