---
layout: post
title: How to pull GitHub repositories as Composer packages in PHP
image: /cdn/how-to-pull-github-repositories-as-composer-packages-in-php.png
categories: [PHP]
---

Sometimes there comes a scenario when you might want to pull the composer package's GitHub repository as the composer package itself. This can be useful in situations where you want to upgrade something but because one of the dependencies is still not compatible with the current version of the software.

## The problem

For instance, let's say, you want to update your application to Laravel 8 but because one of the third-party Laravel packages that you are using is still not compatible with Laravel 8, you end up getting the composer error that states the compatibility issues of the package.

To resolve this, what you can do is temporarily fork the package's GitHub repository and apply the necessary patch to it and pull your forked version as the composer itself.

## The `repositories` magic

Let's say I'm using the `amitmerchant/array-utils` [package](https://packagist.org/packages/amitmerchant/array-utils) in my Laravel project and assume it's still not compatible with the current version of Laravel yet.

So, I'd do is I'll fork [its GitHub repository](https://github.com/amitmerchant1990/array-utils), apply the necessary patch, and pull it as the composer package. To do so, I'll first add a `repositories` field in my project's `composer.json` like so.

```json
{
    ...
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/amitmerchant1990/array-utils"
        }
    ]
    ...
}
```

As you can see, you need to specify which GitHub repository you want to use as a package by tagging it as `vcs` (Version Control System) type so Composer will know what to pull when doing `composer install` or `composer update`.

## Pull the repository branch

Next, you'll need to specify which branch of the GitHub repository you want to pull as a composer package. So, if you want to pull a branch named `quickfix` as the package, you can do it like so.

```json
{
    ...
    "require": {
        "amitmerchant/array-utils": "dev-quickfix"
    }
    ...
}
```

As you can see, you can pull the specified branch by appending `dev-` to it.

Now, when you'll do `composer install` or `composer update`, it should pull the `quickfix` from the specified GitHub repository and not from the [Packagist](https://packagist.org).