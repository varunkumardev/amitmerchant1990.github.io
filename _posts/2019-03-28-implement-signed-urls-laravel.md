---
layout: post
title: Implement Invite-only registrations using Laravel's signed URLs
categories: [Laravel]
image: /cdn/signed-url-laravel.png
---

There comes a time when you want URLs which are public but still you want some kind of authentication onto the same. For instance, you'd want such kind of URLs to enable invite-only registrations for your applications, where you'd send a URL to the user which that specific person only can access and register. In such scenarios, signed URLs can come in handy which are the special kind of URLs that have a "signature" hash appended to the query string to verify that the URL has not been modified since it was created. 

{% include affiliates.html %}

Laravel 5.8 comes with the capability to easily create "signed" URLs to named routes. We'll learn how you can implement the signed routes step-by-step

## The routes

First of all, let's create a route from which the user will be registered and will be a signed route in the `routes/web.php` file.

```php
Route::get('/register/{id}', function () {
    return view('registerSuccess');
})->name('register');
```

As you can see above, it's a named route of name `register` which we will be using when the the time of signing it. 

After this, we'll create a route that will return the desired signed route for the particular user.

```php
Route::get('/user/{id}', 'UserController@getSignedUrl');
```

## The controller

Now, as shown in the above route, we'll create the `UserController` and in that a method called `getSignedUrl` which will return us the signed URL for registration of the user.

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\URL;

class UserController extends Controller
{
    /**
     * Return the signed URL of the specified user
     *
     * @param  int  $id
     * @return View
     */
    public function getSignedUrl($id)
    {
        echo URL::signedRoute('register', ['user' => $id]);
    }
}
```

As you can see above, we can create a signed URL for a named route by using the `signedRoute` method of the `URL` facade.

The above code will generate the following URL for the specified user: `http://127.0.0.1:8000/register?user=2&signature=4a46863bb35054c0d8d2d99f4701b65c4384ae393a39a4b7bca55e87be1133f3`

As you can see, the URL has two parameters `user` and `signature` appeneded as a query string which allows Laravel to verify that the URL has not been modified since it was created.

## Validating Signed Route Requests

Next, in order to verify if the incoming request has a valid signature, we'll need to call the  `hasValidSignature` method on the incoming Request. So, go back to the `routes/web.php` file and add following code to the `register route.

```php
Route::get('/register/{id}', function () {
    if (! $request->hasValidSignature()) {
        abort(401);
    }

    return view('registerSuccess');
})->name('register');
```

## Validating using `ValidateSignature` route middleware

Apart from `hasValidSignature` method, we can use the `Illuminate\Routing\Middleware\ValidateSignature` middleware to the route. We can do this by assigning this middleware a key in your HTTP kernel's `routeMiddleware` array:

```php
protected $routeMiddleware = [
    ...
    'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
];
```

And then all we need to do is to attach this middleware to our `register` route and the middleware will automatically return a `403` error response if the incoming request does not have a valid signature.

```php
Route::get('/register/{id}', function () {
    return view('registerSuccess');
})->name('register')->middleware('signed');
```

## Furher reading

You can read more about signed URLs at the official documentation [here](https://laravel.com/docs/5.8/urls#signed-urls). Until next time!