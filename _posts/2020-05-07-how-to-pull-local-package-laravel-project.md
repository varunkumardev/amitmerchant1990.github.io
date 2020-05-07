---
layout: post
title: How to pull a composer package in a Laravel project locally
image: /cdn/pull-local-package.png
categories: [Laravel]
---

Lately, if you've been working on some functionality and you want to extract it as a Laravel package, you'd like to first test it locally. And if everything is well and good, you'd then publish it to the packagist.org.

I'm going to explain how you can pull in a local package in the Laravel project and test it locally in this article.

So, for instance, let's say I've this package called `amitmerchant/laravel-greeter` which consists of the following `composer.json`.

```json
{
    "name": "amitmerchant/laravel-greeter",
    "description": "A Laravel Greeter",
    "license": "MIT",
    "authors": [
        {
            "name": "amitmerchant1990",
            "email": "bullredeyes@gmail.com"
        }
    ],
    "minimum-stability": "dev",
    "autoload": {
        "psr-4": {
            "AmitMerchant\\Greeter\\": "src/"
        }
    }
}
```

Here's how the package's folder structure looks like.

![](/images/pacakge-folder-structure.png)

As you can see, all that the package contains is a `AmitMerchant\Greeter\Greeter` class under `src/` which has a method named `greet`. The method accepts a `$name` parameter and based on which it will return a string message like so.

```php
<?php

namespace AmitMerchant\Greeter;

class Greeter
{
    public function greet(String $name)
    {
        return 'Hello ' . $name . '! How are you?';
    }
}
```

Now, we want to pull this package into a Laravel project. So, here's the trick! In order to do so, you'll first need to open the project's `composer.json` file into which you want to pull the package and add a `repositories` field like so.

```json
"repositories": [
    {
        "type": "path",
        "url": "../laravel-greeter"
    }
],
```

This will tell Composer that, upon installing, it should look into the `../laravel-greeter` directory (which is our package), if it gets specified as a project's dependencies. The `url` is the package's relative path to the project's directory. In our case, both the package and the project, are in the same directory. And hance we'll need to go one directory up.

Now, we are ready to pull our package into this project. So, we'll fire off the following command into the project like so.

```bash
$ composer require amitmerchant/laravel-greeter:dev-master
```

Upon running the above command, the composer will try to fetch the specified package into the project from the `repositories` and will create a symlink to the same. And this is how the complete installation looks like.

![](/images/package-installation.png)

As you can see, the Composer has pulled our package and created a symlink with the following message.

```bash
- Installing amitmerchant/laravel-greeter (dev-master): Symlinking from ../laravel-greeter
```

And the package can be found in the project's `vendor/` directory.

![](/images/vendor-package.png)

That's all! We're now ready to consume the package anywhere into our project.

We'll now create a route in `routes/web.php` and pull in the package's `Greeter` class into in like so.

```php
use AmitMerchant\Greeter\Greeter;

Route::get('/greet/{name}', function($sName) {
    $oGreetr = new Greeter();
    return $oGreetr->greet($sName);
});
```

And upon opening up the route into the browser the message gets printed as expected!

![](/images/package-message.png)

Once done, you'll be now able to push this package to the [packagist.org](https://packagist.org/) and ready to consume it in all your project.

