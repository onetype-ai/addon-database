// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

database.translations.Fn('get.context', function({ language, languages } = {})
{
    this.checked = (code) =>
    {
        if(!/^[A-Z]{2}$/.test(code))
        {
            throw onetype.Error(400, 'The language code :code: is not two capital letters.', { code: code });
        }

        return code;
    };

    this.known = () =>
    {
        if(Array.isArray(languages) && languages.length)
        {
            return languages.map((code) => this.checked(code));
        }

        const registered = database.languages.Fn('get.codes');

        return registered.length ? registered : null;
    };

    this.spoken = (known) =>
    {
        if(language !== null && language !== undefined)
        {
            return this.checked(language);
        }

        return known ? database.languages.Fn('get.default') : null;
    };

    this.base = (known) =>
    {
        const marked = database.languages.Fn('get.default');

        return marked ? marked : known[0];
    };

    const known = this.known();
    const spoken = this.spoken(known);

    const context = {
        language: spoken,
        languages: known,
        default: false,
        skip: true
    };

    if(!context.language || !context.languages)
    {
        return context;
    }

    context.default = context.language === this.base(context.languages);
    context.skip = context.default;

    return context;
});
