---
layout: post
title: Tappable and pipeable fluent strings in Laravel 8.x
image: /cdn/tappable-and-pipeable-fluent-strings-in-laravel-8x.png
categories: [Laravel]
---

The fluent string operations were introduced back in the release of Laravel 7 which offered a more object-oriented, fluent string manipulation library built on top of `Illuminate\Support\Str` functions. To use this fluent API, you’d need to use the `Illuminate\Support\Str::of` method which creates a fluent `Illuminate\Support\Stringable` object.

* TOC
{:toc}

Once done, an array of various [string manipulation methods](https://laravel.com/docs/7.x/helpers#fluent-strings) can be chained onto the object. So, the above example can be re-written like so.

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

## Pipeable strings

Now, with one of the [minor release](https://github.com/laravel/framework/releases/tag/v8.25.0) of Laravel 8.x, two new methods were [introduced](https://github.com/laravel/framework/pull/36017). One of them is the `pipe` method.

Essentially, the `pipe` method allows you to transform the string by passing its current value to the given callable like so.

So, if you want to call [htmlentities](https://www.php.net/manual/en/function.htmlentities.php) function on the given string, you can do it like so.

```php
$htmlEntitites = Str::of('this is <b>bold</b>')
                    ->pipe('htmlentities'); // callable

// Outputs: this is &lt;b&gt;bold&lt;/b&gt
```

You can also pass in a closure to the `pipe` method like so.

```php
$hash = Str::of('Harry Potter')->pipe(function ($str) {
        return md5($str);
});

// Outputs: 6eb2dc222c508599d75e211d16556af8
```

## Tappable strings

Sometimes, you might want to just use the value of the string in the middle of the fluent operations without affecting its value. *For instance, to log the value of the string.*

To do so, a method called `tap` has been introduced. This is similar to the [tap](https://laravel.com/docs/8.x/collections#method-tap) collection method which utilizes the `Illuminate\Support\Traits\Tappable` trait to implement this ability.

To get started, you would need to pass a closure to the `tap` method. The closure would in turn receive the original string as its only argument and you can then examine and interact with the string while not affecting the string itself like so.

```php
$hashEntity = Str::of('foo > bar')
                ->pipe('htmlentities')
                ->tap(fn ($str) => Log::info('Origin str: ' . $str))
                ->pipe('md5');
```

As you can tell, the original string is returned by the `tap` method regardless of what is returned by the closure.

So, the equivalent of the previous code would look like the following.

```php
$str = 'foo > bar';
$str = htmlentities($str);
Log::info('Origin str:' . $str);
$str = md5($str);
```