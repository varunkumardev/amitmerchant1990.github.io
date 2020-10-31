---
layout: post
title: How to use Attributes and their real-world usage in PHP 8.0
image: /cdn/how-to-use-php-80-attributes-real-world-usage.png
categories: [PHP]
---

Of many [great](https://www.amitmerchant.com/constructor-property-promotion-php8/) [new](https://www.amitmerchant.com/union-types-php/) [features](https://www.amitmerchant.com/match-expression-alternative-switch-statement-php8/) that PHP 8 has introduced, one of the most confusing that I found were called "Attributes", until today. Attributes in PHP 8 got [revised](https://wiki.php.net/rfc/attribute_amendments) [many](https://wiki.php.net/rfc/attributes_v2) times before gets settled to the current implementation that we will see in a bit.

* TOC
{:toc}

## What are Attributes?

Essentially, *Attributes are special kinds of classes that can be used to add [metadata](https://en.wikipedia.org/wiki/Metadata) to other classes, properties, functions, methods, parameters, and constants.* 

Before PHP 8, it was a regular practice to use "doc-comments" or "DocBlocks" to add metadata to these entities. For instance, here's how you can define a method DocBlock with metadata which indicates what type the arguments are of and what type of out it's returning.

```php
/**
 * Description of method here.
 *
 * @param Random         $mathRandom
 * @param StdlibDateTime $dateTime
 * @param int            $number
 *
 * @return int
 */
private function doSomething(
    Random $mathRandom, 
    StdlibDateTime $dateTime, 
    int $number
) : int {

}
```

But doc-comments are just strings and used to keep some structured information and some of the [libraries](https://www.phpdoc.org/) are using these doc-comments to generate full-fledged documentation by parsing them. Apart from this, IDEs such as PhpStorm uses these DocBlocks to intelligently show you diagnostics and show runtime warnings and errors in the code if there are any.

The way of doing all of the above natively was missing and hence [Attributes](https://wiki.php.net/rfc/attributes_v2) are introduced in PHP 8.0 to provide the ability to define the metadata natively.

Let's check how you can define attributes.

## How to define Attributes?

In its most simple form, an attribute in PHP can be applied using `#[attr]` syntax.

> Fun fact: PHP's attribute syntax is inspired by the [Rust's Attribute](https://doc.rust-lang.org/reference/attributes.html) syntax.

So, if you want to apply an attribute to a class, for instance, you can do it like so.

```php
#[Attribute]
final class TestClass {

}
```

As discussed above, attributes can also be applied to various other things such as properties, functions, methods, parameters, and constants like so.

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

## Practical usage

Now, let's take a look at how you can use Attributes to retrieve metadata once applied to a class. For this, you'll first need to create a custom attribute like so.

```php
#[\Attribute]
class TestAttribute
{
    public function __construct(public string $testArgument)
    {}
}
```

As you can see, the `TestAttribute` class is just a regular class and we have applied a global attribute to it using `#[\Attribute]`. To receive metadata, we can define a constructor in it which will be used to retrieve the metadata later on.

Once created, we can apply this custom attribute to another class like so.

```php
#[TestAttribute('Hello World')]
class MyClass
{

}
```

As you can see, we can apply the custom attribute just like the global attribute that we applied previously. And as you can tell, we have also passed in the argument to it which will act as metadata for this class.

Now it's time to retrieve the metadata from this class. And how will you do it? It's relatively simple. 

All you have to do is use the in-built `ReflectionClass` to get the details about `MyClass` like so.

```php
$reflection = new \ReflectionClass(MyClass::class);
$classAttributes = $reflection->getAttributes();

print_r($classAttributes[0]->newInstance()->testArgument);
```

Let's break it down. As you can tell, first we got the instance of `ReflectionClass` by passing in the `MyClass` into it. 

Once done, we can get all the attributes applied to this class by calling the `getAttributes` method onto it.

This will return an array of all the attributes applied to the class. So, if you will print `$classAttributes`, it would look like so.

```
array:1 [▼
  0 => ReflectionAttribute {#1829}
]
```

Next, to get the attribute of the class, we have called the `newInstance()` method on the attribute which will return the instance of the `TestAttribute` and from there, you can retrieve the metadata by calling the argument like so.

```php
$classAttributes[0]->newInstance()->testArgument // "Hello World"
```

You can play around with this entire example below.

<div class="laravel-playground" data-theme="dark" data-filename="index.php" data-php="8" data-hide-result="true" ><pre data-filename="index.php">&lt;?php
declare(strict_types=1);

// Below is a custom attribute

#[\Attribute]
class TestAttribute
{
    public function __construct(public string $testArgument)
    {}
}


// Apply the custom attribute to the class

#[TestAttribute(&#39;Hello World&#39;)]
class MyClass
{

}


// Get the metadata of the class using Reflection

$reflection = new \ReflectionClass(MyClass::class);
$classAttributes = $reflection-&gt;getAttributes();

dd($classAttributes[0]-&gt;newInstance()-&gt;testArgument);</pre>
</div>

<script type="text/javascript" src="https://embed.laravelplayground.com"></script>

## Real-world usage

While the previous example looks good to grasp the concept of Attributes, people at Spatie has found a nice way of using Attributes in a real-world scenario in their package called [laravel-route-attributes](https://github.com/spatie/laravel-route-attributes).

What this package essentially does is provides annotations to automatically register routes in Laravel applications running on PHP 8.

You can directly register routes by applying an attribute to the controller's action like so.

```php
use Spatie\RouteAttributes\Attributes\Get;

class MyController
{
    #[Get('my-route')]
    public function myMethod()
    {

    }
}
```

This attribute will automatically register this route:

```php
Route::get('my-route', [MyController::class, 'myMethod']);
```

As you can see, the `Spatie\RouteAttributes\Attributes\Get` attribute applied here can be used to register the `get` route. There are other attributes for the rest of the HTTP verbs which you can use like so.

```php
#[Spatie\RouteAttributes\Attributes\Post('my-uri')]
#[Spatie\RouteAttributes\Attributes\Put('my-uri')]
#[Spatie\RouteAttributes\Attributes\Patch('my-uri')]
#[Spatie\RouteAttributes\Attributes\Delete('my-uri')]
#[Spatie\RouteAttributes\Attributes\Options('my-uri')]
```

You can learn how it all working under the hood by looking at the package's code [here](https://github.com/spatie/laravel-route-attributes).