---
layout: post
title: Strict typing vs. Weak typing in PHP
image: /cdn/strict-weak-typing-php.png
categories: [PHP]
---

With PHP 5, the core team had introduced type declarations (also known as type-hinting) that allow functions to require that parameters are of a certain type at call time. If the given value is of the incorrect type, then an error is generated: in PHP 5, this will be a recoverable fatal error, while PHP 7 will throw a [TypeError](https://www.php.net/manual/en/class.typeerror.php) exception.

Type declarations can be specified by adding a type before function parameters like so.

```php
function sum(int $a, int $b) 
{
    return $a + $b;
}
```

So, now, whenever the method `sum` is called, PHP would expect to get the respective parameters of specified types. For instance, following,

```php
var_dump(sum(3, 7)) // 10
```

This is fine and now you would expect that the following will throw some sort of error now that we're using type-hinting...

```php
var_dump(sum(3.5, 7.5)) 
```

But here is the catch! PHP won't throw any error on this because by default, PHP will coerce values of the wrong type into the expected scalar type if possible. For instance, a function that is given a `float` for a parameter that expects an `integer` will get a variable of type `integer`. In other words, *PHP will try to "fallback" to the target type from the given type whenever it can. This is called **"weak typing"***. 

So, the previous example will print the output without any hiccup.

```php
var_dump(sum(3.5, 7.5)) // 10
              ^    ^
              3    7
```

Even the string representation of these numbers will work fine. So, the following will also work.

```php
var_dump(sum("3.5", 8)) // 11
```

PHP will try to coerce "3.5" to its integer value which is happen to be `3` in this case and process it further accordingly.

## Strict typing

To check types strictly, PHP allow us to enable *strict mode* on a per-file basis. In *strict mode*, only a variable of the exact type of the type declaration will be accepted, or a [TypeError](https://www.php.net/manual/en/class.typeerror.php) will be thrown.

To enable strict mode, a [declare](https://www.php.net/manual/en/control-structures.declare.php) statement is used with the `strict_types` declaration like so.

```php
declare(strict_types=1);

function sum(int $a, int $b) 
{
    return $a + $b;
}

try {
    var_dump(sum(1, 2));
    var_dump(sum("1.5", 3)); 
} catch (TypeError $e) {
    echo 'Error: '.$e->getMessage();
} 

// int(3)
// Error: Argument 1 passed to sum() must be of the type int, string given, called in [...][...] on line 11
```

As you can see, when giving a string value where the function is expecting an integer value, PHP will now throw a fatal error which was not possible in weak-typing.

## Caveats

There is one thing to note here and that is even in strict typing, **a function can be given [integer](https://www.php.net/manual/en/language.types.integer.php) when it's expecting a [float](https://www.php.net/manual/en/language.types.float.php) value**. This is one exception in strict typing.

Apart from this, PHP doesn't support aliases for [scalar types](https://www.php.net/manual/en/functions.arguments.php#functions.arguments.type-declaration.types). So, the following for example...

```php
declare(strict_types=1);

function foo(boolean $bar) {
    return $bar;
}

try {
    var_dump(foo(true));
} catch (TypeError $e) {
    echo 'Error: '.$e->getMessage();
}
```

...will throw the following error,

```
Error: Argument 1 passed to foo() must be an instance of boolean, bool given, called in [...][...] on line 10
```

To fix this, we need to use `bool` instead of `boolean` when declaring the type.

```php
declare(strict_types=1);

function foo(bool $bar) {
    return $bar;
}

try {
    var_dump(foo(true));
} catch (TypeError $e) {
    echo 'Error: '.$e->getMessage();
}

// bool(true)
```

And lastly, Enabling strict mode will not only affect the function type declarations but  [return type declarations](https://www.php.net/manual/en/functions.returning-values.php#functions.returning-values.type-declaration) as well.














