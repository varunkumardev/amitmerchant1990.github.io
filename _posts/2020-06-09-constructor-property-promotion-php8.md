---
layout: post
title: Constructor Property Promotion in PHP 8
image: /cdn/constructor-property-promotion.png
categories: [PHP]
---

Wouldn't it be nice if you don't have to declare the class property over and over again just to use it across the class? Currently, you'd do it by first declaring it... 

- In the property declaration.
- In the constructor parameters.
- In the property assignment in the costructor body.

So, a class with properties declared would look like so.

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

Things are getting interesting in PHP 8 for this scenario. According to [this RFC](https://wiki.php.net/rfc/constructor_promotion) (which is accepted), Constructor Property Promotion is coming in PHP 8.

## Constructor Property Promotion

With the use of constructor property promotion, it will be really easy to declare class properties by just declaring and defining properties all in one place.

Let's modify the previous example to see how it would look like when using constructor property promotion.

```php
<?php

class Book
{
    public function __construct(
        private string $name = 'The Alchemist', 
        private string $author = 'Paulo Coelho'
    ) {}
}
```

As you can see, using construstor property promotion, there are couple of benefits at our disposal.

- There's no need to declare properties in the class and defining them into the constructor body. 
- The syntax is more shorter and less error-prone as you don't have to maintain same property at three different places!

Here, when a method parameter is prefixed with one of the visibility keywords public, protected or private, it is considered to be *“promoted”*. When a parameter is promoted, a property with the same name will be added, and a forwarding assignment to that property included in the body of the constructor.

### Rules on using constructor property promotion

There are some places where you won't be able to use constructor property promotion.

- It can only be occurred in class constructors and not in other class methods.
- It can't be occurred in non-class based methods.
- It can't be occurred in [abstract class](https://www.php.net/manual/en/language.oop5.abstract.php) constructors or in interfaces.
- Properties with [callable](https://www.php.net/manual/en/language.types.callable.php) types are not eligible to be promoted.
- If the property is nullable, nullability must be explicitly declared using `?` like so.

```php
public function __construct(public ?Type $prop = null) {}
```

- [Variadic parameters](https://wiki.php.net/rfc/variadics) cannot be promoted. So, the following would be invalid.

```php
class Test {
    // Error: Variadic parameter.
    public function __construct(public string ...$strings) {}
}
```

- Promoted and non-promoted paramters can be used simultaneouly. So, following is absolutely valid.

```php
<?php

private string $description;

class Book
{
    public function __construct(
        private string $name = 'The Alchemist', 
        private string $author = 'Paulo Coelho',
        string $description = 'A fine book'
    ) {
        $this->desdescription = $description;
    }
}
```

You can learn more about this feature over [here](https://wiki.php.net/rfc/constructor_promotion).

> **More in PHP 8**
> - [The mixed type](/mixed-type-php8/)
> - [New String Function](/new-string-functions-php8/)
> - [Non-capturing exception catches](/non-capturing-exception-catches-php8/)
> - [Nullsafe operator](/nullsafe-operator-php/)
> - [Union types](/union-types-php/)