// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.init', (addon) =>
{
    addon.database =
    {
        expose: null,
        table: null,
        schema: [],
        translations: null,
        search: null
    };

    addon.Table = function() {};
    addon.Schema = function() {};
    addon.Expose = function() {};
    addon.Translations = function() {};
    addon.Search = function() {};

    addon.Find = function({language = null} = {})
    {
        return database.Fn('find', addon, language);
    };

});
