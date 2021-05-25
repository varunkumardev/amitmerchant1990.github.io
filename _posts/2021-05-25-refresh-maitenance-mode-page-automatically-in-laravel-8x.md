---
layout: post
title: Refresh maintenance mode page automatically in Laravel 8.x
image: /cdn/refresh-maintenance-mode-page-automatically-in-laravel-8.png
categories: [Laravel]
fluidbox: true
---

Laravel has [this cool feature](http://localhost:4000/customized-maintenance-mode-views-in-laravel-8/) using which you put your website in maintenance mode. To do so, all you will need to do is run the following command.

```bash
$ php artisan down
```

When you put your website in maintenance mode, it will render the following page if you try to access your website.

[![](/images/default-maintenance-view-laravel.png)](/images/default-maintenance-view-laravel.png)

Now, this is fine but in an ideal scenario, you wouldn't want to put your website in maintenance mode for a long period. You might want to let the user know that the site is now up when you run `php artisan up`.

The simplest way using which you can do this is by refreshing the page at a regular interval. How would you do that?

## The `--refresh` option

The recent release of Laravel 8.x has introduced [this feature](https://github.com/laravel/framework/pull/37385) which lets you do just the same.

To make this work, all you will need to do is passing in a `--refresh` option to the `php artisan down` command. You need to assign an integer value to the option which acts as a number of seconds. Take the following for example.

```bash
$ php artisan down --refresh=60
```

As you can tell, we passed in ***60*** to the `--refresh` option. When doing so, a [Refresh](https://en.wikipedia.org/wiki/Meta_refresh) HTTP header will be sent with maintenance mode responses forcing the browser to refresh after 60 seconds.

And this way users won't have to refresh the website themselves to check whether it's up and running now or not. 