---
layout: post
title: Get native type of a variable using get_debug_type() in PHP 8
image: /cdn/get-type-of-variable-using-get-debug-type-function-in-php8.png
categories: [PHP]
---

Before PHP 8, whenever you wanted to get the type of a variable, you could use the native [gettype](https://www.php.net/manual/en/function.gettype.php) function. Check the examples below.

```php
<?php

$foo = 'bar';

echo gettype($foo); // string

$object = new stdClass;

echo gettype($object); // object
```

As you can see, the `gettype` function would return the type of a variable in form of a string. Here are all the possible values returned by the function.

- "boolean"
- "integer"
- "double" (for historical reasons "double" is returned in case of a float, and not simply "float")
- "string"
- "array"
- "object"
- "resource"
- "resource (closed)" as of PHP 7.2.0
- "NULL"
- "unknown type"

But the problem with `gettype` is, it returns the long-form types instead of native and more familiar type names. For instance, it returns `integer` instead of `int`, `double` instead of `float`, and so on.

To mitigate this issues, PHP 8 has introduced a new function called `get_debug_type()`.

## The `get_debug_type()` function

The new `get_debug_type` function would return the true "native" type of a variable. And as I said earlier, the function would differ from `gettype` in that it would return native type names, e.g. `int` rather than `integer`, `double` instead of `float`. 

The following table shows what `get_debug_type()` returns for different values, and what `gettype()` returns for the same value (if it is different):

|Value |  get_debug_type() |  gettype() |
|---|---|---|
|0 | int |  integer |
|0.1 |  float | double |
|true | bool |  boolean |
|false |  bool |  boolean |
|“hello” |  string   | |
|[] | array  | |
|null | null |  NULL |
|A class with name “Foo\Bar” |  Foo\Bar | object |
|An anonymous class | class@anonymous | object |
|A resource | resource (xxx) |  resource |
|A closed resource |  resource (closed) | |

Apart from this, the function would automatically resolve the class names of objects. So, instead of doing it like this using `gettype`...

```php
<?php

$bar = $arr['key'];

if (!($bar instanceof Foo)) {
  throw new TypeError('Expected ' . Foo::class . ' got ' . (is_object($bar) ? get_class($bar) : gettype($bar)));
}
```

...You can simplify it using `get_debug_type` (like [get_class](https://www.php.net/manual/en/function.get-class.php)) like so.

```php
<?php
$bar = $arr['key'];

if (!($bar instanceof Foo)) { 
  throw new TypeError('Expected ' . Foo::class . ' got ' . get_debug_type($bar));
}
```

## In closing

So, if you want to be more consistent in getting the type of a variable and to avoid situations where types that cannot be handled by existing PHP runtime checking based on parameter types, you should be safe using the `get_debug_type` instead of `gettype` function.
