---
layout: post
title: Create your own custom Blade directive in Laravel
image: /cdn/custom-blade-directive.png
categories: [Laravel]
---

Laravel Blade comes with many in-built directives such as `@section`, `@yield`, `@parent`, `@json` and several others, all of which have a certain purpose attached to them.

For instance, the `@json` directive can be used to encode JSON instead of directly using `json_encode` like so.

```php
<script>
    var app = @json($array);

    var app = @json($array, JSON_PRETTY_PRINT);
</script>
```

These, as I said, are in-built directives which comes with Laravel out-of-the-box. But what if you want to create your own custom directives? How would you do that? 

## Custom Blade Directive

Blade gives you the ability to define your own custom directives using the `directive` method on the `Illuminate\Support\Facades\Blade` facade. When the Blade compiler encounters the custom directive, it will call the provided [callback](https://www.php.net/manual/en/functions.anonymous.php) with the expression that the directive contains.

For, instance, if you want to create a custom directive called `@convert($var)` to convert the provided number to two decimal places, you can define that into the `AppServiceProvider`'s `boot` method like so.

```php
<?php

namespace App\Providers;

use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    // code commented for brevity

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Blade::directive('convert', function ($number) {
            return "<?php echo number_format($number, 2); ?>";
        });
    }
}
```

Now, every time you want to format a number to two decimal places in your Blade template, you just have to call it like so.

```php
@convert($var)
```

And this is how you can create your own custom Blade directive!