# Database

Database gives every addon that names a table a way to read and write it. A connection is an item, an addon declares its table and its columns, and the schema on the server is brought into step on its own. Reads are built as a chain, and the chain grows by registration: every method on it is an item somebody registered.

- Package: `addon-database`, slug `onetype/addon/database`
- Depends on: nothing. It registers its rest surface on `commands` where that is loaded, and works the same where it is not.
- Sides: `back/` holds the connection and the SQL, `front/` builds the same chain in the browser and hands it to the server

## Connect

```js
database.Item({
    id: 'primary',
    hostname: 'localhost',
    username: 'postgres',
    password: 'secret',
    database: 'app'
});

await database.Fn('get.ready');
```

Several connections live side by side. Every call takes `{ connection: 'id' }` and falls back to `primary`, so one addon can read from one database and write to another.

For tests, `type: 'memory'` runs the whole thing in this process on pg-mem, no server needed:

```js
database.Item({ id: 'primary', type: 'memory' });
```

`onConnect` and `onDisconnect` are handed the live knex, which is where a test seeds or clears.

## Declare a table

```js
const posts = onetype.Addon('posts', (addon) =>
{
    addon.Description('Everything written on the blog.');

    addon.Field('id', { type: 'number', description: 'Row id.' });
    addon.Field('title', { type: 'string', description: 'The headline.' });
    addon.Field('tags', {
        type: 'array',
        description: 'What it is filed under.',
        each: { type: 'string', description: 'One tag.' }
    });

    addon.Table('posts');
    addon.Schema('id serial primary key');
    addon.Schema('title text');
    addon.Schema('tags jsonb');
});
```

`Field` says what a value is in JavaScript, `Schema` is the column as Postgres holds it. Arrays and objects go to `jsonb` and come back as arrays and objects.

The schema is synced when the connection stands: a new column is added, a changed type is altered, a dropped one is removed, and indexes are created or dropped to match. Nothing is written by hand.

## Read

```js
const many = await posts.Find().filter('title', 'One').sort('title', 'asc').limit(20).many();
const one = await posts.Find().filter('id', 7).one();
const count = await posts.Find().count();
const exists = await posts.Find().filter('title', 'One').exists();
```

A chain method is an item. These come registered:

`filter`, `orFilter`, `group`, `search`, `join`, `language`, `languages`, `sort`, `select`, `distinct`, `limit`, `page`, `offset`, `many`, `one`, `plain`, `count`, `exists`, `sum`, `avg`, `min`, `max`, `metrics`

## Grow the chain

Anything can add a method, from anywhere, without touching this package:

```js
database.crud.Item({
    id: 'recent',
    type: ['find'],
    order: 500,
    callback(chain, days)
    {
        chain.filter('created_at', new Date(Date.now() - days * 86400000).toISOString(), 'GREATER');

        return chain;
    }
});

await posts.Find().recent(7).many();
```

`type` says which chains it joins — `find`, `create`, `update`, `delete`. `order` decides when it is attached. That is the whole extension surface, and it is the same one the packaged methods use.

## Filter operators

```js
await posts.Find().filter('views', 100, 'GREATER').many();
await posts.Find().filter('tags', ['red'], 'CONTAINS').many();
```

Nineteen come registered: `EQUALS`, `NOT EQUALS`, `LESS`, `GREATER`, `LESS EQUALS`, `GREATER EQUALS`, `LIKE`, `NOT LIKE`, `ILIKE`, `NOT ILIKE`, `NULL`, `NOT NULL`, `BETWEEN`, `NOT BETWEEN`, `IN`, `NOT IN`, `CONTAINS`, `OVERLAP`, `HAS`.

Each is one file registering one item, so a new operator is a new file:

```js
database.filters.Item({
    id: 'starts',
    validate: (filter, validation) => database.filters.Fn('assert.pair', filter, validation),
    build: (query, method, filter) => query[method](filter.field, 'like', filter.value + '%')
});
```

## Group conditions

```js
await posts.Find()
    .group('OR')
        .filter('title', 'One')
        .orFilter('title', 'Two')
    .end()
    .many();
```

## Languages and translations

Register the languages the instance speaks once:

```js
database.languages.Item({ id: 'EN', name: 'English', default: true, order: 1 });
database.languages.Item({ id: 'DE', name: 'Deutsch', order: 2 });
```

Then name which fields carry a value per language:

```js
addon.Translations(['title', 'body']);   // these fields
addon.Translations(true);                // every string field
```

Rows are written in the default language and read in it unless another is named:

```js
await post.Update().language('DE');            // writes the German values
const german = await posts.Find().language('DE').one();
const base = await posts.Find().one();         // the default language
```

A field outside the translated list reads the same in every language.

## Join

```js
await posts.Find().join('authors', 'author_id', 'author', (sub) =>
{
    sub.select(['id', 'name']);
}).many();
```

Joins nest as deep as the query names them.

## Open a table to the api

Nothing reaches the rest surface unless `Expose` opens it:

```js
addon.Expose({
    filter: ['title'],
    sort: ['title'],
    select: ['id', 'title'],
    find: () => true,
    create: function() { return this.http.state.user ? true : 'Sign in first.'; }
});
```

A field left out of `select` is never answered with. A field left out of `filter` cannot be filtered on. An operation with no callback is refused with 403.

| Method | Path | Command |
| --- | --- | --- |
| POST | `/api/database/find` | `database:crud:find` |
| POST | `/api/database/create` | `database:crud:create` |
| POST | `/api/database/update` | `database:crud:update` |
| POST | `/api/database/delete` | `database:crud:delete` |
| POST | `/api/database/batch` | `database:crud:batch` |

## From the browser

The front builds the same chain and hands it to the server. Calls made in the same tick are gathered into one `batch` request on their own.

## Layout

Eight subaddons, each holding its own logic and depending only downward:

```
schema  ←  crud  ←  filters, joins, metrics, search, translations
                    languages  ←  translations
```

| Subaddon | What it owns |
| --- | --- |
| `schema` | keeping the server's tables in step with what an addon declared |
| `crud` | the chain, the rest surface, and reading and writing rows |
| `filters` | the operators and how conditions become a WHERE |
| `joins` | pulling rows in from another table |
| `search` | free text across the fields an addon opens to it |
| `metrics` | counts and sums grouped over a span of time |
| `languages` | which languages the instance speaks, and which is the default |
| `translations` | a value per language for the fields an addon names |
