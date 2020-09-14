---
layout: post
title: New RateLimiter facade for defining named rate limiters in Laravel 8
image: /cdn/new-ratelimiter-facade-in-laravel-8.png
categories: [Laravel]
---

In the previous versions of Laravel, up to 7.x, when you wanted to rate limit certain routes, you could do it by assigning the `throttle` middleware to the route or group of routes like so.

```php
Route::get('admin/profile', function () {
    //
})->middleware('auth', 'throttle:30,1');
```

Here, the `30, 1` part signifies that the above route configuration will allow an authenticated user access route 30 times per minute. If the user exceeds this limit within the specified period, Laravel would return a `429 Too Many Requests` response.

As you can tell, the numbers here are hard-coded and there isn't anything using which you can make this configurations dynamic or re-utilize the same configuration across different routes or route groups.

* TOC
{:toc}

Laravel 8 tends to solve these issues by introducing a `RateLimiter` facade. Let's explore it in detail.

## The `RateLimiter` facade

In a nutshell, Laravel 8 has introduced an `Illuminate\Support\Facades\RateLimiter` facade using which you can define "named" rate limiters of different configurations. As these are named rate limiters, they can be used across routes and route groups. 

Also, you can define multiple rate limiters for different use-cases which can be handy.

You can define all your rate limiters in the `boot` method of the `AppServiceProvider`. So, for instance, if you want to define a rate limiter called `limitadmin`, you can do it like so.

```php
<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    // code commented for brevity

    public function boot()
    {
        RateLimiter::for('limitadmin', function (Request $request) {
            return Limit::perMinute(3);
        });
    }
}
```

As you can tell, the `RateLimiter`'s `for` method accepts two parameters.

- The name of the rate limiter.
- A Closure that returns the limit configuration that should apply to routes that are assigned this rate limiter.

In the Closure, you can return the actual rate-limiting logic using the `Illuminate\Cache\RateLimiting\Limit`'s `perMinute` method. In which, you can define how many times a user is allowed to access the route per minute.

## Using the named rate limiter

Once defined, the rate limiter can be assigned to a route like so.

```php
Route::get('profile', function () {
    //
})->middleware(['throttle:limitadmin']);
```

As you can see, instead of passing in the hard-coded configuration, you can use the name of the rate limiter. This makes the rate-limiting re-usable and clean to look at.

## Making rate limiters dynamic

Apart from defining "named" rate limiters, you can also make the rate-limiting dynamic based on certain conditions. 

As we've seen, the Closure of the `for` method receives the `Illuminate\Http\Request` object, we can use it to make the rate-limiting dynamic. For instance, if we want to limit the regular user and bypass the admin user for any sort of rate-limiting, we can do it like so.

```php
RateLimiter::for('limitadmin', function (Request $request) {
    return $request->user()->type == 'admin' 
                    ? Limit::none()
                    : Limit::perMinute(3);
});
```

As you can see, using the `none()` method you can create a rate limiter with an unlimited rate limit.

## Returning a custom response

You can also return a custom response instead of Laravel's standard `429 Too Many Requests` using the `response` method like so.

```php
RateLimiter::for('book', function (Request $request) {
    return Limit::perMinute(3)->response(function() {
        return new Response('Beep! Beep! Too many attempts');
    });
});
```

## In closing

The new `RateLimiter` facade is awesome and it actually makes the rate-limiting in Laravel easy to manage, scalable, and more enjoyable to use. You should consider refactoring your rate limiters to using this if you're upgrading to Laravel 8.