// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.joins = onetype.Addon('database.joins', (addon) =>
    {
        addon.Description('Rows pulled in from another table alongside the ones asked for, nested as deep as the query names them.');
    });
});
