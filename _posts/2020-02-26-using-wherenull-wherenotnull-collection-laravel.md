---
layout: post
title: Using whereNull and whereNotNull in Eloquent Collection in Laravel
image: /cdn/wherenull-laravel-collection.png
categories: [Laravel]
---

Working with Laravel Eloquent, we always had this ability to check `null` fields when builing queries on models. For instance, if you want to check if `email_verified_at` field is `null` or not, you'd check it like so.

```php
$users = User::whereNotNull('email_verified_at')->get();
```

This wasn't the case if you want to do the same thing on [collection](https://laravel.com/docs/6.x/eloquent-collections). In order to check the similar condition, you'd check manually like so.

```php
$users = User::all();

$unverifiedUsers = $users->whereStrict('is_verified_at', null);

$verifiedUsers = $users->where('is_verified_at', '!==', null);
```

But things has been changed from Laravel version [6.15.1](https://github.com/laravel/framework/releases/tag/v6.15.1). There's this PR [#31425](https://github.com/laravel/framework/pull/31425) which adds `whereNull` and `whereNotNull` to `Collection` as well. So now, you'd be able to perform the similar condition which you're used to perform on Query builder, on `Collection` as well. Here's how you could do it.

```php
$users = User::all();

$unverifiedUsers = $users->whereNull('is_verified_at');

$verifiedUsers = $users->whereNotNull('is_verified_at');
```

As you can see, we've got a little convenience in here which I think is always welcomed by the community.
