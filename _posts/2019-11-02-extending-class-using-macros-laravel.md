---
layout: post
title: Extending class behaviour in Laravel using Macros
image: /cdn/laravel-macros.jpeg
categories: [Laravel]
---

In this article, I'm going to discuss about the feature in Laravel using which you can extend the functionality of certain Laravel's core classes without even touching the original codebase.

## Macroable Classes

Laravel ships with this trait called [Illuminate\Support\Traits\Macroable](https://github.com/laravel/framework/blob/6.x/src/Illuminate/Support/Traits/Macroable.php) whose sole purpose is to make the class the "Macroable" in which it's used. A class is macroable, meaning it allows you to add additional methods to the class in hand at run time. 

So, what this trait do is enable the developers to add additional behaviour to the class without modifying the original class source code. You specifically need to check if the class you want to add behaviour to using this trait or not in order to use macros. Here are a few Laravel classes that uses `Macroable` trait.

- Illuminate\Support\Collection
- Illuminate\Support\Str
- Illuminate\Http\UploadedFile
- Illuminate\Http\RedirectResponse
- Illuminate\Http\Request
- Illuminate\Routing\ResponseFactory
- Illuminate\Routing\UrlGenerator
- Illuminate\Routing\Router

## Declaring Macros

For instance, we've got `Illuminate\Support\Collection` class in Laravel which is a "macroable" class. Now, in order to add an additional method, let's say an additional method called `makeKebab` to this class which convert each items of the collection to the kebab case, you can use a static `::macro` method like so.

```php
namespace App\Providers;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class AppServiceProvider
{
    public function boot()
    {
        Collection::macro('makeKebab', function () {
            return $this->map(function ($value) {
                return Str::kebab($value);
            });
        });
    }
}
```

As you can see, you typically need to declare macros into the service provider's `boot` method. In our case it's `App\Providers\AppServiceProvider`. Here, we've called the `::macro` method on the `Collection` class which accepts two arguments. The first argument being the name of the method that we're going to use and the second one is a closure which implements the actual functionality. 

## Using Macros

We can now call the `makeKebab()` method on the collection which in our case will convert all the items of the collection to the kebab case. Here's how to use it.

```php
$collection = collect(['laravel is awesome', 'foo bar']);

$upper = $collection->makeKebab();

// ['laravel-is-awesome', 'foo-bar']
```

That's it! That is how you can add behaviour to the class without disturbing the class's original implementation.

## Behind the scenes

If you take a look at the `Illuminate\Support\Traits\Macroable` trait you'll get to know it by using this trait your class will **inherit** a static `$macros` array property. And using the static `macro` method it will assign the closure as a `callable` to the `$name` as index of the `$macros` like so.

```php
public static function macro($name, $macro)
{
    static::$macros[$name] = $macro;
}
```

Now, when the method gets called on that class, let's say `makeKebab` in our previous example, as the method is inaccessible in the class, it will trigger PHP's [__call()](https://www.php.net/manual/en/language.oop5.overloading.php#object.call) magic method. Here's the imepelmentation of `__call()` magic method in the `Macroable` trait.

```php
public function __call($method, $parameters)
{
    if (! static::hasMacro($method)) {
        throw new BadMethodCallException(sprintf(
            'Method %s::%s does not exist.', static::class, $method
        ));
    }

    $macro = static::$macros[$method];
    if ($macro instanceof Closure) {
        return call_user_func_array($macro->bindTo($this, static::class), $parameters);
    }
    
    return $macro(...$parameters);
}
```

What happens here is, it will first check if the specified method exist in the `$macros` property. If not, it will throw `BadMethodCallException` and if it exist, it will proceed with calling the `Closure`(which is the one provided as second parameter of `::macro` method) using the `call_user_func_array` method along with the specified parameters.

## In closing

Laravel Macros are great if you want to quickly spin up a repeating logic on Laravel's core classes whenever you find yourself dilemma of reusing your code.

