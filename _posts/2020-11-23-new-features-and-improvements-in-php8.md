---
layout: post
title: Exciting new features and improvements in PHP 8
image: /cdn/new-features-and-improvements-in-php8.png
categories: [PHP]
---

As the official release date *(26th November 2020)* of PHP's latest and greatest version PHP 8 is approaching, let's take a look at every new feature and improvement that the PHP team has managed to fit in this version.

This is a roundup of all the features that I've covered previously on this blog under a single article. I'll give a small overview of the feature and link it to the full article at the bottom of each feature.

So, read along.

* TOC
{:toc}

## Constructor Property Promotion

Using constructor property promotion, it will be really easy to declare class properties by just declaring and defining properties all in one place.

So, the following code...

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

...can be rewritten using constructor property promotion like so.

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

**￫ Full Article:** [Constructor Property Promotion in PHP 8](/constructor-property-promotion-php8/)

## Match expressions

Match expression has been introduced which are similar to switch statements but with safer semantics and the ability to return values.

So, if you have the following switch statement...

```php
<?php

switch ($i) {
    case 'apple':
        echo 'i is apple';
        break;
    case 'cake':
        echo 'i is cake';
        break;
    default:
        echo 'i is pizza';
}
```

...it can be rewritten using match expressions like so.

```php
<?php

echo match ($i) {
    'apple' => 'i is apple',
    'cake' => 'i is cake',
    default => 'i is pizza',
};
```

**Full Article:** [Match expression - An alternative to switch statement in PHP 8](/match-expression-alternative-switch-statement-php8/)

## Named arguments

Named arguments/parameters allow passing arguments to a function based on the parameter name using the following syntax.

```php
callAFunction(paramName: $value);
```

So, for instance, this is how the `array_slice` method can be written in non PHP 8 versions.

```php
array_slice($array, $offset, $length, true);
```

The same method can be called using named arguments like so.

```php
array_slice($array, $offset, $length, preserve_keys: true);
```

As you can see, the code is now pretty self-documenting as compared to the previous example. Now, we know what the fourth param is intended to do.

**￫ Full Article:** [Proposed named arguments in PHP 8](/proposed-named-arguments-php/)

## Union types

With the introduction of union types, types can be specified using the syntax `T1|T2|...` which lets you declare a variable in multiple types and can be used in all positions where types are currently accepted. 

For instance, there can be a function that can accept a variable of type `int` or `float` as a parameter. Or a function that returns a value of `int` or `float` type.

Check the following example.

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

**￫ Full Article:** [Union types are coming in PHP 8](/union-types-php/)

## Mixed type

PHP 8 has introduced a dedicated mixed type that can be used to assign a mixed type to the class properties and return type of class methods natively.

Essentially, A type of mixed would be equivalent to array or bool or callable or int or float or null or object or resource or string. So, whenever you would be unsure about the type of property, you would use mixed for the same. The same goes for the return type as well.

Check the following example.

```php
/**
* Handle an incoming request.
*
* @param  mixed  $request
* @return mixed
*/
public function handle(mixed $request): mixed
{
    // processing request

    return $next($request);
}
```

**￫ Full Article:** [The mixed type of PHP 8](/mixed-type-php8/)

## Attributes

Attributes are special kinds of classes that can be used to add [metadata](https://en.wikipedia.org/wiki/Metadata) to other classes, properties, functions, methods, parameters, and constants.

In its most simple form, an attribute in PHP can be applied using `#[attr]` syntax.

So, if you want to apply an attribute to a class, for instance, you can do it like so.

```php
#[Attribute]
final class TestClass {

}
```

attributes can also be applied to various other things such as properties, functions, methods, parameters, and constants like so.

```php
#[ExampleAttribute]
class Foo
{
    #[ExampleAttribute]
    public const FOO = 'foo';
 
    #[ExampleAttribute]
    public $x;
 
    #[ExampleAttribute]
    public function foo(#[ExampleAttribute] $bar) { }
}
 
$object = new #[ExampleAttribute] class () { };
 
#[ExampleAttribute]
function f1() { }
 
$f2 = #[ExampleAttribute] function () { };
 
$f3 = #[ExampleAttribute] fn () => 1;
```

**￫ Full Article:** [How to use Attributes and their real-world usage in PHP 8.0](/how-to-use-php-80-attributes/)

## New string function

PHP 8 will get shipped with three new such string functions which many of us were anticipating for a very long. These functions are as below.

- `str_contains` - The function checks if a string is contained in another string and returns a boolean value (true/false) whether or not the string was found.

```php
str_contains ( string $haystack , string $needle ) : bool
```

Here are a few examples of the same.

```php
str_contains("Hello World!", "Hello"); // true
str_contains("Hello World!", "Foo"); // false

// $needle is an empty string
str_contains("abc", "");  // true
str_contains("", "");     // true
```

- `str_starts_with` - The function checks if a string begins with another string and returns a boolean value (true/false) whether it does.

```php
str_starts_with ( string $haystack , string $needle ) : bool
```

Here are a few examples of the same.

```php
$str = "beginningMiddleEnd";
if (str_starts_with($str, "beg")) echo "printed\n";
if (str_starts_with($str, "Beg")) echo "not printed\n";

// empty strings:
if (str_starts_with("a", "")) echo "printed\n";
if (str_starts_with("", "")) echo "printed\n";
if (str_starts_with("", "a")) echo "not printed\n";
```

- `str_ends_with` - The function checks if a string ends with another string and returns a boolean value (true/false) whether it does.

```php
str_ends_with ( string $haystack , string $needle ) : bool
```

Here are a few examples of this function.

```php
$str = "beginningMiddleEnd";
if (str_ends_with($str, "End")) echo "printed\n";
if (str_ends_with($str, "end")) echo "not printed\n";

// empty strings:
if (str_ends_with("a", "")) echo "printed\n";
if (str_ends_with("", "")) echo "printed\n";
if (str_ends_with("", "a")) echo "not printed\n";
```

**￫ Full Article:** [These new string functions are coming in PHP 8](/new-string-functions-php8/)

## Non-capturing exception catches

PHP 8 is introducing “non-capturing catches”. With the introduction of these, it can be possible to catch exceptions without capturing them to variables like so.

```php
try {
    throw new Exception('foo!');
} catch (Exception) {
    // send a predefined email to the administrator 
    // irrespective of the exception information
} 
```

As you can see, the exception variable is completely omitted as the exception details have become irrelevant now.

**￫ Full Article:** [Non-capturing exception catches in PHP 8](/non-capturing-exception-catches-php8/)