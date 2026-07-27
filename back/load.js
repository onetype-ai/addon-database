// This file is part of OneType. Created and led by Dejan Tomic <hi@iamdejan.com>, co-authored by Stefan Pakic, onetype.ai

import database from '#database/addon.js';

import '#database/listeners/emitters/onetype.addon.init.js';
import '#database/item/catch/add.js';

import '#database/functions/make.memory.js';
import '#database/functions/make.connection.js';
import '#database/functions/do.connect.js';
import '#database/functions/do.disconnect.js';
import '#database/functions/get.connection.js';
import '#database/functions/run.transaction.js';
import '#database/functions/get.column.js';
import '#database/functions/get.map.js';
import '#database/functions/get.spread.js';
import '#database/functions/get.ready.js';
import '#database/functions/map.cast.js';
import '#database/functions/map.cast.value.js';
import '#database/functions/map.serialize.js';

import '#database/addons/schema/load.js';
import '#database/addons/crud/load.js';
import '#database/addons/languages/load.js';
import '#database/addons/translations/load.js';
import '#database/addons/filters/load.js';
import '#database/addons/joins/load.js';
import '#database/addons/search/load.js';
import '#database/addons/metrics/load.js';

import '#database/items/onetype/assets/database.js';

import '#database/item/catch/connect.js';

import '#database/items/tests/back/chains.js';
import '#database/items/tests/back/exposes.js';
import '#database/items/tests/back/operators.js';
import '#database/items/tests/back/speaks.js';
import '#database/items/tests/back/translates.js';
import '#database/items/tests/front/builds.js';
import '#database/items/tests/front/batches.js';

export default database;
