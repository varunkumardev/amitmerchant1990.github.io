---
layout: post
title: A look into Getters and Setters in JavaScript
categories: JavaScript
---

There are always multiple ways of doing things. Programming is no different. For instance, in JavaScript, what would you do if you want to get the property of an object running some operation before returning it? Take this example.

```js
var person = {
    firstName: 'Amit',
    lastName: 'Merchant',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    }
}

console.log(person.fullName());    // Amit Merchant
```

As you can see, in order to get the fullname which is concatenation of two properties `firstName` and `lastName` of `person` object, you can define a function called `fullName` and run necessary operation and return the result. Similarly in order to value to a property, you can define a function called `setFirstName`, passing the required value to it as a parameter and bam! Objective achieved! 

```js
var person = {
    firstName: 'Amit',
    lastName: 'Merchant',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    },
    setFirstName: function(name) {
        this.firstName = name;
    }
}

person.setFirstName('Jon')
console.log(person.fullName());    // Jon Merchant
```

But as I said earlier "There are always multiple ways of doing things". So, here's a more clear and concise way of achieving the above in EcmScript 5. They are called "getters" and "setters".

## What are "getters" and "setters"?

A getter is a function which gets bound by `get` keyword to an object property which will be invoked autimatically when that property is looked up. Let's rewrite the above example using getter.

```js
var person = {
    firstName: 'Amit',
    lastName: 'Merchant',
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
}

console.log(person.fullName);    // Amit Merchant
```

As you can see, the `fullName` still looks like a normal function but now that it's a getter, it can be accessed like an object property. Much cleaner and elegant, right? A getter has a use when you want to run some code every time a property is requested. 

There are few things that you need to consider when working with getters, such as:

- It can have an identifier which is either a number or a string.
- It must have exactly zero parameters.
- It must not appear in an object literal with another `get` or with a data entry for the same property (`{ get x() { }, get x() { } }` and `{ x: ..., get x() { } }` are forbidden).

### Setters

Similar to getter, a setter is a function which gets bound by `get` keyword to an object property which will be called when there is an attempt to set that property. Here's an example of the same.

```js
var person = {
    _firstName: 'Amit',
    lastName: 'Merchant',
    get fullName() {
        return this._firstName + ' ' + this.lastName;
    },
    set firstName(name) {
        this._firstName = name;
    }
}

person.firstName = 'Jon';
console.log(person.fullName);    // Jon Merchant
```

Setters can be used to execute a function whenever a specified property is attempted to be changed. Setters are most often used in conjunction with getters to create a type of pseudo-property. It is not possible to simultaneously have a setter on a property that holds an actual value and that's the reason why I've changed the property name to `_firstName` in above example. If you're going to do so, you'll this weird error: `Uncaught RangeError: Maximum call stack size exceeded`.

Setters can be deleted using `delete` keyword.

```js
delete person.firstName;
```

### Using computed property in a setter

You can assign computed property name in setter using `[]`.

```js
var expr = 'foo';

var obj = {
  baz: 'bar',
  set [expr](v) { this.baz = v; }
};

console.log(obj.baz); // "bar"
obj.foo = 'baz';      // run the setter
console.log(obj.baz); // "baz"
````
