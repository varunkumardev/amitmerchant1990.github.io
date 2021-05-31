---
layout: post
title: Blade stringable to handle objects centrally in Laravel 8.x
image: /cdn/blade-stringable-to-handle-objects-centrally-in-laravel-8x.png
categories: [Laravel]
fluidbox: true
---

Wouldn't it be useful if you could define a certain action that should be performed every time your [Blade templates](https://laravel.com/docs/8.x/blade) encounter objects of a specific class?

So, for instance, let's say when working with libraries such as [Carbon](https://carbon.nesbot.com/docs/), it's often the case where you would want to format it in a certain way throughout your application.

Normally, if you want to format the date in a specific format for a `Carbon` instance, you could do it in [Blade templates](https://laravel.com/docs/8.x/blade) like so.

```php
{{ $post->created_at->format('d-m-Y') }}
```

This is fine. But as you can tell, you would find yourself repeating the same at other places in your application as well. When all you'd want is to format it similarly everywhere where the `Carbon` instance is found in your Blade templates.

[This PR](https://github.com/laravel/framework/pull/37478) for Laravel 8.x tries to solve this very problem.

## Blade Stringable

As it turned out, [this PR](https://github.com/laravel/framework/pull/37478) introduces a new `Blade::stringable()` method that can be placed in the boot method of a [Service Provider](https://laravel.com/docs/8.x/providers) and allows the user to add intercepting closures for any class. The returned value will be outputted in Blade.

So, if we want every `Carbon` object found in Blade templates to be formatted in a certain way, we can define it in the `boot` method of the `App\Providers\AppServiceProvider` like so.

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Blade::stringable(Carbon::class, fn($object) => $object->format('d-m-Y')));
    }
}
```

Once done, you don't need to format the [Carbon](https://carbon.nesbot.com/docs/) based dates in your application manually. The specified format in the `Blade::stringable` will be applied to every available `Carbon` date in your application.

Pretty handy, right?

You can apply this to just about any class/library where you want some uniformity throughout your application.
