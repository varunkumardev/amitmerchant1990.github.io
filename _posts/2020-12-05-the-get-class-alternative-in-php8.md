---
layout: post
title: The get_class() alternative in PHP 8
image: /cdn/the-get-class-alternative-in-php-8.png
categories: [PHP]
---

If you're working with PHP for a while, there might be a good chance that you'd be in need to fetch the class of an object. This could be mostly for debugging purposes. 

So, pre-PHP 8, you could do it by using PHP's [get_class()](https://www.php.net/manual/en/function.get-class.php) method. Take the following for example.

```php
<?php

namespace Foo\Bar;

class Baz
{
    public function __construct()
    {

    }
}

$baz = new \Foo\Bar\Baz;

var_dump(get_class($baz)); 
// string(11) "Foo\Bar\Baz"
```

As you can tell, using `get_class` on a class object gives us the fully qualified class name (FQCN) for the particular object.

## Using `::class` on objects in PHP 8

Things have now been simplified in [PHP 8](https://www.php.net/releases/8.0/en.php). You can now directly use the `::class` on the class object to get the FQCN of that object. For instance, in the previous example, you can use `::class` instead of `get_class()` like so.

```php
$baz = new \Foo\Bar\Baz;

var_dump($baz::class); 
// string(11) "Foo\Bar\Baz"
```

This was not possible in previous versions of PHP. The `::class` keyword was [only be applicable on classes](/static-class-keyword-php/) to get the name of the class in form of a string.

Also note that using `::class` on a string or `null` would throw a `TypeError` exception like so.

```php
$object = null;
var_dump($object::class); // TypeError
```