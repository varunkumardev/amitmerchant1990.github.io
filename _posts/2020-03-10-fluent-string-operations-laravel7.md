---
layout: post
title: Fluent string operations in Laravel 7
image: /cdn/fluent-strings.png
categories: [Laravel]
---

Laravel 7 has been a major version that's been [released](https://laravel.com/docs/7.x/releases) last week and it comes with the host of features and improvements to the Laravel framework. One of the improvements being the new fluent string operations API. The goal of these API is to provide more flexibility and readablity to the regular string operations in Laravel by [chaining](/method-chaining-php-nutshell/) array of string manipulation methods.

To give a primer, how Laravel was handling string operations prior to the Laravel 7, we'll take an example.

{:.you-may-like}
> Learn more about Fluent Interfaces: [Method chaining in PHP in a nutshell](/method-chaining-php-nutshell/)

## Pre Laravel 7

So, before Laravel 7, we had a set of few string methods provided by `Illuminate\Support\Str` trait. So, for instance, you want to do something like below, you'd do it like so.

```php
// Generate a file name from the input string
// and change the extension to .html

use Illuminate\Support\Str;

$replaced = Str::replaceLast('php', 'html', 'this is test file.php');

$camelCase = Str::camel($replaced);

// thisIsTestFile.html

```

As you can see, the above code is a little verbose and though it's not painfully unreadable, it's still can be improved. This is where Laravel 7's fluent API for string operations kicks in.'

## Post Laravel 7

Basically, Laravel 7 offers a more object-oriented, fluent string manipulation library built on top of `Illuminate\Support\Str` functions. In order to use this fluent API, you'd need to use `Str::of` method which creates a fluent `Illuminate\Support\Stringable` object. Once done, [an array of various string manipulation methods](https://laravel.com/docs/7.x/helpers#fluent-strings) can be chained onto the object. So, the above example can be re-written like so.

```php
// Generate a file name from the input string
// and change the extension to .html

use Illuminate\Support\Str;

$input = 'this is test file.php';

$output = Str::of($input)
                ->replaceLast('php', 'html')
                ->camel();

// thisIsTestFile.html
```

As you can see, the string operations seems far more readable and less confusing. This also reduces the amount of intermediate variable that you'd need to create otherwiese and of course, this would need less number of lines for the equivalent operations.

Here are [all the fluent methods](https://laravel.com/docs/7.x/helpers#fluent-strings) that you can utilize by chaining together.