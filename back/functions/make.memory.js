// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import { newDb } from 'pg-mem';
import database from '#database/addon.js';

database.Fn('make.memory', function()
{
    return newDb();
});
