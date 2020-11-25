---
layout: post
title: Artisan command to connect to the database in CLI in Laravel 8.x
image: /cdn/artisan-command-to-connect-to-the-database-in-laravel-8x.png
categories: [Laravel]
fluidbox: true
---

Laravel keeps getting better on each of its major releases. But sometimes, it's the minor and patch releases that take the cake by introducing some lesser-noticed features.

For instance, recently, with the release of Laravel [v8.16.0](https://github.com/laravel/framework/releases/tag/v8.16.0), it's now possible to connect to the project's databases right from the CLI using an Artisan command.

## The `artisan db` command

A [PR in v8.16.0](https://github.com/laravel/framework/pull/35304) has introduced an artisan command `php artisan db` which is when run can connect to the default database of the project right in the CLI. As the PR author describes, it's similar to what [Rails](https://rubyonrails.org/) has in the `rails db` command.

This command figures out which database you are using and starts a database CLI session based on your database configuration parameters defined in `config/database.php`.

So, for instance, if my project is using a MySQL database as its default database `breeze` and if I run the `artisan db` command, it will connect to the database like so.

![php artisan db](/images/artisan-db.png)

Pretty nifty, right!

## Specify connection explicitly

Apart from using the default `php artisan db` which connects to the default database, you can also explicitly specify the connection to connect to a non-default database connection like so.

```bash
$ php artisan db sqlite
```