// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.emitters.catch('onetype.addon.item.init', (item) =>
{
    item.Create = async function({language = null} = {})
    {
        return database.Fn('run.create', item, language);
    };

    item.Update = async function({language = null} = {})
    {
        return database.Fn('run.update', item, language);
    };

    item.Delete = async function()
    {
        return database.Fn('run.delete', item);
    };

});
