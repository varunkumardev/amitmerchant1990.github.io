---
layout: post
title: Readonly properties are coming in PHP 8.1
image: /cdn/readonly-properties-are-coming-in-php-81.png
categories: [PHP]
fluidbox: true
---

PHP, as a language, is ever-changing and ever-evolving. It's not a language it was 10 years ago. This is all because the PHP's core team which has been constantly improving minor things that might not look significant at first glance but when fixed/implemented, can dramatically improve the overall developer experience.

One such thing that PHP is going to introduce is called readonly properties in the upcoming version 8.1

Essentially, the readonly properties are introduced to mitigate language's limitation of not having the ability to declare truly *"read only"* properties without any gotchas.

* TOC
{:toc}

## The old way

Up until now, if you want to make a certain property sort of read only, the only thing you could do is making it `private`. Take the following example.

```php
<?php

class Book 
{
    private $author;    

    public function __construct(
        string $author
    ) {
        $this->author = $author;
    }

    public function getAuthor(): string 
    {
        return $this->author;
    }
}

$book = new Book('Ruskin Bond');

$book->author = 'J. K. Rowling';
// Uncaught Error: Cannot access private property Book::$author
```

If we run the above example, we will end up with a fatal error that says `Uncaught Error: Cannot access private property Book::$author`.

[![Private Readonly Hack](/images/private-readonly-hack.png)](/images/private-readonly-hack.png)

As you can tell, using this approach, we can certainly make properties "readonly" but it's kind of "hacky" and the biggest issue with making the property `private` is, if you want to access it outside of the class, you must define a getter method for the same.

In our case, if we want to access the `author` property, we can define a getter method in the class like so.

```php
public function getAuthor(): string 
{
    return $this->author;
}
```

So, to mitigate this issue, PHP 8.1 is now introducing full-fledge readonly properties natively.

## Readonly properties in PHP 8.1

This [RFC](https://wiki.php.net/rfc/readonly_properties_v2) by Nikita Popov is going to introduce first-class `readonly` properties in PHP 8.1.

Essentially, now it will be possible to declare a property as "read only" using the `readlonly` keyword. 

### Usage

So, if we want to make the `$author` property in our previous example as read only, we can do it like so.

```php
<?php

class Book 
{
    public readonly string $author; 

    public function __construct(
        string $author
    ) {
        // Legal initialization
        $this->author = $author;
    }
}

$book = new Book('Ruskin Bond');

// Below will work fine
echo $book->author; // string(6) "Ruskin Bond"
```

As you can tell, using `readonly` with a `public` property makes it possible to access the property outside of the class. So, no need to use getter methods anymore!

### Can be declared only once

One thing to note here though that is, a readonly property can only be initialized once, and only from the scope where it has been declared. Any other assignment or modification of the property will result in an `Error` exception.

So, the following will result in an `Error` exception.

```php
$book = new Book('Ruskin Bond');

$book->author = 'J. K. Rowling'
// Error: Cannot modify readonly property Book::$author
```

### No explicit default value 

Apart from this, it's also not possible to specify an explicit default value on readonly properties is also not allowed.

So, the following will result in a fatal error.

```php
class Book 
{
    // Fatal error: Readonly property Book::$author cannot have default value
    public readonly string $author = 'Ruskin Bond'; 
}
```

### Used with only typed properties

The `readonly` modifier can only be applied to typed properties. The reason is that untyped properties have an implicit null default value, which counts as an initializing assignment, and would likely cause confusion.

This can be mitigated by using the [mixed type](https://www.amitmerchant.com/mixed-type-php8/) which was introduced in PHP 8.0 like so.

```php
class Test
{
    public readonly mixed $prop;
}
```

## In closing

This was your introduction to the `readonly` properties in PHP 8.1. I have only discussed some of the main features of these properties. But there are a lot of others that I haven't discussed such as their impact on the inheritance, immutability, Reflection, and so on.

So, if you are interested go ahead and read [this entire RFC](https://wiki.php.net/rfc/readonly_properties_v2)!