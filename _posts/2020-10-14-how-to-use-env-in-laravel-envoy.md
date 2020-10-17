---
layout: post
title: How to use .env values in Laravel Envoy
image: /cdn/how-to-use-env-in-laravel-envoy.png
categories: [Laravel]
---

Laravel Envoy is a great tool if you want to create deployment flow for your application or even something as small as writing a script to pull the latest code and deploy the application right away.

One of the cool features of Envoy is it can also send a notification to different services after each [task](https://laravel.com/docs/8.x/envoy#writing-tasks) is executed such as Slack, Discord, Telegram, and so on. So, for instance, if you want to send a notification to a Slack channel, you could do it using the `@slack` directive like so.

```php
@finished
    @slack('webhook-url', '#bots')
@endfinished
```

Here, `webhook-url` is the webhook URL for Slack that you can get by creating an "Incoming WebHooks" integration in your Slack control panel.

As you can see, you'd need to feed the plain webhook URL to the `@slack` directive which in my opinion is not a best practice to follow as your webhook URL falls into the category of sensitive data.

So, what you do to alternatively is define a variable for webhook URL in your application's `.env` file and use that into the `Envoy.blade.php`. But here's a thing. By default, Envoy can read `.env` file. 

If you've defined a variable for webhook URL in the `.env` like so.

```
SLACK_WEBHOOK=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
```

You can access it in the Envoy by pulling it in `@setup` like so.

```php
@setup
require __DIR__.'/vendor/autoload.php';
(new \Dotenv())->load(__DIR__, '.env');
@endsetup

@finished
    @slack(env('SLACK_WEBHOOK'), '#bots')
@endfinished
```

And that is how you can access just about any `.env` values in your Envoy script!