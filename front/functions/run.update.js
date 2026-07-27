// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('run.update', async function(item, language)
{
    const result = await database.Fn('run.batch', 'update', {
        addon: item.addon.name,
        id: item.Get('id'),
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
