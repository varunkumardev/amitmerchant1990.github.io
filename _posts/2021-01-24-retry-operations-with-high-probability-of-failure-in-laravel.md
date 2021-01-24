---
layout: post
title: Retry operations with high probability of failure in Laravel
image: /cdn/retry-operations-with-high-probability-of-failure-in-laravel.png
categories: [Laravel]
---

There are certain operations that can have a high probability of failure. For instance, sending a request to a third-party API. You're not sure whether it will work every time flawlessly because it's not in your control. If the API endpoint you're hitting is not responding, you might end up with an exception straight away.

I'm sure we all don't want that to happen. So, what would you do in such a scenario? You'll "retry" the same operation, no? 

Well, if your application is built on top of Laravel, there's a really handy helper function that exists in the framework which can help you do just that.

* TOC
{:toc}

## The `retry` helper function

Essentially, `retry` is a general-purpose helper function that helps you attempt the given callback until the given maximum attempt threshold is met.

Here's the signature of this function.

```php
function retry($times, callable $callback, $sleep = 0, $when = null);
```

As you can see, the function accepts four arguments.

- `$times` - The maximum number of times you want to attempts the callback.
- `$callback` - The callback that you want to get retried (on an exception).
- `$sleep` (optional) - The number of milliseconds that Laravel should wait in between attempts.
- `$when` (optional) - The callback where you can specify an alternative logic (a [predicate](https://en.wikipedia.org/wiki/Predicate_(mathematical_logic))) on which you want the original callback to be attempted.

So, if you want to perform an API call that you want to be retried (on failure) *3 times* every *200 milliseconds*, you can use the `retry` function like so.

```php
$response = retry(3, function () {
    return Http::get('http://example.com/users/1');
}, 200)
```

Here, if the callback throws an exception, it will automatically be retried otherwise its return value will be returned. Once the maximum attempt count is exceeded, the exception will be thrown.

If you don't provide the number of milliseconds, Laravel will attempt the callback immediately.

## Retry in the `Http` client

Alternatively, you can directly call the `retries` method (which is very similar to the `retry` function) if you're using the [Http client](https://laravel.com/docs/8.x/http-client) like so.

```php
$response = Http::retries(3, 200)->get('http://example.com/users/1');
```

As you can tell, 
- The first argument that `retries` accepts is the maximum number of times the request should be attempted
- And the second argument (Optional, default = 0) is the number of milliseconds that Laravel should wait in between attempts.

If all of the requests fail, an instance of `Illuminate\Http\Client\RequestException` will be thrown.