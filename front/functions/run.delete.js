// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('run.delete', async function(item)
{
    const result = await database.Fn('run.batch', 'delete', {
        addon: item.addon.name,
        id: item.Get('id')
    });

    if(result.code !== 200)
    {
        throw onetype.Error(result.code, result.message);
    }

    item.Set('id', null);
    return item;
});
