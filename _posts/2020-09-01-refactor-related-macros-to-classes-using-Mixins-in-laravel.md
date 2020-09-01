---
layout: post
title: Refactor related macros to classes using Mixins in Laravel
image: /cdn/refactor-related-macros-to-class-using-Mixins-in-laravel.png
categories: [Laravel]
---

In one of [my articles](/extending-class-using-macros-laravel/), I've described how you can add different behavior to some of the classes in Laravel using macros. To give you a primer, Laravel ships with this trait called [Illuminate\Support\Traits\Macroable](https://github.com/laravel/framework/blob/6.x/src/Illuminate/Support/Traits/Macroable.php) using which you can add additional methods to the class in hand at run time.

For instance, we’ve got `Illuminate\Support\Str` class in Laravel which is a “macroable” class. And if you want to add an additional method which doesn't exist in the class currently, you can do it like so.

```php
namespace App\Providers;

use Illuminate\Support\Str;

class AppServiceProvider
{
    public function boot()
    {
        Str::macro('makeInvoiceId', function ($value) {
            return 'INVOICE-'.$value;
        });
    }
}
```

Now, you can use this method on the `Illuminate\Support\Str` just like a regular method like so.

```php
$invoiceId = Str::makeInvoiceId('87475867');
// INVOICE-87475867
```

You can go on making different macros in your `AppServiceProvider`'s `boot` method. But one thing to note here is when you tend to define many (but related) macro methods, your `boot` method can quickly get bloated. For instance, let's say you want to add two more such methods on the `Illuminate\Support\Str` class coupled with macros for other classes as well, you can imagine where we are going.

This can be solved by using macro mixins.

## What is `mixin`?

The `Illuminate\Support\Traits\Macroable` contains a method named `mixin` which can be used to refactor related macros to a dedicated class.

For instance, if we want to move the `Illuminate\Support\Str` class' mixin class by creating an `app/Mixins` directory like so.

```php
namespace App\Mixins;

class StrMacros
{
    public function makeInvoiceId()
    {
        return function ($value) {
            return 'INVOICE-'.$value;
        }
    }
}
```

As you can see, this is a simple PHP class and here, you can create as many macro methods as you may like which will act as methods just like you'd be creating using the `macro` method. Note also that, the function returns a callback function, similarly how you'd pass to the `macro`. Notice also that the `makeInvoiceId` doesn't receive any parameter at all. Instead, the closure inside is receiving the parameter. That's some kind of magic!

Now, to use this all you need to do is pass in this class to call the `mixin` method on the `Illuminate\Support\Str` class like so.

```php
namespace App\Providers;

use Illuminate\Support\Str;
use App\Mixins\StrMacros;

class AppServiceProvider
{
    public function boot()
    {
        Str::mixin(new StrMacros);
    }
}
```

You can create many such macros for classes that are `Macroable` and group related macros.

And there you have it. Your macros refactored nicely to a separate class which is far better and elegant than bloating the `AppServiceProvider` with scattered standalone macros.