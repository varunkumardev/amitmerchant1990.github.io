---
layout: post
title: Drop tables, types and views using wipe artisan command in Laravel 6
image: /cdn/laravel-wipe.jpeg
categories: [Laravel]
---

If you're looking for a quick way to drop all the tables, their types and views and if you're using Laravel 6.x, you can use this little artisan command called `db:wipe` in order to do the same.

This Pull Request [#29620](https://github.com/laravel/framework/pull/29620) by [Anton Komarev](https://github.com/antonkomarev) adds `db:wipe` artisan command which you use like so.

```bash
$ php artisan db:wipe {--database=} {--drop-views} {--drop-types} {--force}
```

Below is the explanation of what the each options will do.

- `database` - The database connection to use
- `drop-views` - Drop all tables and views
- `drop-types` - Drop all tables and types (Postgres only)
- `force` - Force the operation to run when in production

According to the author of this PR, this can be useful in the scenarios where you need a quich way to drop all the tables, views and types. Typically in situations where you've automated migration & backup restoration process. It prevents database corruption because of foreign keys and allows to implement full backup restoration on application level.

He further adds,

> You could say that there is a migrate:reset command. Yes it is, but it's very slow on many migrations amount because it iterates thru the migrations table and executes down method for each migration. But more important thing that down method could be missing if migrations designed to go only up or there is no dropping foreign keys in them. Reset progress will be broken and database became corrupted. You wouldn't be able to run migrate:reset again and you will be forced to drop all tables, views & types directly in database.

This change has also affected the `db:fresh` command's functionality internally. It will now just calls `db:wipe` and then `migrate`.

