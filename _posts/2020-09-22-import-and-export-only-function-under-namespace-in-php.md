---
layout: post
title: Import and export only a function under namespace in PHP
image: /cdn/import-and-export-only-function-under-namespace-in-php.png
categories: [PHP]
---

The standard way of including files in modern PHP development is using [namespaces](https://www.php.net/manual/en/language.namespaces.rationale.php) and autoloading of classes using Composer. 

So, for instance, if I have the autoload setup like following in my `composer.json`...

```json
{
    ...
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
    ...
}
```

...And I have a file called `HelloWorld.php` under `app/` which contains a `HelloWorld` class, we can define it using namespace like so.

```php
<?php

namespace App;

class HelloWorld
{

}
```

You can use/import this class in other files like so.

```php
use App\HelloWorld;
```

## Defining only a function under a namespace

Recently, I was going through all the [new features of Laravel 8](https://laravel.com/docs/8.x/releases) and I saw this `queueable` function which can be used to mark the closure based listeners as "queueable". And this is the first time where I've seen only a function being defined under a namespace.

If we look closely at the source code of it, we get to know that the `queueable` function lies under the `Illuminate\Events` namespace like so.

```php
//src/Illuminate/Events/functions.php

<?php

namespace Illuminate\Events;

use Closure;

if (! function_exists('Illuminate\Events\queueable')) {
    /**
     * Create a new queued Closure event listener.
     *
     * @param  \Closure  $closure
     * @return \Illuminate\Events\QueuedClosure
     */
    function queueable(Closure $closure)
    {
        return new QueuedClosure($closure);
    }
}
```

As you can tell, the `src/Illuminate/Events/functions.php` only contains a function `queueable` under the namespace `Illuminate\Events`. 

And because it's under a namespace, you can import it elsewhere using the `use function` operator like so and start using it just like that.

```php
use function Illuminate\Events\queueable;
```

## Usefulness

This is especially useful, in my opinion, in scenarios where you don't want to create an entire class for a single function but still want to keep it under a namespace so that it's easily importable like in the case of this `queueable` function.