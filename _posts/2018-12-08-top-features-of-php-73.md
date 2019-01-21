---
layout: post
title: Top fetaures of PHP 7.3
image: /images/notepad-cover.jpg
categories: PHP
---

PHP development team has just released [PHP 7.3](https://php.net/archive/2018.php#id2018-12-06-1) with general availability. This release brings general improvements along with some new features. Even though this is a stable release, the team hasn't provided concrete migration guide if you want to migrate from the older PHP versions. Maybe they will release those on a later date.

So, meanwhile let's look at all the new features which are available in PHP 7.3.

## More Flexible Heredoc and Nowdoc Syntax

The closing marker for doc strings is no longer required to be followed by a semicolon or newline. Additionally the closing marker may be indented, in which case the indentation will be stripped from all lines in the doc string. This means that the following syntax will be valid.

```php
class foo {
    public $bar = <<<EOT
bar
    EOT
}
// Identifier can be indented now
// Also notice there is no semicolon after closing marker
```

## Trailing Commas are allowed in Calls

Trailing commas in function and method calls are now allowed in PHP 7.3. A trailing comma has been allowed in array syntax since forever-ever, and in grouped namespace syntax since PHP 7.2. Below for example,

```php
$foo = [
    'foo',
    'bar',
];
```

The similar syntax can now be utilized for function calls as well. Take for the example,

```php
unset(
    $foo,
    $bar,
    $baz,
);
```

## Array Destructuring supports Reference Assignments

[Array destructuring](https://www.amitmerchant.com/array-destructuring-in-php/) now supports reference assignments using the syntax `[&$a, [$b, &$c]] = $d`. The same is also supported for [list()](http://php.net/manual/en/function.list.php).

## CompileError Exception instead of some Compilation Errors

A new [CompileError](http://php.net/manual/en/class.compileerror.php) exception has been added, from which [ParseError](http://php.net/manual/en/class.parseerror.php) inherits. A small number of compilation errors will now throw a `CompileError` instead of generating a fatal error. Currently, this only affects compilation errors that may be thrown by [token_get_all()](http://php.net/manual/en/function.token-get-all.php) in TOKEN_PARSE mode, but more errors may be converted in the future.

## An `is_countable()` function

PHP 7.3 comes with a [is_countable()](https://secure.php.net/manual/en/function.is-countable.php) which can be used to verify if contents of a variable is an [array](https://php.net/manual/en/language.types.array.php) or an object implementing [Countable](https://php.net/manual/en/class.countable.php).

```php
var_dump(is_countable([1, 2, 3])); // bool(true)
var_dump(is_countable(new ArrayIterator(['foo', 'bar', 'baz']))); // bool(true)
var_dump(is_countable(new ArrayIterator())); // bool(true)
var_dump(is_countable(new stdClass())); // bool(false) 
```

This were the new features which I felt are the key ones of PHP 7.3. If you wish to check out the PHP 7.3, you can download it from [here](https://php.net/downloads.php) or check the [changelog](http://www.php.net/ChangeLog-7.php#7.3.0) from the official site.

