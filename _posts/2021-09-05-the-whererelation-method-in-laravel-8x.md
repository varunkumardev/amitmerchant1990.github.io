---
layout: post
title: The whereRelation (A better version of whereHas) method in Laravel 8.x
image: /cdn/the-whererelation-method-in-laravel-8x.png
categories: [Laravel]
---

Checking the existence of relationships and fetching model records is quite easy in Laravel.

* TOC*
{:toc}

for instance, let's say, you want to retrieve all books which at least have one review, you can do it like so.

```php
use App\Models\Book;

$books = Book::has('reviews')->get();
```

## The existing `whereHas` method

Now, if you want to go deeper with this, for example, if you only want to retrieve the books which have more than 3 stars, you can use the `whereHas` method like so.

```php
use App\Models\Book;
use Illuminate\Database\Eloquent\Builder;

$books = Book::whereHas('reviews', function (Builder $query) {
    $query->where('stars', '>', 3);
})->get();
```

This is all nice but in the recent PR, an alternate method is added which does the same but with better developer experience.

## The new `whereRelation` method

As I mentioned earlier, [this PR](https://github.com/laravel/framework/pull/38499) for Laravel 8.x introduced a method called `whereRelation` which is essentially the `whereHas` method that offers better readability and less code complexity by omitting the [closure](https://www.php.net/manual/en/functions.anonymous.php) altogether.

Here's how the previous example can be written using `whereRelation`.

```php
use App\Models\Book;

$books = Book::whereRelation('reviews', 'stars', '>=', 3)->get();
```

As you can tell, this method makes the query more readable without the need of passing a closure to it.

The PR also adds few more methods such as the `orWhereRelation()`, `whereMorphRelation()` and `orWhereMorphRelation()` for morph relations that works works the similar way as the `whereRelation()` method.