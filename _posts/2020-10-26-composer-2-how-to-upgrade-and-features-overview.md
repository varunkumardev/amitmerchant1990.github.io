---
layout: post
title: Composer 2.0 — How to upgrade and features overview
image: /cdn/composer-2-how-to-upgrade-and-features-overview.png
categories: [PHP]
---

I've said it earlier and I'm saying it today as well that [Composer](https://getcomposer.org/) is the backbone of modern development in the PHP landscape. It has been so much easier to pull in open-source packages into your projects which weren't possible in the pre-Composer era.

So, adding all of the awesomeness of Composer, the team has just [released](https://github.com/composer/composer/releases/tag/2.0.0) version 2 of this incredible piece of software. 

It comes with performance improvements, error reporting improvements, and some features that will help check the compatibility PHP version/extensions at runtime.

* TOC
{:toc}

## How to upgrade to v2.x

If you're already running Composer 1.x, it's pretty easy to upgrade to the Composer 2.x. All you'll need to do is to run the following command.

```bash
$ composer self-update --2
```

This will essentially upgrade your Composer to `v2.x`. When I upgraded the Composer in my machine, it got bumped to `v2.0.1`.

![](/images/composer-2-upgradation.png)

## Rollback to v1.x

If for some reason, you want to revert to the previous version of the Composer, you can do it using the following command.

```bash
$ composer self-update --1
```

## Features & Improvements

With the introduction of Composer 2, the team has mostly focused on improving the overall performance while installing and updating dependencies. Here are some of the bullet points from the release.

- It brings many CPU and memory performance improvements
- Package installation now performs all network operations first before doing any changes on disk, to reduce the chances of ending up with a partially updated vendor dir
- Partial updates and require/remove are now much faster as they only load the metadata required for the updated packages
- There's a `composer-runtime-api` virtual package that you can require (as e.g. `^2.0`) to ensure things like the InstalledVersions class above are present. This will effectively force people to use the Composer `2.x` to install your project
- It will do the automatic removal of packages which are not required anymore whenever an update is done, this will purge packages previously leftover by partial updates and require/remove
- It provides a [platform-check step](https://github.com/composer/composer/blob/2.0.0/doc/07-runtime.md#platform-check) when vendor/autoload.php gets initialized which checks the current PHP version/extensions match what is expected and fails hard otherwise. Can be disabled with the platform-check config option

You can read about the entire feature set of this release in this [relaease changelog](https://github.com/composer/composer/releases/tag/2.0.0).

## In closing

Lastly, Composer 2.0 still supports PHP 5.3+ but the author says they are planning to remove support for older versions of PHP in future minor releases because they feel it's really outdated and makes the code quite hard to maintain in places.

You can expect the Composer to only work on PHP 7.1.3 or later from Composer 2.2. So, it's better to upgrade your PHP apps to the latest PHP by that time!