---
layout: post
title: Global contextual logging in Laravel 8.x
image: /cdn/the-new-contextual-logging-laravel-8x.png
categories: [Laravel]
fluidbox: true
---

Logging is an integral part of developing applications. And if you're working with Laravel, [logging](https://laravel.com/docs/8.x/logging) things is a breeze. 

All you need is to use the `Illuminate\Support\Facades\Log` and utilize the following different logging levels like so.

```php
use Illuminate\Support\Facades\Log;

Log::emergency($message);
Log::alert($message);
Log::critical($message);
Log::error($message);
Log::warning($message);
Log::notice($message);
Log::info($message);
Log::debug($message);
```

As you can tell, the logging levels are self-explanatory. Apart from this, you can also pass an array of contextual data to the log methods This contextual data will be formatted and displayed with the log message like so.

```php
use Illuminate\Support\Facades\Log;

Log::info('User failed to login.', ['id' => $user->id]);
```

Now, you can log things like this in an individual manner, sometimes you might want feasibility where you will always want certain information logged along with all your logs.

For instance, you will want to have user information every time you log something into your application. How would you do that?

Well, it turns out with the [recent minor release](https://github.com/laravel/framework/releases/tag/v8.49.0) of Laravel, you will be able to do just that.

## Global contextual logging

Along with all the logging levels I mentioned previously, now in Laravel 8.x, you'll also get a `withContext` method which you can use to include information that should be included with all subsequent log entries like so.

```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AssignRequestId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $requestId = (string) Str::uuid();

        Log::withContext([
            'request-id' => $requestId
        ]);

        return $next($request)->header('Request-Id', $requestId);
    }
}
```

As you can tell, you can use `withContext` in places from which are commonly accessible. For instance, in [request middlewares](https://laravel.com/docs/8.x/middleware).

Now, the next time you log anything, a `request-id` will also be logged along with the log message like so.

[![Laravel Global Contextual Logs](/images/laravel-contextual-logs.png)](/images/laravel-contextual-logs.png)