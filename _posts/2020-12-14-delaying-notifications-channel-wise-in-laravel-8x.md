---
layout: post
title: Delaying notifications channel-wise in Laravel 8.x
image: /cdn/delaying-notifications-channel-wise-in-laravel-8x.png
categories: [Laravel]
---

Up until now, if you would need to delay notifications, you could do it by chaining the `delay` method onto your notification instantiation like so.

```php
$delay = now()->addMinutes(10);

$user->notify((new InvoicePaid($invoice))->delay($delay));
```

The problem with this is it will delay [all the notification channels](https://laravel.com/docs/8.x/notifications#specifying-delivery-channels) which has been associated with the notifications.

But thanks to a [recent PR](https://github.com/laravel/framework/pull/35273) in Laravel 8.x which bring in the support for specifying delay per channel.

For instance, you can specify delay per channel by passing an array to the `delay` method to specify the delay amount for specific channels like so.

```php
$user->notify((new InvoicePaid($invoice))->delay([
    'mail' => now()->addMinutes(5),
    'sms' => now()->addMinutes(10),
]));
```

Interesting thing here to note is when using array, only channels specified in the array will get delayed. If a channel is not present in the array, it won't be delayed.

