---
layout: post
title: Outputting Eloquent query unparameterized in Laravel
image: /cdn/outputting-eloquent-query-unparameterized-in-laravel.png
categories: [Laravel]
---

One of the many benefits of using Laravel as a framework is the immense customizability it comes with. So, you can use this to overcome some of the limitations.

For instance, currently, if you want to output an [Eloquent](https://laravel.com/docs/8.x/eloquent) query in its SQL form, you can invoke the `toSql()` method onto it like so.

```php
$books = Book::where('author', 'Ruskin Bond')->toSql();

dd($books);
// select * from `books` where `author` = ?
```

As you can tell, the `toSql()` would output the query but if you notice it doesn't really output the parameters passed to it. Instead, it would just print `?`. This is because Laravel uses [prepared statements](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php). They're a way of writing an SQL statement without dropping variables directly into the SQL string. The `?` you see are placeholders or bindings for the information which will later be substituted and automatically sanitized by PDO.

This means you need to replace the `?`s with actual values in your query manually which as you can tell is cumbersome if you just want to debug it in your favorite SQL GUI program such as MySQL Workbench.

So, how to get around this? Read on.

## The `toRawSql` macro

Well, recently, in [a tweet](https://twitter.com/kirschbaum_dev/status/1418590965368074241) by [@kirschbaum_dev](https://twitter.com/kirschbaum_dev), I got to know about this custom `toRawSql` [macro](/extending-class-using-macros-laravel/) (which you can define in the `boot` method of your `AppServiceProvider`) which can be used to output the SQL query *unparameterized*.

```php
use Illuminate\Database\Eloquent\Builder;

Builder::macro('toRawSql', function() {
    return array_reduce($this->getBindings(), function($sql, $binding) {
        return preg_replace('/\?/', is_numeric($binding)
            ? $binding
            : "'".$binding."'", $sql, 1);
    }, $this->toSql());
});
```

As you can tell, the macro makes use of the `getBindings()` method which returns an array of all the parameter values of the query coupled with the `preg_replace` function to replace those with the `?`s in the query returned by `toSql()` method.

So, if we want to use this macro in our previous example, we can use it like so.

```php
$books = Book::where('author', 'Ruskin Bond')->toRawSql();

dd($books);
// select * from `books` where `author` = 'Ruskin Bond'
```

As you can tell, using this macro, we now have a raw SQL query with the parameter values already filled in!

Pretty handy, right?