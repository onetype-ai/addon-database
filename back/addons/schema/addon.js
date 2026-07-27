// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.schema = onetype.Addon('database.schema', (addon) =>
    {
        addon.Description('The tables an addon declares, kept in step with what the server holds, so a new field reaches the database on its own.');
    });
});
