---
layout: post
title: How to use Laravel 7.x model factories in Laravel 8
image: /cdn/how-to-continue-using-laravel-7x-factories-in-laravel-8.png
categories: [Laravel]
---

Laravel 8's class-based model factories are great and I've written [an entire article](https://www.amitmerchant.com/class-based-model-factories-in-laravel-8/) about what they are and how they are more feature-rich and useful than the traditional factories that we used to write prior to Laravel 8.

So, if you're spinning up a new application from Laravel 8, you'll be obviously using class-based factories but if you're upgrading to Laravel 8, from let's say Laravel 7.x, you might be considering using the old factories for a number of reasons. One of being your application already has a lot of factories written and you don't want to refactor them to the class-based ones all at once.

## The `laravel/legacy-factories` package

In scenarios like this, you can install the `laravel/legacy-factories` composer package into your application which will **allow you to use the legacy/traditional factories in your Laravel application** without changing anything in your application. 

You can install this package using Composer like so.

```bash
$ composer require laravel/legacy-factories
```

This is a [first-party package](https://github.com/laravel/legacy-factories) developed by the Laravel team itself. So, no issues of authenticity over there.

## In closing

Although you can continue using the legacy factories using this package, I would highly recommend using the newest class-based factories as those provide more features and are easy to manage as well. So, you should consider refactoring your existing ones slowly over time, in my opinion.