---
layout: post
title: Using custom class as a Facade in Laravel
image: /cdn/custom-class-facade.png
categories: [Laravel]
---

Facades, in Laravel, is basically a way of using Laravel's classes without [injecting them into the constructor](/constructor-method-injection-laravel/) of the class in which you want to use them.

So, for instance, if you want to utilize Laravel's `Illuminate\Http\Request` class in your controller, you can do this using dependency injection like so.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $name = $request->input('name');

        //
    }
}
```

The same can be done using the request facade `Illuminate\Support\Facades\Request` like so, which doesn't involves dependency injection.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Request;

class UserController extends Controller
{
    /**
     * Store a new user.
     *
     * @return Response
     */
    public function store()
    {
        $name = Request::input('name');

        //
    }
}
```

As you can see, we did this without using dependency injection. Facades do this by providing a *"static"* interface to classes that are available in the application's [service container](https://laravel.com/docs/7.x/container). All of Laravel's facades are defined in the `Illuminate\Support\Facades` namespace which can be consumed as I've described above.

But, what if you want to use your own defined class as a facade? Well, this can be done using a feature called **"Real-Time Facades"** that ships with Laravel in-built.

## Custom Facades using Real-Time Facades

To use your custom class as a facade, all you have to do is to  prefix the namespace of the class the you want to import with `Facades`, which makes the class a "real-time facade".

So, for instance, you have this class called `App\Currency` and you want to consume it inside your controller, you can do this using dependency injection like so.

```php
<?php

namespace App\Http\Controllers;

use App\Currency;

class OrderController extends Controller
{
    /**
     * Fetch currencytore a new user.
     *
     * @param  Currency  $currency
     */
    public function fecthCurrency(Currency $currency)
    {
        $currentCurrency = $currency->getCurrentCurrency();
    }
}
```

In order to use *"real-time facades"* in above example, all you've to do is prefix `App\Currency` with `Facades` like so.

```php
<?php

namespace App\Http\Controllers;

use Facades\App\Currency;

class OrderController extends Controller
{
    /**
     * Fetch currency
     */
    public function fecthCurrency()
    {
        $currentCurrency = Currency::getCurrentCurrency();
    }
}
```

As you can see, you'll be able to use the same class as a facade without a need of dependency injection, just like any other in-built class. 

Easy-peasy, no?

