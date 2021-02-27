---
layout: post
title: Retrieve HTTP response as a collection in Laravel 8.x
image: /cdn/retrieve-http-response-as-collection-in-laravel-8x.png
categories: [Laravel]
---

Sometimes, when working with HTTP responses, you might want to retrieve the entire response as a Laravel collection to make further manipulations. 

For instance, if you want to convert the [HTTP](https://laravel.com/docs/8.x/http-client) response to a Laravel collection, you can do it like so.

```php
$posts = collect(
    Http::get(
        'https://jsonplaceholder.typicode.com/posts'
    )->json()
);
```

This is good. But with the [latest release](https://github.com/laravel/framework/releases/tag/v8.29.0) of Laravel 8.x, you can directly call the `collect()` method on the HTTP client response. So, the previous example can be rewritten using the `collect()` method like so.

```php
$posts = Http::get(
    'https://jsonplaceholder.typicode.com/posts'
)->collect()
```

As you can tell, calling the `collect()` method on the response itself makes the syntax more terse and easy to process. 

On top of this, it would be really easy to fluently call other [collection methods](https://laravel.com/docs/8.x/collections#available-methods) such as `filter()` further like so.

```php
$posts = Http::get('https://jsonplaceholder.typicode.com/posts')
    ->collect()
    ->filter(fn($value, $key) => $value['is_published']);
```