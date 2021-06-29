---
layout: post
title: Artisan command to prune stale jobs in Laravel 8.x
image: /cdn/artisan-command-to-prune-stale-jobs-laravel-8x.png
categories: [Laravel]
---

In Laravel, when your [queued jobs](https://laravel.com/docs/8.x/queues) fail after a job has exceeded the number of attempts, it will be inserted into the `failed_jobs` database table (if you have set it up).

This is to provision for retrying those jobs at a later time using the following command.

```bash
php artisan queue:retry 5
```

Here `5` is the ID of the failed job that you want to retry or you can also provide the range of IDs as well using `--range` options like so.

```bash
$ php artisan queue:retry --range=5-10
```

Now, there might be situations where there would be a lot of failed jobs in the database and some of which are too old that they are not relevant anymore. It's best to remove those entries and that's where this new Artisan command in Laravel 8.x comes into the picture.

## The `queue:prune-failed` command

Mohamed Said has implemented this Artisan command called `queue:prune-failed` in the [recent minor release](https://github.com/laravel/framework/releases/tag/v8.48.0) using which you can remove stale failed job entries from the `failed_jobs` table.

```bash
$ php artisan queue:prune-failed
```

Now, by default, this command will remove the entries which are older than 24 hours but if you want you can also specify an `--hours` option with the number of hours to retain jobs data.

So, if you want to retain jobs data of only the last 5 hours and remove the rest of the entries, you can do it like so.

```bash
$ php artisan queue:prune-failed --hours=5
```