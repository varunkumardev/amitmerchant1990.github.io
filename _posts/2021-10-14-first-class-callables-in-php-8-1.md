---
layout: post
title: First-class callables in PHP 8.1
image: /cdn/first-class-callables-in-php-8-1.png
categories: [PHP]
---

The newest release of PHP, v8.1, is around the corner and it will introduce a whole lot of new features, from [the read only properties](/readonly-properties-are-coming-in-php-81/) to the [native enums](/native-enumerations-are-coming-in-php-81/). It's pretty exciting!

In this article though, I want to discuss a relatively small feature that is going to end up in PHP 8.1.

It's called *"First-class callables"*.

* TOC*
{:toc}

## First-class callables

According to [this RFC](https://wiki.php.net/rfc/first_class_callable_syntax), PHP 8.1 is going to come with a new first-class callable syntax that can be used instead of existing encodings using strings and arrays.

An example from the RFC itself,

```php
// prior to PHP 8.1
$fn = Closure::fromCallable('strlen'); 

// in PHP 8.1
$fn = strlen(...);
```

Here, as you can see, before PHP 8.1, if you would need to make the `strlen` function a Closure, you would need to do it using the `Closure::fromCallable()` method (which was introduced in PHP 7.1).

But starting from PHP 8.1, this is simplified using the first-class callables. Now, all you need to do is to use a callable as a Closure by calling the function itself and passing in the spread operator ([argument unpacking](/unpacking-inside-arrays-spread-operator-php/)) as an argument. That's it! 

The advantage is that this new syntax is accessible to static analysis, and respects the scope at the point where the callable is created.

## A practical example

So, this is fine for the theory but let me show you a simple example where you can use the new first-class callable syntax.

Imagine the following `array_map` example where we pass in an array that will be iterated over by a `cube` function.

Here's how you can write it in *versions before PHP 8.1*.

```php
function cube($n)
{
    return ($n * $n * $n);
}

$a = [1, 2, 3, 4, 5];
$b = array_map('cube', $a);
print_r($b);
/*
Array
(
    [0] => 1
    [1] => 8
    [2] => 27
    [3] => 64
    [4] => 125
)
*/
```

Now, if you want to write the same example in *PHP 8.1 using first-class callable syntax*, you can do it like so.

```php
function cube($n)
{
    return ($n * $n * $n);
}

$a = [1, 2, 3, 4, 5];
$b = array_map(cube(...), $a);
print_r($b);
/*
Array
(
    [0] => 1
    [1] => 8
    [2] => 27
    [3] => 64
    [4] => 125
)
*/
```

As you can tell, now it has become more readable and on top of it, it's now IDE friendly as well since now you can jump over to the functions directly in supported IDEs!