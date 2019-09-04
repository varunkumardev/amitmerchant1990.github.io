---
layout: post
title: Using Lazy Collections on memory-hungry operations in Laravel 6
categories: [Laravel]
---

Laravel team has recently released `v6.0` of the framework and with this they have added a bunch of exciting new features. Among which, I'm going to talk about Lazy Collections in this article. In Laravel,    `Illuminate\Support\Collection` class provides a fluent, convenient wrapper for working with arrays of data. In face, all the [Eloquent](Eloquent queries are always returned as  Collection instances.) queries are always returned as `Collection` instances. `LazyCollection` essentially extends the features of the `Collection` class. Let's talk about them in detail.

## What is `LazyCollection`?

`LazyCollection` class is like `Illuminate\Support\Collection` class but there are few difference. The class basically utilizes PHP [generators](https://www.php.net/manual/en/language.generators.overview.php) to allow you to work with very large datasets while keeping memory usage low. If you're not aware of generators, you check check out [this article](/deep-dive-into-generators-php/) where I've explained generators in detail. 

{:.you-may-like}
> You may also like: [A deep dive into Generators in PHP](/deep-dive-into-generators-php/)

Basically, Generators are like the normal functions in PHP but instead of returning a value, they yields as many values as it needs to. So, whichever function that contains “yield” is a generator. It’s like returning the value from a function in “realtime” and you don’t need to maintain the state of the values in the function itself. And once there are no more values to be yielded, then the generator can simply exit, and the calling code continues just as if an array has run out of values. 

`LazyCollection` leverages this behaviour of generators in order to keep the memory low while working with large datasets efficiently. Quoting the example from the Laravel documentation, you can use `LazyCollection` in situations where you need to process really big files while preventing `out-of-the-memory` warning. Here, we can parse, let's say for example a really big log file, using `LazyCollection` in conjunction with the traditional `Collection` class. Here, Instead of reading the entire file into memory at once, lazy collections may be used to keep only a small part of the file in memory at a given time.

```php
use App\LogEntry;
use Illuminate\Support\LazyCollection;

LazyCollection::make(function () {
    $handle = fopen('log.txt', 'r');

    while (($line = fgets($handle)) !== false) {
        yield $line;
    }
})->chunk(4)->map(function ($lines) {
    return LogEntry::fromLines($lines);
})->each(function (LogEntry $logEntry) {
    // Process the log entry...
});
```

As you can see above, `LazyCollection::make` is where we've written the logic of reading the line of the file. Notice, the anonymous function we've passed to `make` is a generator which "yields" the line(and will return a `Generator` object which is [iterable](https://www.php.net/manual/en/class.iterator.php) using regular loops) to the next collection `chunk` method and from there onwards it'd get processed into the `each` collection method ultimately. 

## Using `LazyCollection` on Eloquent models

We can use the query builder's `cursor` on the model instance which basically returns a `LazyCollection` instance. This allows us to still only run a single query against the database but also only keep one Eloquent model loaded 
in memory at a time. Take below for example.

```php
$users = App\User::cursor()->filter(function ($user) {
    return $user->id > 500;
});

foreach ($users as $user) {
    echo $user->id;
}
```

As you can see, in this example, the `filter` callback is not executed until we actually iterate over each user individually, allowing for a drastic reduction in memory usage.

