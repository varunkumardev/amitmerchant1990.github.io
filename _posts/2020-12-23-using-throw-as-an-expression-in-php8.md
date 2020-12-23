---
layout: post
title: Using throw as an expression in PHP 8
image: /cdn/using-throw-as-an-expression-in-php8.png
categories: [PHP]
---

Up until now, when you want to throw exceptions from your code, you would use the `throw` keyword to throw the exception which can be caught by the `catch` block like so.

```php
function test() 
{
    try {
        throw new Exception('foo');
    } catch (Exception $e) {
        return 'catch';
    } finally {
        return 'finally';
    }
}

echo test();
```

One thing to notice here is, in the version before PHP 8, the `throw` keyword was a statement. And so, it could be only used in the "block" context and not in places where only expressions are allowed, such as arrow functions, the coalesce operator, and the ternary/elvis operator.

But PHP 8 attempts to solve this.

* TOC
{:toc}

## The `throw` keyword as an expression

In PHP 8, the `throw` keyword now acts as an expression. As a result of this, you can now use them in the places I mentioned above.

### Usage in arrow functions

So, if you want to use it in an [arrow function](/using-arrow-functions-php/), you can do it like so.

```php
$callable = fn() => throw new Exception();
```

### Usage in null coalescing operator

Or you can use it in conjunction with the [null coalescing assignment operator](https://www.amitmerchant.com/null-coalescing-assignment-operator-php/) like so.

```php
$value = fn() => $nullableValue ?? throw new Exception();
```

### Usage in ternary operation

Or in a ternary operation like so.

```php
$value = !empty($array)
    ? reset($array)
    : throw new InvalidArgumentException();
```

### Usage in conditionals

You can even use it in conditionals intuitively like so.

```php
if ($condition || throw new Exception('Something went wrong!')) {
    // do your thing if the condition met
    // else throw an exception
}
```

This is equivalent to the following code in versions before PHP 8.

```php
if ($condition) {
    // do your thing if the condition met
} else {
    // else throw an exception
    throw new Exception('Something went wrong!');
}
```