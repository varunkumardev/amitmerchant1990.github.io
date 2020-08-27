---
layout: post
title: Using simple yet effective caching for Laravel queries
image: /cdn/using-simple-yet-effective-caching-for-laravel-queries.png
categories: [Laravel]
---

You know it's always a good idea to have something at your disposal using which you can improve the performance of your applications. When it comes to web applications, one of the many things that power them is database queries and that's why it's no surprise that you may want to optimize those and make your application a little faster!

One of the ways using which you can *"dramatically"* improve the performance of your database queries is by caching them somewhere for some time. It turns out, if your application is powered by Laravel, you can do this pretty easily.

## Setting up cache driver

For this, all we need to use is one of the [cache drivers](https://laravel.com/docs/7.x/cache#driver-prerequisites) that Laravel supports. For simplicity, we can use the `database` cache driver.

For this to work, we'll need to create a `cache` table. You can easily create this table in Laravel using the following Artisan command.

```bash
$ php artisan cache:table
```

This will generate a table with the following columns: `key`, `value` & `expiration`. 

Laravel will use this table to create a "cache" in the form of `key`:`value` pairs which can store database results as well.

## Using cache to store query results

Now, we can start using this cache by using `Illuminate\Support\Facades\Cache` facade anywhere you want. For instance, if we want to store the result of the following query into the cache for the next 10 minutes...

```php
$books = Book::orderBy('title')->get();
```

...we can do it using the `Cache::remember` method like so.

```php
$expire = Carbon::now()->addMinutes(10);

$books = Cache::remember('books', $expire, function() {
    return Book::orderBy('title')->get();
});
```

It's as simple as it gets! Now, for the next 10 minutes, Laravel will fetch the result from the `books` key of the cache instead of querying the database. And this can especially improve the performance of your application when you're performing complex queries to fetch results.

There's a `rememberForever` method as well which can retrieve an item from the cache or store it forever but you probably shouldn't use it unless the app you're building doesn't get updated in a timely manner.