---
layout: post
title: Catchable queued closures in Laravel 8
image: /cdn/catchable-queued-closures-in-laravel-8.png
categories: [Laravel]
---

One of the handiest features of Laravel is the ability to dispatch Closures to queues. This is because you don't always need to create a job class for simple tasks such as sending emails.

So, for instance, we want to dispatch the email sending the part to the queue, we can do it like so.

```php
$user = App\User::find(1);

dispatch(function () use ($user) {
    Mail::to($user->email)->send(new \App\Mail\OrderShipped);
});
```

Now, this is already a nice feature to have but it was missing a critical thing. The ability to catch errors if something goes wrong while executing the queued closures.

## The `catch` method

Laravel 8 tries to solve this by adding this ability using a new `catch` method which can be used on the `dispatch` method. The method accepts a Closure which will be executed if the queued Closure fails after exhausting all of your queue's configured retry attempts defined by `retry_after` on the queue driver's configuration in your `config/queue.php` file.

So, the previous example can be rewritten with `catch` like so.

```php
use Throwable;

dispatch(function () use ($podcast) {
    Mail::to($user->email)->send(new \App\Mail\OrderShipped);
})->catch(function (Throwable $e) {
    // This job has failed...
});
```

As you can tell, the catch Closure receives the instance of the [Throwable](https://www.php.net/manual/en/class.throwable.php) interface which can be used to identify the error occurred during Closure's execution in the queue.

This is especially useful in logging exception information to log files or to external services to know what led the queue to the failed state.