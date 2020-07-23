---
layout: post
title: Using JavaScript-style Promises in PHP
image: /cdn/using-javascript-style-promises-php.png
categories: [PHP]
---

If you're familiar with JavaScript, you might have worked with or at least heard about [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) at some point of time. 

So, in a nutshell (in the context of JavaScript),

> A promise is an object that may produce a single value sometime in the future: 1. a resolved value, or 2. a reason that it’s not resolved (e.g., a network error occurred)

Based on this, a promise can be in one of these 3 possible states:

1. Pending
2. Fulfiled
3. Rejected

A Promise in JavaScript can be created like so.

```js
let promise = new Promise(function(resolve, reject) {
  // do something
});
```

As you can see, the `Promise` object here accepts a callback. The callback function then takes two arguments: `resolve` and `reject`. The arguments `resolve` and `reject` are callbacks provided by JavaScript itself.

Both of these callbacks can be called inside the promise callback in the following scenario.

- `resolve(value)` — If the job finished successfully, with result value.
- `reject(error)` — If an error occurred, error is the error object.

So, if we want to create a promise based on these, it would be like so.

```js
let promise = new Promise(function(resolve, reject) {
    if(somthingIsTrue) {
        resolve("Promise is resolved");
    } else {
        reject("Whoops!")
    }
});
```

And this promise than can be consumed using basically three methods: `.then`, `.catch` and `.finally` like so.

```js
promise.then(
    result => alert(result), // Alerts "Promise is resolved"
).catch(
    error => alert(error) // Alerts "Whoops!" if the promise gets rejected
).finally(
    () => alert('Runs even if the promise is resolved or not')
);
```

## Using Promises in PHP? Oh yeah!

Now, that's about JavaScript! But what if you want to do something like this in PHP? Well, like JavaScript, PHP is also a single-thread language. Meaning, it has one call stack and one memory heap to process things. But unlike JavaScript, PHP doesn't come with Promises in-built.

But the good news is, good folks at [ReactPHP](https://reactphp.org) have implemented a [Promise implementation](https://reactphp.org/promise/) based on [CommonJS Promises/A](https://github.com/reactphp/promise) standards upon which the JavaScript promises has been implemented.

To get started, you'll have to implement the library using Composer like so.

```json
$ composer require react/promise:^2.8
```

That's it! You can start using the promises right away. 

## Creating a Promise

Just like JavaScript, we have a `Promise` object which accepts two callbacks: a `$resolver` and `$canceller` (just like JavaScript promises) like so.

```php
$promise = new React\Promise\Promise($resolver, $canceller);
```

Next, we'll pass in actual callbacks to the `Promise` object like so.

```php
include_once './vendor/autoload.php';

use React\Promise\Promise;

$resolver = function (callable $resolve, callable $reject, callable $notify) {
    
    $resolve('Promise is resolved');
    // or throw new Exception('Promise rejected');
    // or $resolve($anotherPromise);
    // or $reject($nastyError);
    // or $notify($progressNotification);
};

$canceller = function () {
    // Cancel/abort any running operations like network connections, streams etc.

    // Reject promise by throwing an exception
    throw new \Exception('Promise cancelled');
};

$promise = new Promise($resolver, $canceller);
```

Now, as you can see, the `$resolver` accepts three parameters: `$resolve`, `$reject`, and `$notify` which are all methods which you can call in different circumstances.

- `$resolve` can be called when the job of the promise is successful with the result.
- `$reject` can be explicitly called when you want to reject the promise in case of any exception or error or you can just throw an exception if you want to reject the promise.
- `$notify` can be called when you want to give information about the progression of the promise.

If the resolver or canceller throws an exception, the promise will be rejected with that thrown exception as the rejection reason.

The resolver function will be called immediately, the canceller function only once all consumers called the `cancel()` method of the promise.

In our example, I've used `$resovle` just to demonstrate how it will return the result when we'll be *"consuming"* the promise. Which takes us to the final part of this article.

## Consuming a Promise

Once the promise is created, it's now ready to be consumed. 

So, when the promise is fulfilled successfully, we can call `then()` method on the promise which accepts two callbacks like so. So, using the promise from the previous example.

```php
$promise
    ->then(function($value) {
        echo $value; // prints "Promise is resolved"
    }, function($value) {
        echo $value; // prints "Promise cancelled"
    });
```

The first callback will be called the promise is successfully "resolved" with a value. And the second callback will be called when the promise is "rejected" with the error.

Oh, and you can also chain the promises if you want to perform additional operations on the promise result like so.

```php
$promise
    ->then(function($value) {
        return strtoupper($value);
    })
    ->then(function($value) {
        echo $value; // prints "PROMISE IS RESOLVED"
    }, function($value) {
        echo $value; // prints "PROMISE CANCELLED"
    });
```

And that wraps the introduction to get started with promises in PHP, JavaScript-style.

Let me know in the comments what you liked most about this implementation and in which different scenarios you would use Promises.

You can learn about Promises more thoroughly on its [official documentation](https://reactphp.org/promise/).

Until next time!