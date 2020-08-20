---
layout: post
title: Fetch count of records for children relationships in Laravel Eloquent
image: /cdn/fetch-count-of-records-for-child-relatioship-in-laravel-eloquent.png
categories: [Laravel]
---

There comes a times when you want to fetch the number of records for a child relationship along with the main Eloquent query.

For instance, let's say, I want to get the number of books and publications when fetching authors. To do so, we can use `withCount` method on the Eloquent model like so.

```php
$authors = app\Author::withCount(['books', 'publications'])->get();
```

Now, when looping over this, we can get the count for these child relationship records by using `a {relation}_count column` on the iteration instance like so.

```php
foreach ($authors as $author) {
    $totalBooks = $author->books_count;

    $totalPublications = $author->publications_count;
}
```

You can use alias (using `as`) and Closures to utilize the same relationship twice in `withCount` for different constraints like so.

```php
$authors = app\Author::withCount(['books', 'books as published_books_count' => function (Builder $query) {
    $query->where('status', 'published');
}])->get();
```

The aliased count column can be accessed like so.

```php
$author->published_books_count;
```

You can learn more about this feature [here](https://laravel.com/docs/7.x/eloquent-relationships#counting-related-models).