---
layout: post
title: Reasons to use Composition over Inheritence in PHP
categories: [PHP]
---

In object oriented programming, there are two ways using which classes can achieve polymorphic behaviour: "Inheritance" & "Composition".

Inheritance is the mechanism of basing an object or class upon another object or class, retaining similar implementation. In other words, using inheritance a class inherits fields and methods from all its superclasses, whether direct or indirect. A subclass can override methods that it inherits, or it can hide fields or methods that it inherits. Inheritence establishes an "is-a" relationship between classes. For example, "A car is a animal". Meaning a cat "inherits" all the traits of an animal.

On the other hand, Composition is the mechanism to reuse code across classes by containing instances of other classes that implement the desired functionality. A composition establishes a "has-a" relationship between classes. For example "A car has an engine".

