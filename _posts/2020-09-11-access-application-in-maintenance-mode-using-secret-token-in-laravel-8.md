---
layout: post
title: Access application in maintenance mode using a secret token in Laravel 8
image: /cdn/access-application-in-maintenance-mode-using-secret-token-in-laravel-8.png
categories: [Laravel]
fluidbox: true
---

Apart from adding support for [customizable maintenance mode views](/customized-maintenance-mode-views-in-laravel-8/), Laravel 8 has also simplified the process of accessing the Laravel application in the maintenance mode.

Up until Laravel 8, the standard way of getting whitelisted from the maintenance mode was by using an "allow list" of IP addresses that were allowed to access the application like so.

```bash
$ php artisan down --allow=127.0.0.1
```

## The `secret` token 

It was quite an overhead and not very much manageable. So, from Laravel 8, you can use a `secret` option with `php artisan down` where you can specify a token. A token can be anything. A random string like so.

```php
$ php artisan down --secret="harrypotter"
```

Once the application is in the maintenance mode, you can access it using the `secret` token like so.

```md
https://example.com/harrypotter
```

This will redirect you to the `/` route of the application. And from this point onwards, you'll be able to access the application as long as the application is in the maintenance mode using `secret` set to *"harrypotter"*.

Now, all you'll need is to give the access token to anyone who wants to access your Laravel application instead of adding an array of IP addresses to the whitelist.

## Under the hood

Behind the scenes, Laravel issues a cookie called `laravel_maintenance` in your browser which is the key thing that lets you access the application in the maintenance mode. If you clear the cookies, you'll lose the ability to access the application once again.

[![](/images/maintenance-mode-cookie.png)](/images/maintenance-mode-cookie.png)
