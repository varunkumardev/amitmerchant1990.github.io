---
layout: post
title: Retrieve request URL without specific query parameters in Laravel
image: /cdn/retrieve-request-url-without-query-parameter-in-laravel.png
categories: [Laravel]
---

When you have a request in hand and if the URL is having a query string with different parameters, the easiest way to get the entire URL with the query string is using the `fullUrl()` method like so.

```php
$urlWithQueryString = $request->fullUrl();

// https://www.amitmerchant.com?search=Laravel&sort=asc
```

Now, if you want to append additional parameters in the existing URL query string, you can use the `fullUrlWithQuery()` like so.

```php
$urlWithQueryString = $request->fullUrlWithQuery(['lang' => 'en']);

// https://www.amitmerchant.com?search=Laravel&sort=asc&lang=en
```

## The new `fullUrlWithoutQuery` method

Now, recently with [this PR](https://github.com/laravel/framework/pull/38482), Laravel 8.x is coming with a method called `fullUrlWithoutQuery()` which does exactly opposite of the `fullUrlWithQuery()` method. i.e it removes the specified query string parameters from the request URL.

So, if we use the `fullUrlWithoutQuery()` the previous example, it would look like so.

```php
$urlWithQueryString = $request->fullUrlWithoutQuery('sort');

// https://www.amitmerchant.com?search=Laravel&lang=en
```

As you can tell, since we specified the `sort` parameter in the `fullUrlWithoutQuery` method, it would return the URL with that parameter removed from the URL.

If you want multiple parameters to be removed, you can pass in the array of target parameters like so.

```php
$urlWithQueryString = $request->fullUrlWithoutQuery(['sort', 'lang']);

// https://www.amitmerchant.com?search=Laravel
```