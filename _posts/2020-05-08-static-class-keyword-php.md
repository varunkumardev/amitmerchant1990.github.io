---
layout: post
title: Using ::class static class keyword in PHP
image: /cdn/static-class-keyword.png
categories: [PHP]
---

If you've worked with modern frameworks such as [Laravel](https://www.jetbrains.com/phpstorm/), you might have seen this keyword `::class` be used extensively throughout the application.

So, for instance, in Laravel, in `app/Http/Kernel.php`, there's a property `$middleware` which contains all the middlewares that the application is using. Here's how the property looks like.

```php
protected $middleware = [
    \App\Http\Middleware\CheckForMaintenanceMode::class,
    \Illuminate\Foundation\Http\Middleware\ValidatePostSize::class,
    \App\Http\Middleware\TrimStrings::class,
    \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
    \App\Http\Middleware\TrustProxies::class,
];
```

So, what does the `::class` keyword exactly do in this case? Well, when you append the `::class` keyword to any class, PHP will resolve it into a string which contains the fully qualified name of the class.

So, the following,

```php
\App\Http\Middleware\CheckForMaintenanceMode::class
```

is equivalent to...

```php
'App\Http\Middleware\CheckForMaintenanceMode'
```

## Usefulness

One should use the `::class` instead of using the fully qualified name as a string, as it can help in navigating to the class from the IDE such as [PhpStorm](https://www.jetbrains.com/phpstorm/) right from where it's defined.

Apart from this, it helps in reducing the human error while trying to write the fully qualified class names as a string as you just need to import the class which is again very easy in PhpStorm.