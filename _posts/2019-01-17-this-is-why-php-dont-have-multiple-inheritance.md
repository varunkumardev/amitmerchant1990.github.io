---
layout: post
title: This is why PHP don't have multiple inheritance
description: In this article, I will discuss about why PHP don't support multiple inheritance and how it has resolved this issue by allowing classes to implement multiple interfaces.
categories: [PHP]
image: /cdn/php-multiple-inheritance.png
---

PHP has evolved greatly as a language over the years. From a simple functional scripting language which initially started by Rasmus Lerdorf as his hobby project to supporting [object oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) features PHP has come a long way. Although, PHP has been implementing and improving features of object oriented programming in its every release, there is this one feature which is missing and I've always wondered why it is not there in PHP all these years. Yes, I'm talking about [multiple inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance).

There is a very logical reason why PHP don't support multiple inheritance. To learn about this, we need to go into the roots of this very concept. Multiple inheritance actually suffers from the [Diamond Problem](http://en.wikipedia.org/wiki/Diamond_problem).

> The "diamond problem" (sometimes referred to as the "deadly diamond of death") is an ambiguity that arises when two classes B and C inherit from A, and class D inherits from both B and C. If there is a method in A that B and C have overridden, and D does not override it, then which version of the method does D inherit: that of B, or that of C?

Take this for example by assuming PHP is supporting multiple inheritance.

![Diamond Problem in inheritance](/images/diamond-problem.png)

Let’s say `SuperClass` is an abstract class declaring some method and `ClassA`, `ClassB` are concrete classes.

```php
<?php

class SuperClass
{
    protected function greet()
    {
        echo "Grandparent";
    }
}

// First Parent class
class ClassA extends SuperClass
{
    protected function greet()
    {
        echo "Parent1";
    }
}
 
// Second Parent class
class ClassB extends SuperClass
{
    protected function greet()
    {
        echo "Parent2";
    }
}
 
class ClassC extends ClassA, ClassB
{
    public function test()
    {
        $c = new self();
        $c->greet();
    }
}
```

As you can see from the code, on calling the method `greet()` using object `ClassC`, it's impossible for the compiler to decide whether it has to call ClassA’s `greet()` or ClassB’s `greet()` method. So, this is to avoid such complications, PHP does not support multiple inheritance.

{:.you-may-like}
> You may also like: [A closer look at Invokable classes in PHP](/invokable-classes-php/)

## Mitigation of Diamond problem in PHP

One solution to mitigate not having multiple inheritance in PHP is to use traits. Traits are a mechanism for code reuse in single inheritance languages such as PHP which you'd use multiple inheritance for. Basically, traits are like classes except for one fact that you can't initantiate an instance of a trait. That is like utilising class members directly into the class without needing to instantiate or inherit them.

Below is an example of how you can define a trait and utilize the same in the class.

```php
trait myTrait 
{
    public function whereAmI()
    {
        echo __CLASS__;
    }
}

class Hello
{
    use myTrait;
}

$a = new Hello;
$a->whereAmI(); //Hello
```

Similarly, you can use multiple traits in a single clss comma-separated like this.

```php
use Hello, World;
```

You can read further about Traits [here](https://www.php.net/manual/en/language.oop5.traits.php).

Another solution here would be to [use composition](/reasons-use-composition-over-inheritance-php/) while designing your software. Basically, Composition is the mechanism to reuse code across classes by containing instances of other classes that implement the desired functionality. Check below example.

```php
<?php
class Vehicle
{    
    public function move()
    {
        echo "Move the car";
    }    
}

class Car
{
    private $vehicle;

    public function __construct(Vehicle $vehicle)
    {
        $this->vehicle = $vehicle;
    }

    public function accelarate()
    {    
        $this->vehicle->move();    
    }
}
```

As you can see, we've [injected](/dependency-injection-container-php/) `Vehicle` class to the `Car` class through constructor and this way we can access the class members of `Vehilcle` class into the `Car` class. Now, if you want to use to use an another class called `Tyre` in class `Car`, all you have to do is to inject it's instance in the constructor like so.

```php
<?php
class Vehicle
{    
    public function move()
    {
        echo "Move the car";
    }    
}

class Tire
{    
    public function addAlloys()
    {
        echo "Adding alloy wheels...";
    }    
}

class Car
{
    private $vehicle;

    private $tire;

    public function __construct(Vehicle $vehicle, Tire $tire)
    {
        $this->vehicle = $vehicle;
        $this->tire = $tire;
    }

    public function accelarate()
    {    
        $this->vehicle->move();    
        $this->tire->addAlloys();
    }
}
```

This approach is called as _"Composition over Inheritance"_ in object oriented programming and I've written [a whole article](/reasons-use-composition-over-inheritance-php/) around it.
