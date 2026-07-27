// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.search = onetype.Addon('database.search', (addon) =>
    {
        addon.Description('Free text asked across the fields an addon opens to it, turned into what the server understands.');
    });
});
