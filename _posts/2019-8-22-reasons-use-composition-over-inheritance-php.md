---
layout: post
title: Reasons to use Composition over Inheritance in PHP
image: /cdn/composition-over-inheritance.png
categories: [PHP]
---

In object-oriented programming, there are two ways using which classes can achieve polymorphic behavior: _"Inheritance"_ & _"Composition"_.

Inheritance is the mechanism of basing an object or class upon another object or class, retaining similar implementation. In other words, using inheritance a class inherits fields and methods from all its superclasses, whether direct or indirect. A subclass can override methods that it inherits, or it can hide fields or methods that it inherits. Inheritance establishes an ***"is-a"*** relationship between classes. For example, "A car *is a* vehicle". Meaning a cat "inherits" all the traits of an animal.

On the other hand, Composition is the mechanism to reuse code across classes by containing instances of other classes that implement the desired functionality. A composition establishes a ***"has-a"*** relationship between classes. For example, "A car *has an* engine". There are several reasons which favor the use of composition over inheritance. Let's go over them each.

* TOC
{:toc}

## Maintainability and loose coupling

Let's understand both **Inheritance** and **Composition** using an example and analyze why inheritance can prove to be dangerous to implement.

```php
<?php
class Vehicle
{    
    public function move()
    {
        echo "Move the car";
    }    
}

class Car extends Vehicle
{
    public function accelarate()
    {    
        move();    
    }
}

$car = new Car();
$car->accelarate(); //Move the car
```

In the above example, we've inherited the class `Vehicle` into the `Car` class. This makes a very tight coupling between class `Vehicle` and `Car`. If anything gets changed in class `Vehicle`, specifically in `move()` method, class `Car` can break easily as superclass `Vehicle` have no idea of what child classes are using it for.

{:.you-may-like}
> You may also like: [A closer look at Invokable classes in PHP](/invokable-classes-php/)

This kind of tight coupling can be mitigated using composition. Let's modify the above example to see how composition can solve this issue.

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

$vehicle = new Vehicle();
$car = new Car($vehicle);
$car->accelarate(); //Move the car
```

As you can see in the above example, we're not using inheritance anymore. Instead, we're now using composition to achieve our required goal. Here, we're now passing the reference of class `Vehicle` into class `Car`'s constructor using dependency injection. So, we don't rely entirely upon class `Vehicle` because we can swap it out with another class very easily. And hence no tight coupling. Superclass and subclass are highly independent of each other now. Classes can freely make changes that were dangerous in an inheritance situation.

## Better testability

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

In the above example, if we don't have the instance of the `Vehicle` class,  it can easily be mocked up by using some test data and all methods can be easily tested. This was not possible at all in inheritance as you were heavily dependent on the superclass to get the state of instance and execute any method.

## Fixes lack of multiple inheritance

With composition, single inheritance languages, such as PHP, can easily overcome the lack of multiple inheritance. Take this example below.

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

As you can see, we've tweaked the previous example to use another class `Tyre` in class `Car`. So, we're now using two different classes in the `Car` class. This wouldn't be possible with inheritance. Especially when the language doesn't support multiple inheritance.

## Conclusion

Before using inheritance, consider if composition makes more sense. Subclassing usually means more complexity and connectedness, i.e. harder to change, maintain, and scale without making mistakes. The composition pattern can replace inheritance in most cases.
