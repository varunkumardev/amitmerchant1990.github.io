---
layout: post
title: Using MySQL explain for queries in Laravel 8.x
image: /cdn/using-mysql-explain-for-queries-in-laravel-8.png
categories: [Laravel]
---

MySQL's [EXPLAIN](https://dev.mysql.com/doc/refman/5.7/en/explain.html) statement is a handy tool if you want to take a quick glance over queries and to make out what's wrong with them. Essentially, `EXPLAIN` is used to obtain a query execution plan (that is, an explanation of how MySQL would execute a query).

With the help of [EXPLAIN](https://dev.mysql.com/doc/refman/5.7/en/explain.html), you can see where you should add indexes to tables so that the statement executes faster by using indexes to find rows. You can also use EXPLAIN to check whether the optimizer joins the tables in an optimal order.

Now, if you were using Laravel 7.x, the way of using `EXPLAIN` was rather tricky. You would need to call `toSql()` which would print the raw query, you would then copy the result, open your favorite [SQL editor](https://www.mysql.com/products/workbench/), prepend the query with `EXPLAIN`, replace all `?` in the query with actual values, and check the result. 

Pretty tedious, no?

## The `explain()` method

But not anymore! With the help of [this PR](https://github.com/laravel/framework/pull/34969) in Laravel 8.x, it's now a matter of calling `explain()` on the query to return the explanation. Or you can use `explain()->dd()` to die & dump the explanation.

So, if you'd like to explain a query on the `Book` model, you can do it like so.

```php
Book::where('name', 'Ruskin Bond')->explain()->dd();
```

This will return the result in the following format.

```php
Illuminate\Support\Collection {#5344
    all: [
        {#15407
            +"id": 1,
            +"select_type": "SIMPLE",
            +"table": "books",
            +"partitions": null,
            +"type": "ALL",
            +"possible_keys": null,
            +"key": null,
            +"key_len": null,
            +"ref": null,
            +"rows": 9,
            +"filtered": 11.11111164093,
            +"Extra": "Using where",
        },
    ],
}
```

You can use this with the `DB` facade as well like so.

```php
DB::table('books')->where('name', 'Ruskin Bond')->explain()->dd();
```