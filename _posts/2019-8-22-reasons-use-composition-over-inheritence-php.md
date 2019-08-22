---
layout: post
title: Reasons to use Composition over Inheritence in PHP
categories: [PHP]
---

In object oriented programming, there are two ways using which classes can achieve polymorphic behaviour: _"Inheritance"_ & _"Composition"_.

Inheritance is the mechanism of basing an object or class upon another object or class, retaining similar implementation. In other words, using inheritance a class inherits fields and methods from all its superclasses, whether direct or indirect. A subclass can override methods that it inherits, or it can hide fields or methods that it inherits. Inheritence establishes an "is-a" relationship between classes. For example, "A car is a vehicle". Meaning a cat "inherits" all the traits of an animal.

On the other hand, Composition is the mechanism to reuse code across classes by containing instances of other classes that implement the desired functionality. A composition establishes a "has-a" relationship between classes. For example "A car has an engine". There are number of reasons which favors the use of composition over inheritence.

## Maintainibility and loose coupling

Let's understand both **Inheritence** and **Composition** using an example and analyse why inheritence can prove to be dangerous to implement.

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

In above exaple, we've inherited class `Vehicle` into the `Car` class. This makes a very tight coupling between class `Vehicle` and `Car`. If anything gets changed in class `Vehicle`, specifically in `move()` method, class `Car` can break easily as superclass `Vehicle` have no idea of what child classes are uses it for.

This kind of tight coupling can mitigated using composition. Let's modify above example to see how composition can solve this issue.

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

As you can see in the above example, we're not using inheritence anymore. Instead we're now using composition to achieve our required goal. Here, we're now passing the reference of class `Vehicle` into class `Car`'s contructor using dependency injection. So, we don't rely entirely upon class `Vehicle` because we can swap it out with another class very easily. And hence no tight coupling. Superclass and subclass are highly independent of each other now. Classes can freely make changes which were dangerous in inheritance situation.

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

In the above example, if we don't have the instance of `Vehicle` class,  it can easily be mocked up by using some test data and all methods can be easily tested. This was not possible at all in inheritance as you were heavily dependent on superclass to get the state of instance and execute any method.

## Mitigates PHP's lack of having multiple inheritence

With composition, single heritence languages such PHP, can easily overcome the lack of this very feature. Take this example below.

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
    }

    public function accelarate()
    {    
        $this->vehicle->move();    
        $this->tire->addAlloys();
    }
}
```

As you can see, we've tweaked the previous example to use an another class `Tyre` in class `Car`. So, we're now using two different classes into the `Car` class. This wouldn't be possible with inheritence. Especially when the language doesn't support multiple inheritence.

## Conclusion

Before using inheritance, consider if composition makes more sense. Subclassing usually means more complexity and connectedness, i.e. harder to change, maintain, and scale without making mistakes. Composition can replace inheritence in most of the cases.


