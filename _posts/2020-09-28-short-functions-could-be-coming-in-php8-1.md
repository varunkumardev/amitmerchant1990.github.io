---
layout: post
title: Short functions could be coming in PHP 8.1
image: /cdn/short-functions-could-be-coming-in-php8-1.png
categories: [PHP]
---

PHP 8 is around the corner and it is coming packed with a lot of new features. But there's something exciting cooking in PHP 8.1 already.

Remember [arrow functions](/using-arrow-functions-php/) which were released way back with PHP 7.4? This is the feature where the following...

```php
$numbers = array_map(function($value) use ($factor){
    return $value * $factor;
}, [1, 2, 3]);
```

...is equivalent to the following.

```php
$numbers = array_map(fn($value) => $value * $factor, [1, 2, 3]);
```

This was to make the Closures with only a single expression *tidier* and *compact* just like we have [arrow functions in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

Well, for reasons similar to above, [this RFC](https://wiki.php.net/rfc/short-functions) can bring short functions to PHP 8.1 *if accepted*.

## Short functions

Essentially, [the RFC](https://wiki.php.net/rfc/short-functions) tries to bring the arrow function's convenience to the named functions with a single expression. So, if we have the following function...

```php
function add(int $a, int $b): int 
{
    return $a + b;
}
```

Using short functions, this can be shortened to the following.

```php
function add(int $a, int $b): int => $a + $b;
```

As you can tell, the short function syntax is more *concise* and *removes extra visual clutter* in cases where the function only contains an expression.

From the RFC,

> Allowing functions to be written in a more expression-y way helps with conceptualizing a program as evaluating expressions, not statement steps.

Meaning, writing functions using the short function syntax can make the code look more natural if you're only evaluating and returning things from the function using a single expression.

And lastly, as you can return any expression from the short function, you could also use [match expressions](/match-expression-alternative-switch-statement-php8/) in conjunction with short function like so.

```php
function guessFruit(int $fruit): string => match ($fruit) {
    'apple' => 'fruit is apple',
    'orange' => 'fruit is orange',
    default => 'fruit is banana',
};

print guessFruit('apple') . PHP_EOL; // fruit is apple
```

Which is equivalent to be writing it in PHP 8 like so.

```php
function guessFruit(int $fruit): string
{
    return match ($fruit) {
        'apple' => 'fruit is apple',
        'orange' => 'fruit is orange',
        default => 'fruit is banana',
    }
}

print guessFruit('apple') . PHP_EOL; // fruit is apple
```

Pretty dense, no?