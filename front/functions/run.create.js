// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('run.create', async function(item, language)
{
    const result = await database.Fn('run.batch', 'create', {
        addon: item.addon.name,
        data: item.data,
        language
    });

    if(result.code !== 200)
    {
        throw onetype.Error(result.code, result.message);
    }

    item.SetData(result.data.item, false);
    return item;
});
