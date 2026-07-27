// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

onetype.AddonReady('database', (database) =>
{
    database.metrics = onetype.Addon('database.metrics', (addon) =>
    {
        addon.Description('Counts and sums grouped over a span of time, answered by the database rather than counted in memory.');
    });
});
