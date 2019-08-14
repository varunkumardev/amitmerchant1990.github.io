---
layout: post
title:  Better error handling in core PHP functions using Safe PHP
categories: [PHP]
---

Some of the PHP's core functions are designed in such a way that they do not handle exceptions in a better way. Instead, they just return `false` if there's any error. This makes developers to handle those error themselves. Take the example below.

* TOC
{:toc}

```php
$content = file_get_contents('foobar.json');
$foobar = json_decode($content);
```

Here in the above code, if there's no file named `foobar.json`, then [file_get_contents](https://www.php.net/manual/en/function.file-get-contents.php) will return `false`. Similarly, if the file content in `$content` is not valid JSON then [json_decode](https://www.php.net/manual/en/function.json-decode.php) will return `false`. You could fix this by handling the errors yourself like this.

```php
$content = file_get_contents('foobar.json');
if ($content === false) {
    throw new FileLoadingException('Could not load file foobar.json');
}
$foobar = json_decode($content);
if (json_last_error() !== JSON_ERROR_NONE) {
    throw new FileLoadingException('foobar.json does not contain valid JSON: '.json_last_error_msg());
}
```

While it is absolutely harmless to handle error like this, what if we have a better way to do it? That's where this package called [Safe PHP](https://github.com/thecodingmachine/safe) comes into picture.

## What is Safe PHP?

[Safe PHP](https://github.com/thecodingmachine/safe) is a PHP package that redeclares all core PHP functions. The new PHP functions act exactly as the old ones, except they throw exceptions properly when an error is encountered. The "safe" functions have the same name as the core PHP functions, except they are in the `Safe` namespace. So, the above code can written like this after installing this package:

```php
use function Safe\file_get_contents;
use function Safe\json_decode;

// This code is both safe and simple!
$content = file_get_contents('foobar.json');
$foobar = json_decode($content);
```

As you can see, the code is now more readable and robust at the same time. You don't have to handle errors/exception yourself anymore. And that's what this package's main purpose is.

## Installing Safe PHP

Install Safe-PHP using composer:

```bash
$ composer require thecodingmachine/safe
```

## Using it in an existing project

In order to use Safe PHP in a large legacy project, you can use "Rector". [Rector](https://github.com/rectorphp/rector) is a command-line tool that performs instant refactoring of your application. Rector comes bundled with Safe PHP.

First, you need to install Rector:

```bash
$ composer require --dev rector/rector ^0.4
```

Now, you simply need to run Rector with this command:

```bash
vendor/bin/rector process src/ --config vendor/thecodingmachine/safe/rector-migrate.yml
```

**Note:** Do not forget to replace "src/" with the path to your source directory.

An important thing to note here is refactoring done here only performs a "dumb" replacement of functions. It will not modify the way "false" return values are handled. So if your code was already performing error handling, you will have to deal with it manually.

Especially, you should look for error handling that was already performed, like:

```php
if (!json_decode($content)) {
    // Do something on error
}
```

This code will be refactored by Rector to:

```php
if (!\Safe\json_decode($content)) {
    // Do something on error
}
```

You should then (manually) refactor it to:

```php
try {
    \Safe\json_decode($content));
} catch (\Safe\FilesystemException $e) {
    // Do something on error
}
```

You can read more read more about this pacakge [here](https://github.com/thecodingmachine/safe).

## In closing

Safe PHP is still a work in progress meaning there are some functions that still need to be rewritten. But I think if this can make your code more readable and refactorable without sacrificing the [performance](https://github.com/thecodingmachine/safe#performance-impact), I'd definitely recommend using it.

