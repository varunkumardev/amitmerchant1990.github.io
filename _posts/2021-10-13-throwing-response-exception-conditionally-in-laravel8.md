---
layout: post
title: Throwing response exceptions conditionally in Laravel 8.x
image: /cdn/throwing-response-exception-conditionally-in-laravel8.png
categories: [Laravel]
---

When you're using Laravel's [Http client](https://laravel.com/docs/8.x/http-client) to make [Http](https://developer.mozilla.org/en-US/docs/Web/HTTP) requests and something went wrong from the server-side, the server would return [one of the error reponses](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses) such as 500 Internal Server Error, 502 Gateway Timeout, and so on.

Now, Laravel already comes with a method called `throw()` that you can call on the response instance if there are any client or server errors. The method would throw an instance of `Illuminate\Http\Client\RequestException` in such a scenario.

```php
$response = Http::post('http://test.com/user/add', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);

// Throw an exception if a client or server error occurred...
$response->throw();

return $response;
```

This is pretty alright but what if you want to throw this exception conditionally? For instance, you would only want to throw exceptions in the production environment. How would you do that?

Well, this is where this new method called `throwIf()`, which is added in the recent release of Laravel, comes into the picture.

## The `throwIf` method

[This PR](https://github.com/laravel/framework/pull/39148) in Laravel 8.x adds a method called `throwIf()` which is exactly the same way as the `throw()` method but with an added advantage of throwing exception conditionally.

So, if you want to throw exceptions only in the production environment in the previous example, here's how you can do it using the `throwIf()` method.

```php
$response = Http::post('http://test.com/user/add', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);

$production = app()->environment('production');

// Throw an exception if when in production environment
$response->throwIf($production);

return $response;
```

This is useful because in a local environment, for instance, you might want to debug the errors instead of straight-up throwing exceptions!