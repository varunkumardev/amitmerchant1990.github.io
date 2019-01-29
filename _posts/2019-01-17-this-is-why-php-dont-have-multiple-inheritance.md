---
layout: post
title: This is why PHP don't have multiple inheritance
description: In this article, I will discuss about why PHP don't support multiple inheritance and how it has resolved this issue by allowing classes to implement multiple interfaces.
categories: [PHP, Laravel]
---

PHP has evolved greatly as a language over years. From a simple functional scripting language which initially started by Rasmus Lerdorf as his hobby project to supporting [object oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming) features PHP has come a long way. Although, PHP has been implementing and improving features of object oriented programming in its every release, there is this one feature which is missing and I've always wondered why it is not there in PHP all these years. Yes, I'm talking about [multiple inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance).

There is a very logical reason why PHP don't support multiple inheritance. To learn about this, we need to go into the roots of this very concept. Multiple inheritance actually suffers from the [Diamond Problem](http://en.wikipedia.org/wiki/Diamond_problem).

> The "diamond problem" (sometimes referred to as the "deadly diamond of death") is an ambiguity that arises when two classes B and C inherit from A, and class D inherits from both B and C. If there is a method in A that B and C have overridden, and D does not override it, then which version of the method does D inherit: that of B, or that of C?

Take this for example by assuming PHP is supporting multiple inheritance.

![](/images/diamond-problem.png)

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

## Mitigation of Diamond problem in PHP

To mitigate such situation, PHP allow classes to implement multiple [protocols](https://en.wikipedia.org/wiki/Protocol_(object-oriented_programming)), called [interfaces](http://php.net/manual/en/language.oop5.interfaces.php). Interfaces define methods but do not provide concrete implementations. Interfaces are like abstract base classes that specify method signatures without implementing any behavior. 

Nevertheless, even when several interfaces declare the same method signature, as soon as that method is implemented (defined) anywhere in the inheritance chain, it overrides any implementation of that method in the chain above it (in its superclasses). Hence, at any given level in the inheritance chain, there can be at most one implementation of any method. Thus, single-inheritance method implementation does not exhibit the Diamond Problem even with multiple-inheritance of interfaces. 
