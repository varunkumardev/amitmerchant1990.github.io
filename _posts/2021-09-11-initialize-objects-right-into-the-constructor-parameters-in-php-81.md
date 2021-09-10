---
layout: post
title: Initialize objects right into the constructor parameters in PHP 8.1
image: /cdn/initialize-objects-right-into-the-constructor-parameters-in-php-81.png
categories: [PHP]
---

With the introduction of PHP 8, the language now allows us to declare the class properties right into the constructor parameters. This is called [constructor property promotion](/constructor-property-promotion-php8/).

* TOC*
{:toc}

So, instead of doing so...

```php
<?php

class Book
{
    private string $name;
    private string $author;

    public function __construct(
        string $name = 'The Alchemist', 
        string $author = 'Paulo Coelho'
    ) {
        $this->name = $name;
        $this->author = $author;
    }
}
```

...you can do something like so.

```php
class Book
{
    public function __construct(
        private string $name = 'The Alchemist', 
        private string $author = 'Paulo Coelho'
    ) {}
}
```

This brings the following benefits to our disposal.

- There’s no need to declare properties in the class and defining them into the constructor body.

- The syntax is shorter and less error-prone as you don’t have to maintain the same property at three different places!

This is nice but you still can't directly initialize an object if there's a need. This is what PHP 8.1 attempts to solve.

## Initializing objects in constructor properties

[This RFC](https://wiki.php.net/rfc/new_in_initializers) for PHP 8.1 proposes to allow the use of new expressions inside...

- Parameter default values
- Attribute arguments
- Static variable initializers 
- Global constant initializers

The functionality is a further refinement of PHP 8's constructor property promotion.

What this essentially means is the code that you used to write pre PHP 8.1...

```php
class Test 
{
    private Logger $logger;
 
    public function __construct(
        ?Logger $logger = null,
    ) {
        $this->logger = $logger ?? new NullLogger;
    }
}
```

...Can now be written like this.

```php
class Test 
{
    public function __construct(
        private Logger $logger = new NullLogger,
    ) {}
}
```

As you can tell, here, in this case, the default `null` value is also handled implicitly as opposed to what you would do pre PHP 8.1.

Pretty concise, right?

It is possible to pass arguments to the constructor, including the use of [named arguments](https://www.amitmerchant.com/proposed-named-arguments-php/) like so.

```php
function test(
    $foo = new A,
    $bar = new B(1),
    $baz = new C(x: 2),
) {
}
```

## Restrictions

There are, however, some restrictions as well.

The use of... 
 
- A dynamic or non-string class name or an anonymous class is not allowed.
- Argument unpacking is not allowed.
- Unsupported expressions as arguments are not allowed.

So, the following is not possible.

```php
function test(
    $a = new (CLASS_NAME_CONSTANT)(), // dynamic class name
    $b = new class {}, // anonymous class
    $c = new A(...[]), // argument unpacking
    $d = new B($abc), // unsupported constant expression
) {}
```

## In closing

The inclusion of these new initializers in the constructor properties makes the already awesome constructor property promotion better and provides a fantastic developer experience!