---
layout: post
title: Personalized maintenance mode views in Laravel 8
image: /cdn/personalized-maintenance-mode-views-in-laravel-8.png
categories: [Laravel]
fluidbox: true
---

When you put your Laravel application on maintenance mode using the `php artisan down` command, the default view for the same looks like following.

[![](/images/default-maintenance-view-laravel.png)](/images/default-maintenance-view-laravel.png)

It's working but what if you want to customize this page and make it look more in line with your product's design aesthetics? Well, using Laravel 8, it's pretty easy to implement this.

## Customized Maintenance Mode Views

Laravel 8 now allows you to pre-render your maintenance mode view using a new `render` option that you'd be using with `php artisan down` command like so.

```bash
$ php artisan down --render="your-custom-view"
```

For instance, you can create a Blade view called `maintenance.blade.php` under `resources/views` directory with the following content.

```html
<!-- resources/views/maintenance.blade.php -->

<div>
    <p>Oops! The site is down currently.</p>
    <p>Please check back later.</p>
</div>
```

...You can pre-render this as your maintenance mode view like so.

```bash
$ php artisan down --render="maintenance"
```

The resulting maintenance mode view would like the following.

[![](/images/customized-maintenance-mode-view.png)](/images/customized-maintenance-mode-view.png)

That's it! That's your own maintenance mode view. Now, you can customize further however you want!

## Using in-built error views of Laravel

You can also use Laravel's error views which come in-built. You can publish this view into your project using the `php artisan vendor:publish` command which will allow you to choose an option for `laravel-errors`. This will copy the error views from `/vendor/laravel/framework/src/Illuminate/Foundation/Exceptions/views` to your project's `/resources/views/errors`. Here are all the error views that you'll get.

![](/images/laravel-existing-error-views.png)

You can use any error view from these as your maintenance mode view. For instance, if I want to use the `illustrated-layout.blade.php` as my maintenance mode view, I can use it like so.

```bash
$ php artisan down --render="errors::illustrated-layout"
```

This will get rendered like so in the browser.

[![](/images/illustrated-error-view.png)](/images/illustrated-error-view.png)