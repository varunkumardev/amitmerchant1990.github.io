---
layout: post
title: Make any string studly case using `Str::headline()` in Laravel 8.x
image: /cdn/the-new-str-headline-method-laravel-8x.png
categories: [Laravel]
---

Strings are tricky things to work with when it comes to programming. But thankfully, Laravel provides [a lot of helper methods](https://laravel.com/docs/8.x/helpers#strings-method-list) that can fulfill almost all the use-cases you might have when you're working with strings.

In addition to all these string helper methods, Laravel will have one more method that can solve many problems all at once.

## The `Str::headline()` method

According to [this PR](https://github.com/laravel/framework/pull/39174), Laravel 8.x will be included with this new method called `Str::headline()` using which it's possible to make any string into the [studly case](https://en.wikipedia.org/wiki/Alternating_caps). This is useful when you want to extract out a title-like structure out of a string.

Here are a few examples of how it works.

```php
use Illuminate\Support\Str;

echo Str::headline('php-is-great');
// Outputs: Php Is Great

echo Str::headline('php_is_great');
// Outputs: Php Is Great

echo Str::headline('phpIs_great');
// Outputs: Php Is Great

echo Str::headline('php - is _great');
// Outputs: Php Is Great
```

As you can tell, this method works perfectly fine under several different use cases. If you want to see all the examples, you can [check out the tests](https://github.com/laravel/framework/pull/39174/files#diff-be47dbd336aece128f999b4c2d8b4fc7ee809a1d1e0ddd178547542201d4e897) for this method.

Apart from making studly case strings, it can transform PHP class names to the studly case as well which is pretty fantastic!

```php
echo Str::headline(
    class_basename(\App\Events\VoiceRecordingStored::class)
);
// Outputs: "Voice Recording Stored"
```