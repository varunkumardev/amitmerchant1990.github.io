---
layout: post
title: Authenticating certain controller methods in Laravel
image: /cdn/authenticate-method-laravel.png
categories: [Laravel]
---

There are basically two ways of using the `auth` [middleware](https://laravel.com/docs/5.8/authentication#protecting-routes) to authenticate the routes in Laravel.

You would either...

- Attach the `auth` middleware to the route itself like so.

```php
Route::get('profile', function () {
    // Only authenticated users may enter...
})->middleware('auth');
```

Or

- If you are using controllers, you may call the middleware method from the controller's constructor instead of attaching it in the route definition directly like so.

```php
public function __construct()
{
    $this->middleware('auth');
}
```

Here, in the above approach, the `auth` middleware will get applied to each of the controller methods. What if you want to apply the middleware only on certain methods? Laravel has a provision for this as well.

## Using `except` and `only` options

By providing `except` and `only` options to the `middleware` method as a second argument, it's possible to choose which controller's methods will get bound by the authentication.

Here's how you can use the `only` option,

```php
public function __construct()
{
    $this->middleware('auth', ['only' => ['delete', 'edit']]);
}
```

As you can see here, you can provide an array containing all the methods that you would want to get authenticated. Rest of the methods will work without being authenticated.

Similarly, here's how you can use `except` option,

```php
public function __construct()
{
    $this->middleware('auth', ['except' => ['index', 'show']]);
}
```

Here, you can provide an array containing all the methods that you would not want to get authenticated. Rest of the methods will get authenticated as usual.