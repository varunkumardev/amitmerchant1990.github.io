---
layout: post
title: Binding additional information to views using composers in Laravel
image: /cdn/binding-additional-information-to-views-using-composers-in-laravel.png
categories: [Laravel]
---

You know if you want to pass data to the views, you can do it while defining routes or from controllers like so.

```php
Route::get('/profile', function () {
    return view('profile', ['name' => 'Harry Potter']);
});
```

This is fine if you want to pass in related data to your views based on the context of your controller method.

But sometimes, you might want to bind additional information to certain views that might not be related to the context of your controller method.

For instance, you have a view that renders the checkout page where it displays the products, prices, subtotal, grand total, etc. But along with this, you also want to display the user's available credit as well. 

In this case, getting the user's available credit is sort of an unrelated logic in the context of the checkout details. So, in this case, we can bind the user's available credit to the view separately. And for this, we can use something called "view composers".

## What are View Composers?

Essentially, View composers are callbacks or class methods that are called when a view is rendered.

So, for instance, in the above example, if we have a view called `checkout` and we want to pass in the user's available credit to `checkout` separately, we can put this logic in a callback based view composer like so.

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;

class ViewServiceProvider extends ServiceProvider
{
    // code commented for brevity

    public function boot()
    {
        // Using Closure based composers...
        View::composer('checkout', function ($view) {
            $view->with('available_credit', Auth::user()->available_credit);
        });
    }
}
```

As you can see, you can register view composers in `App\Providers\ViewServiceProvider`'s `boot` method using `Illuminate\Support\Facades\View`'s `composer`. 

The `composer` directive accepts two parameters:

- The name of the view to which you want to render the data
- A callback or class which holds the logic to return the data

You can use the `with` method to bind data to the view as you can see. We have seen how you can use a callback in the composer but you can also use classes to hold this separately. 

## Class-based view composers

You can even refactor the composer logic to an entirely separate class as well. For this, all you'll need to do is pass in the class as the second parameter to the `composer` directive instead of the callback like so.

```php
View::composer('checkout', 'App\Http\View\Composers\AvailableLimitComposer');
```

As you can see, you can create a composer class in any directory of your choice and pass in its namespace. For instance, you could create an `app/Http/View/Composers` directory and create an `AvailableLimitComposer` for the previous example like so.

```php
<?php

namespace App\Http\View\Composers;

use App\Repositories\UserRepository;
use Illuminate\View\View;
use Illuminate\Auth\AuthManager;

class AvailableLimitComposer
{
    protected $auth;

    /**
     * @param  AuthManager  $users
     * @return void
     */
    public function __construct(AuthManager $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('available_credit', $this->auth->user()->available_credit);
    }
}
```

As you can see, you can bind view data in the `compose` method which will get called just before the view is rendered. 

Also, as all the view composers are resolved via the [service container](https://laravel.com/docs/8.x/container), you may type-hint any dependencies you need within a composer's constructor. Like the one, I've injected for `Illuminate\Auth\AuthManager` in the above example.