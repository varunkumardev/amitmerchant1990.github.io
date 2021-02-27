---
layout: post
title: Adding lines conditionally in Laravel's Mail notifications
image: /cdn/adding-lines-conditionally-in-laravel-mail-notifications.png
categories: [Laravel]
---

When working with Mail notifications in Laravel, you'll often be in a situation where you would want to render something based on some condition. 

For instance, you may want to render a line in the Mail notification only when a certain attribute is present/true. How would you do that?

Well, there's a handy method called `when()` in the `Illuminate\Notifications\Messages\MailMessage` class which can be used to do just that.

To use the `when()` method, all you'll need is to pass the condition or a boolean value as its first parameter and a [Closure](https://www.php.net/manual/en/functions.anonymous.php) that will return the line that you would want to render if the condition is met.

Here's how you can use it.

```php
<?php

namespace App\Notifications;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Bus\Queueable;

class WelcomeNotification extends Notification implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user;

    public function __construct($user)
    {
        $this->user = $user;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->greeting('Bonjour '.$this->user->name)
            ->when($this->user->isAdmin, function (MailMessage $mail) { 
                return $mail->line('You have got all the power!');
            )
            ->line('Welcome to our platform.')
            ->line('Thanks')
    }
}
```

The `when()` method works the similar way how you would [set attributes in Laravel's resource responses](/conditional-attributes-relationships-laravel-resources/).
