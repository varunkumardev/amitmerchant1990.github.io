---
layout: post
title: How to use Laravel 7 style controller route definitions in Laravel 8
image: /cdn/use-Laravel7-style-controller-route-definitions-in-Laravel-8.png
categories: [Laravel]
---

One of the most prominent changes in Laravel 8 is the (kind of) new way of defining controller routes. Before Laravel 8, if you wanted to define a route, you could do it like so.

```php
Route::get('/home', 'HomeController@index']);
```

Here, as you can tell, `UserController` is the controller and `index` in the method of the controller we want to call on this route. 

Now, this was used to work fine because, under the hood, Laravel used to append controller namespace using the `$namespace` property of the `app/Providers/RouteServiceProvider` like so.

```php
protected $namespace = 'App\Http\Controllers';
```

So, the previous route definition would get resolved to the following.

```php
Route::get('/home', 'App\Http\Controllers\HomeController@index']);
```

## What's changed in Laravel 8?

With the [release of Laravel 8](https://laravel.com/docs/8.x/releases), the aforementioned way would not work. And if you do, you'll get the following error.

```js
Illuminate\Contracts\Container\BindingResolutionException
Target class [HomeController] does not exist.
```

This is because the `$namespace` property I talked about previously has been completely removed from `app/Providers/RouteServiceProvider`.

So, if you've just bootstrapped a new application using Laravel 8, you can start using the new syntax which encourages you to use [Fully Qualified Class Names (FQCN)](https://en.wikipedia.org/wiki/Fully_qualified_name) for controllers like so.

```php
use App\Http\Controllers\HomeController;

Route::get('/home', [HomeController::class, 'index']);
```

## Using old route definitions in Laravel 8

But if you're like me who has just upgraded his/her Laravel application from 7.x to 8.x and still want to use the old syntax, you can add the `$namespace` property back to the `app/Providers/RouteServiceProvider` like so.

```php
protected $namespace = 'App\Http\Controllers';
```

And everything should work fine!

## In closing

In my opinion, the newer syntax is much nicer than the previous one as it encourages to use FQCNs and this can help navigate to controller classes if you're using IDEs like PhpStorm. So, you should consider refactoring your code to using this syntax to make things more accessible.

But if you don't want to do upgrade to the new syntax, fret not! I've already explained you the way. ;)
