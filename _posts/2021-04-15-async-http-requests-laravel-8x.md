---
layout: post
title: Asynchronous HTTP client requests are coming in Laravel 8.x
image: /cdn/async-http-requests-laravel-8x.png
categories: [Laravel]
---

Back in March 2020, when Laravel 7 got [released](https://laravel.com/docs/7.x/releases), a brand new HTTP client was introduced which was essentially a wrapper of [Guzzle](https://docs.guzzlephp.org/en/stable/) HTTP client. This made the developer experience a lot smoother and easier.

* TOC
{:toc}

## Synchronous requests 

For instance, a typical POST request using the [HTTP client](https://laravel.com/docs/8.x/http-client) would look like this.

```php
$response = Http::post('http://test.com/users', [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);
```

As opposed to the pre-Laravel 7.x era where you would need to use Guzzle as an external library like so.

```php
$client = new \GuzzleHttp\Client();

$request = $client->post('http://test.com/users',  [
    'name' => 'Steve',
    'role' => 'Network Administrator',
]);

$response = $request->send();
```

As you can tell, the request made using HTTP client of Laravel 7.x, even though is using Guzzle under-the-hood, looks more concise and elegant.

All these requests that you make using the HTTP client, are synchronous in nature. So, if you're calling 5 external requests, each will be called once the request before it is done getting the response. There should be some sort of asynchronous nature to these requests.

And as it turns out, Guzzle is already providing the support for asynchronous requests in the form of [Guzzle/Promises](https://github.com/guzzle/promises).

So, it was only a matter of implementing it in Laravel's HTTP client.

And [this recent PR](https://github.com/laravel/framework/pull/36948) exactly tries to do the same.

## Concurrent asynchronous requests

As I mentioned previously, [this PR](https://github.com/laravel/framework/pull/36948) by [Andrea Marco Sartori](https://github.com/cerbero90) is bringing concurrency while sending asynchronous requests with the Laravel HTTP client by using [Guzzle/Promises](https://github.com/guzzle/promises) under-the-hood. The PR will be included in the next release of Laravel 8.x.

There are essentially two ways you can make asynchronous requests using this.

- Asynchronous requests using `async()`
- A pool to handle multiple asynchronous requests concurrently

### Asynchronous requests using `async()`

If you want to create an asynchronous request, you can create it like so.

```php
$promise = Http::async()->get($url);
```

As you can tell, you need to chain the `async()` method on the Http client before making the request. But instead of returning a response, this will return a [promise](https://github.com/guzzle/promises#promise) which you can resolve/reject. 

So, how will you get the response? You can further chain the `then()` method based on whether a promise is fulfilled or rejected like so.

```php
$promise = Http::async()->get($url)->then(
    fn (Response|TransferException $result) => $this->handleResult($result)
);
```

As you can tell, the callback in the `then()` method can receive the following based on the promise's status.

- An instance of `Illuminate\Http\Client\Response` if the promise is fulfilled
- An instance of `Illuminate\Http\Client\Response` if the promise is rejected but a response was provided (`4xx`, `5xx` errors)
- An instance of GuzzleHttp\Exception\TransferException if the promise is rejected with no response (e.g. timeout)

And that is how you can get the response of an asynchronous request.

### The pool for multiple async requests

If you want to make multiple async requests at the same time, you can use the pool like so.

```php
use Illuminate\Http\Client\Pool;

// the waiting time will be ~6 seconds instead of 12
$responses = Http::pool(fn (Pool $pool) => [
    $pool->get('https://httpbin.org/delay/6')->then(/* ... */),
    $pool->get('https://httpbin.org/delay/3')->then(/* ... */),
    $pool->get('https://httpbin.org/delay/3')->then(/* ... */),
]);

$responses[0]->ok();
$responses[1]->successful();
```

Since all of the requests in the pool are asynchronous, the slowest request determines the maximum waiting time for all promises to be fulfilled.

Asynchronous requests can also be added to the pool with a key:

```php
$responses = Http::pool(fn (Pool $pool) => [
    $pool->add('foo')->get('https://httpbin.org/delay/6')->then(/* ... */),
    $pool->add('bar')->get('https://httpbin.org/delay/3')->then(/* ... */),
    $pool->add('baz')->get('https://httpbin.org/delay/3')->then(/* ... */),
]);

$responses['foo']->ok();
$responses['bar']->successful();
$connectionFailed = $responses['baz'] instanceof GuzzleHttp\Exception\ConnectException;
```

Responses are instances of `Illuminate\Http\Client\Response` if requests were responded (`2xx`, `3xx`, `4xx`, `5xx`). Otherwise, if no response was received, the exception that provoked the promise rejection is returned.

## In Closing

And this is how you will be able to make asynchronous requests in the future Laravel versions. This will significantly reduce the response time if you are making multiple requests to third-party APIs and hence will improve the user experience.

You can learn more about this feature in [this PR](https://github.com/laravel/framework/pull/36948).