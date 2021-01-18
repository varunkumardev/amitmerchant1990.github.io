---
layout: post
title: How to prevent overlapping of jobs in Laravel
image: /cdn/prevent-overlapping-of-jobs-in-laravel.png
categories: [Laravel]
---

When you are using Laravel queues, you might bump into the situation where you want to prevent overlapping of jobs that handles sensitive information. This could be to provide data integrity of important information such as the user's wallet balance.

Let's say the user's wallet balance is being updated by a job called `App\Jobs\UpdateUserWallet` and this job will get invoked each time the user does a transaction from his/her account. How can you make sure that the wallet balance of the user won't get updated by two different job instances at the same time? How can you maintain the integrity of the user's balance in such a case?

Well, Laravel is being shipped with a handy job middleware called `WithoutOverlapping` just for this purpose.

* TOC
{:toc}

## The `WithoutOverlapping` middleware

The `WithoutOverlapping` middleware provided by Laravel can be used to prevent overlapping of jobs based on an arbitrary key. For instance, in our case, it would be the user's `id` for which we are updating the wallet's balance.

This can prevent modifying the wallet's balance by two different instances of the same job by preventing them from overlapping each other. Meaning, if, for example, `App\Jobs\UpdateUserWallet` is dispatched and if you're using this middleware, it won't allow another instance of the job to be dispatched until the first job is completed.

You can achieve this by returning the `WithoutOverlapping` middleware from the `middleware` method of your job. 

So, if we were to make use of `WithoutOverlapping` in our previous example, we can do it using `$this->user->id` as an arbitrary key like so.

```php
<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\Middleware\WithoutOverlapping;

class UpdateUserWallet implements ShouldQueue
{
    /**
     * The user instance.
     *
     * @var \App\Models\User
     */
    protected $user;

    /**
     * Create a new job instance.
     *
     * @param  App\Models\User  $user
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    // commented `handle` method for brevity

    public function middleware()
    {
        return [new WithoutOverlapping($this->user->id)];
    }
}
```

## Behind the scenes

Laravel does this by acquiring [atomic lock](https://laravel.com/docs/8.x/cache#atomic-locks) on the job through the `WithoutOverlapping` middleware. You can see this by going to `Illuminate\Queue\Middleware\WithoutOverlapping`'s `handle` method which looks like the following.

```php
$lock = Container::getInstance()->make(Cache::class)->lock(
    $this->getLockKey($job), $this->expiresAfter
);
```

So, this middleware will only work with cache drivers that support atomic lock. Drivers such as `memcached`, `redis`, `dynamodb`, `database`, `file`, and `array` can be used seamlessly with this middleware.

Apart from this, there are a couple of more things that you can do with this middleware.

## Release overlapping jobs back to queue

If there are, for instance, any overlapping jobs that occur, they can be released back onto the queue by using the `releaseAfter` method where you'd need to specify the number of seconds that must elapse before the released job will be attempted again like so.

```php
public function middleware()
{
    return [(new WithoutOverlapping($this->user->id))->releaseAfter(30)];
}
```

This will release back any overlapping jobs onto the queue 30 seconds later once the ongoing job is processed.

## Remove any overlapping jobs

If you don't want any overlapping jobs to be released back onto the queue, you can use the `dontRelease` method like so.

```php
public function middleware()
{
    return [(new WithoutOverlapping($this->user->id))->dontRelease()];
}
```