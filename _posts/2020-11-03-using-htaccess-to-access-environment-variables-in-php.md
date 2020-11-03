---
layout: post
title: Using .htaccess to access environment variables in PHP
image: /cdn/using-htaccess-to-access-environment-variables-in-php.png
categories: [PHP]
---

If you're working with the latest frameworks, it's not very difficult to set up environment variables for your app.

For instance, Laravel uses the [.env](https://github.com/vlucas/phpdotenv) file to give you the ability to set the environment variables for your application.

So if you set below in the `.env` file...

```js
APP_ENVIRONMENT="production"
```

...you can access it in the Laravel application like so.

```php
'production' => env('APP_ENVIRONMENT', false),
```

But what if you want to set environment variables for the projects that use plain PHP? Read on.

## Using `.htaccess` in Apache webserver

To define environment variables in the PHP app running on the Apache webserver, you can use the `.htaccess` file for this purpose. For this, all you need to enable the `mod_env` module in your server. You can enable using the following command.

```bash
$ sudo a2enmod env
```

Once done, you'll then need to restart the server.

After this, if you want to set an environment variable called `APP_ENVIRONMENT`, you can add the following lines into your `.htaccess` file of your project like so.

```xml
<IfModule mod_env.c>
    SetEnv APP_ENVIRONMENT production
</IfModule>
```

You can define as many environment variables as you may like in the same block.

To access this environment variable in your PHP application, you can use `$_SERVER` [global array](https://www.php.net/manual/en/reserved.variables.server.php) like so.

```php
$appEnv = $_SERVER['APP_ENVIRONMENT'];
```