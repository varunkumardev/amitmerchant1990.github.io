---
layout: post
title: Why you should always commit the composer.lock file
image: /cdn/why-you-should-always-commit-the-composer-lock-file.png
categories: [Composer]
---

When you install [packages](https://packagist.org/) through [Composer](https://getcomposer.org/), it will parse the `composer.json` of your project and try to install all the dependencies listed in it under `require` and `require-dev` keys.

Now, when you are installing dependencies for the first time and once all the dependencies are resolved successfully, Composer will automatically generate a `composer.lock` file along with it. What is it?

* TOC
{:toc}

## What is `composer.lock`?

> The `composer.lock` file as its name suggests *"locks"* the dependencies for the corresponding project. 

Meaning, when the Composer has finished installing dependencies, it writes all of the packages and the exact versions of them that it downloaded to the `composer.lock` file.

So, for instance, if you have the following dependency for the `fruitcake/laravel-cors` package in your `composer.json`...

```json
{
    "require": {
        "fruitcake/laravel-cors": "^2.0",
    },
}
```

Once the package is installed successfully, the `composer.lock` file will lock this package and its dependency like so.

```json
{
    ...
    "packages": [
        {
            "name": "fruitcake/laravel-cors",
            "version": "v2.0.3",
            "source": {
                "type": "git",
                "url": "https://github.com/fruitcake/laravel-cors.git",
                "reference": "01de0fe5f71c70d1930ee9a80385f9cc28e0f63a"
            },
            "dist": {
                "type": "zip",
                "url": "https://api.github.com/repos/fruitcake/laravel-cors/zipball/01de0fe5f71c70d1930ee9a80385f9cc28e0f63a",
                "reference": "01de0fe5f71c70d1930ee9a80385f9cc28e0f63a",
                "shasum": ""
            },
            "require": {
                "asm89/stack-cors": "^2.0.1",
                "illuminate/contracts": "^6|^7|^8|^9",
                "illuminate/support": "^6|^7|^8|^9",
                "php": ">=7.2",
                "symfony/http-foundation": "^4|^5",
                "symfony/http-kernel": "^4.3.4|^5"
            },
            ...
        }
    ]
    ...
}
```

As you can tell, even though we've mentioned the version `^2.0` in `composer.json`, the actual version of the package which is installed is `v2.0.3`. This is how the dependencies are being "locked" in `composer.lock`.

## Why should you commit `composer.lock`to VSC?

Many developers tend to put the `composer.lock` file in `.gitignore` and choose not to commit it in [version control](https://git-scm.com/) but there are obvious benefits of committing and using it.

- When you run `composer install` in the presence of `composer.lock`, Composer will resolve and install all dependencies that you listed in `composer.json`, but Composer uses the exact versions listed in `composer.lock` to ensure that the package versions are consistent for everyone working on your project. 
  
- As a result of this, you'll have your project dependencies consistent across all your CI servers, production machines, other developers in your team which helps in preventing the potential for bugs affecting only some parts of the deployments.

## What happens on `composer update`?

Now, the obvious question that arises over here is what happens to `composer.lock` when you run `composer update`?

The answer is when you run `composer update`, Composer will fetch the latest matching versions (according to your `composer.json` file) and update the `composer.lock` file with the new versions.

That means the `composer.lock` will get updated and you'll have to commit it, in that case, to make the dependencies consistent across your team or environments.

## In Closing

The bottom line is if you want to keep dependencies of your project in sync everywhere, you should always use/commit the `composer.lock` file and it's rather a recommended practice. 

Otherwise, you can skip it if you are okay with receiving [patch](https://semver.org/) releases of your dependencies! 