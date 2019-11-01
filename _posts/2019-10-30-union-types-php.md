---
layout: post
title: Union types are coming in PHP 8
image: /cdn/php-union-types.jpeg
categories: [PHP]
---

In this article, I'm going to discuss about the union types which are going to come in future versions of PHP through [this RFC](https://github.com/php/php-rfcs/pull/1). To understand why and how are union types important in PHP, let's first understand what are union types.

## What are union types?

According to Wikipedia,

> In computer science, a union is a value that may have any of several representations or formats within the same position in memory; that consists of a variable that may hold such a data structure.

So basically, A union type describes a value that can be one of several types. A "union type" accepts values of multiple different types, rather than a single one. This means if the programming language supports union types, you can declare a variable in multiple types. For instance, there can be a function which can accept variable of type "string" or "float" as a parameter.

When it comes to PHP, it already supports two special union types:

- `Type` or `null`, using the special `?Type` syntax.
- `array` or `Traversable`, using the special iterable type.

But as of now, arbitrary union types are not supported by the language. So, programmers tends to use PHPDoc annotations as a workaround.

```php
class Number {
    /**
     * @var int|float $number
     */
    private $number;

    /**
     * @param int|float $number
     */
    public function setNumber($number) {
        $this->number = $number;
    }

    /**
     * @return int|float
     */
    public function getNumber() {
        return $this->number;
    }
}
```

But this is going to be changed because union types are coming to PHP natively. An [rfc proposal](https://github.com/php/php-rfcs/pull/1) has been approved which adds the support for the union types in PHP. Accoring to this proposal, Union types are specified using the syntax `T1|T2|...` and can be used in all positions where types are currently accepted. Like the following example:

```php
class Number {
    private int|float $number;

    public function setNumber(int|float $number): void {
        $this->number = $number;
    }

    public function getNumber(): int|float {
        return $this->number;
    }
}
```

## Advantages of using union types

As you can see in the example above, the syntax is now a lot less boilerplate-y than phpdoc. Apart from this, having the union types can bring following advantages:

- Types are actually enforced, so mistakes can be caught early.
- Because they are enforced, type information is less likely to become outdated or miss edge-cases.
- Types are checked during inheritance, enforcing the Liskov Substitution Principle.
- Types are available through Reflection.

## Scope of union types

Union types will support all types currently supported by PHP. There some exceptions to this such as `void` type, Nullable union types, `false` pseudo-type and so on. You can read more about it [here](https://github.com/nikic/php-rfcs/blob/union-types/rfcs/0000-union-types-v2.md#supported-types).

## In closing

The union types are all great and they are most probably going to be included in PHP 8.0. So, until then we'll have to resort to the good old PHP DOCBlocks.
