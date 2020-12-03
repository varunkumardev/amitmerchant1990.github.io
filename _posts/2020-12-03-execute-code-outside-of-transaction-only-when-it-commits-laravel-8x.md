---
layout: post
title: Execute code outside of transaction only when it commits in Laravel 8.x
image: /cdn/execute-code-outside-of-transaction-only-when-it-commits-laravel-8x.png
categories: [Laravel]
---

Sometimes, there might be a case where you would want some of the code that lies outside of the transaction to be executed only when the corresponding transaction commits successfully and if in any case, it's a rollback, that code shouldn't be executed.

Well, Laravel has just added the ability to do the same. [This PR](https://github.com/laravel/framework/pull/35373) in Laravel v8.17.0 by [Mohamed Said](https://github.com/themsaid) introduces a transaction manager class that records [transactions](https://laravel.com/docs/8.x/database#database-transactions), commits, and rollbacks. It also records code execution that should be transaction aware using the `DB::afterCommit` method. 

You can write the code to be executed inside the closure that you would need to pass to the `DB::afterCommit` method.

## Using `DB::afterCommit` method

Quoting the PR, let's say we have the following code which incorporates a `User` model, wrapped around by a transaction...

```php
DB::transaction(function () {
    $user = User::create([...]);

    $user->teams()->create([...]);
});
```

Now, you have a code outside of this transaction that you want to be executed once the transaction is committed and discarded when it rolls back. For instance, there's a listener registered on the `user.created` [Eloquent event](https://laravel.com/docs/8.x/eloquent#events) that sends a welcome email. Inside the listener, you can write that code in the `DB::afterCommit` method like so.

```php
public function handle()
{
    DB::afterCommit(function () {
        Mail::send(...);
    });
}
```

Note here that, this code will still work as the code will be executed right away if there's no enclosing transaction.