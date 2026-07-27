// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

database.Fn('run.batch', function(type, data)
{
    this.queue = () =>
    {
        const held = this.StoreGet('queue');

        return held ? held : [];
    };

    this.push = (entry) =>
    {
        const queue = this.queue();

        queue.push(entry);

        this.StoreSet('queue', queue);
    };

    this.flush = () =>
    {
        const batch = this.queue().splice(0);

        this.StoreSet('scheduled', false);

        if(batch.length === 1)
        {
            return this.Fn('send.one', batch[0]);
        }

        this.Fn('send.many', batch);
    };

    this.schedule = () =>
    {
        if(this.StoreGet('scheduled'))
        {
            return;
        }

        this.StoreSet('scheduled', true);

        queueMicrotask(() => this.flush());
    };

    return new Promise((resolve) =>
    {
        this.push({
            type: type,
            data: data,
            resolve: resolve
        });

        this.schedule();
    });
});
