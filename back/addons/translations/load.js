// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import '#database/addons/translations/addon.js';

import '#database/addons/translations/listeners/emitters/onetype.addon.init.js';

import '#database/addons/translations/functions/get.target.js';
import '#database/addons/translations/functions/get.context.js';
import '#database/addons/translations/functions/get.fields.js';
import '#database/addons/translations/functions/get.carried.js';

import '#database/addons/translations/items/database/crud/language.js';
import '#database/addons/translations/items/database/crud/languages.js';

import '#database/addons/translations/listeners/middlewares/@database.create.after.js';
import '#database/addons/translations/listeners/middlewares/@database.update.before.js';
import '#database/addons/translations/listeners/middlewares/@database.delete.after.js';
import '#database/addons/translations/listeners/middlewares/@database.find.transform.js';
