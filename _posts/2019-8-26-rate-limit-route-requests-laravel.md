---
layout: post
title: Rate limit route requests in Laravel
categories: [Laravel]
---

As backend developers, to make our web application full proof we need to make sure our application is running as efficiently as possible all the time. Otherwise, everyone using your database will suffer from slow performance. API limiting, which is also known as [rate limiting](https://en.wikipedia.org/wiki/Rate_limiting), is an essential component of Internet security, as [DoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack) can tank a server with unlimited API requests.

{% include affiliates.html %}

Thankfully, Laravel gets you covered in this aspect. In Laravel, you can achieve rate-limiting using a middleware called `throttle` which comes out of the box in Laravel. You need to assign this `throttle` middleware to the route or group of routes.

The middleware basically accepts two parameters, specifically "number of requests" and "duration of time", which determines the maximum number of requests that can be made in a given number of minutes. 

## Basic example

You can assign a `throttle` middleware to a single route like below

```php
Route::get('admin/profile', function () {
    //
})->middleware('auth', 'throttle:30,1');
```

As you can see, the above route configuration will allow an authenticated user access route 30 times per minute. If user exceed this limit within the specified time span, Laravel will return a `429 Too Many Requests` with following response headers.

```bash
x-ratelimit-limit: 2
x-ratelimit-remaining: 0
x-ratelimit-reset: 1566834663
```

## Rate limit on route groups

Similarly, you can apply rate limit on a route group like below.

```php
Route::middleware('auth:api', 'throttle:60,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
```

## Dynamic Rate Limiting

In order to make the "number of requests" dynamic based on the model attribute. This is how you can do so.

```php
Route::middleware('auth:api', 'throttle:rate_limit,1')->group(function () {
    Route::get('/user', function () {
        //
    });
});
```

Here `rate_limit` is an attribute of a `User` model which can be used to calculate the maximum request count for the mentioned route group.