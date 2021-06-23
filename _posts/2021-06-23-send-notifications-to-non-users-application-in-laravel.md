---
layout: post
title: Send notifications to non-users of your application in Laravel
image: /cdn/send-notifications-to-non-users-application-in-laravel.png
categories: [Laravel]
---

Typically, when you send [notifications](https://laravel.com/docs/8.x/notifications) from your Laravel app, the notifications would be attached to the users of your application in most of the scenarios.

* TOC
{:toc}

For instance, if you want to send notifications to your users, you can add the `Illuminate\Notifications\Notifiable` trait to your `App\Models\User` model like so.

```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;
}
```

And then, you can send the notification further using the `notify` method like so.

```php
use App\Notifications\SubscriptionSuccess;

$user->notify(new SubscriptionSuccess($subscription));
```

This is fine. But in some situations, you might want to send notifications to the users which are not there in your system at all. Maybe via an email or SMS. How would you do that?

## Sending notifications to non-users

As I mentioned, you might need to send notifications to the users which are not stored in your application. For instance, in one of my projects, we needed to send a promotional notification to all our email subscribers and this is when I came to know about ["On-demand notifications"](https://laravel.com/docs/8.x/notifications#on-demand-notifications) in Laravel.

In this, you can use the `Illuminate\Support\Facades\Notification` facade's `route` method to specify ad-hoc notification routing information before sending the notification.

So, if we want to send a notification to a user via email notification, you can do it like so.

```php
Notification::route('mail', 'jon@foo.com')
                ->notify(new YearlyPromotion($promotion));
```

### Multiple emails at once

If you want to send a notification to multiple emails, you pass in an array of emails to the second argument of the `route` method like so.

```php
$subscribers = ['jon@foo.com', 'jane@bar.com'];

Notification::route('mail', $subscribers)
                ->notify(new YearlyPromotion($promotion));
```

### Emails with names

Further, if you would like to provide the recipient's name when sending an on-demand notification to the mail route, you may provide an array that contains the email address as the key and the name as the value of the first element in the array like so.

```php
$subscribers = [
    'jon@foo.com' => 'Jon Snow',
    'jane@bar.com' => 'Jane Snow'
];

Notification::route('mail', $subscribers)
                ->notify(new YearlyPromotion($promotion));
```

### Channels other than email

Apart from email, you can send notifications to other channels like Nexmo or Slack using the same method like so.

```php
Notification::route('nexmo', '5555555555')
            ->route('slack', 'https://hooks.slack.com/services/...')
            ->notify(new YearlyPromotion($promotion));
```