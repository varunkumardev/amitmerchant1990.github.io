---
layout: post
title: Gracefully installing global Composer libraries
image: /cdn/gracefully-installing-global-composer-libraries.png
categories: [Composer]
---

Recently, I happened to install the [Laravel Envoy](https://laravel.com/docs/8.x/envoy) library in my Linux-powered machine. Now, if you don't know, Envoy is a task runner that can be used to define and run common tasks on your remote (and local) servers. You can set up tasks for your application deployment such as Git commands, artisan commands, and a lot of other CLI-based things.

Now, coming to the issue I faced. To use Envoy, you'd need to install it globally using Composer using the `global require` like so.

```bash
$ composer global require laravel/envoy
```

I ran the above command and I got the following error and the installation got terminated.

[![Envoy Dependency Error](/images/envoy_error.png)](/images/envoy_error.png)

Essentially, the error is saying that the intended version of Envoy that we're installing is dependent on another library called `symfony/console` which needs to be installed first.

So, I tried to install the required version of `symfony/console` as suggested in the error message but then again I ran into another dependency-related error. And this is where this library called [consolidation\cgr](https://github.com/consolidation/cgr) came to my rescue.

## The `consolidation\cgr` library

In a nutshell, `cgr`(named after "composer global require") is a drop-in replacement for the `composer global require` command which can be used for installing PHP command line tools globally that is functionally equivalent (nearly) to the existing command, but much safer. It solves the dependency related issues while installing packages/libraries globally.

To install `cgr`, run the following command.

```bash
$ composer global require consolidation/cgr
```

Once installed, I tried to install the Laravel Envoy using `cgr` like so.

```bash
$ cgr laravel/envoy
```

And boom! it successfully/gracefully installed it without any sort of dependency related issues. And as a bonus, I didn't have to put `$HOME/.config/composer/vendor/bin` or `$HOME/.composer/vendor/bin` to make the `envoy` command work in the terminal and that is also managed by `cgr`.

This is one example but you should consider using `cgr` if you happen to install Composer libraries globally for painless installations.

You can learn more about `consolidation/cgr` at [its official documentation](https://github.com/consolidation/cgr).