---
layout: post
title: Using different mail drivers dynamically in Laravel 7.x
image: /cdn/mail-drivers-laravel7.png
categories: [Laravel]
---

Sending emails in Laravel is a breeze. All you have to do is, configure your default mail service in `config/mail.php` and it's related configuration in `config/services.php` file.

For instance, if you want to use [AWS SES](https://aws.amazon.com/ses/), you'll first need to setup its configuration in `config/services.php` like so.

```php
return [
        // ...
        'ses' => [
            'key' => env('AWS_ACCESS_KEY_ID'),
            'secret' => env('AWS_SECRET_ACCESS_KEY'),
            'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
        ],
];
```

And then setting it as default in `config/mail.php`...

```php
return [
    // code commented for brevity

    'driver' => env('MAIL_DRIVER', 'ses'),

    // code commented for brevity
]
```

Now, each time you try to send the email using, for instance, `Illuminate\Support\Facades\Mail` facade, it will always use the `default` option. i.e. "ses" in our case.

But what if you want some kind of flexibility of using different mailers at different places? Well, Laravel 7.x get you covered on this.

## Dynamic Mail Drivers

Laravel 7 indroduced a new method called `mailer` in the `Mail` facade which gives you the ability to choose different mail drivers for different scenarios. For example, your application might use Postmark to send transactional mail while using Amazon SES to send bulk mail.

Here's how you can use the `mailer` method to select one of the mailer that you've configured `config/services.php` file.

```php
Mail::mailer('postmark')
        ->to($request->user())
        ->send(new OrderShipped($order));
```

You can quickly swithch to other, say "mandrill", for certain scenarios like so (providing you've configured it brforehand).

```php
Mail::mailer('mandrill')
        ->to($request->user())
        ->send(new OrderShipped($order));
```

It's as easy as that!