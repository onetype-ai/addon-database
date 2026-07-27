// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.init', (addon) =>
{
    addon.database.translations = null;

    addon.Translations = function(config)
    {
        if(config === undefined)
        {
            return addon.database.translations;
        }

        addon.database.translations = config;
    };
});
