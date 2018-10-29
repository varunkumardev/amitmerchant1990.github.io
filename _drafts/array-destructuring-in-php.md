---
layout: post
title: Array destructuring in PHP
---

Folks who are familiar with the JavaScript's ES6 may very well aware of the destructuring feature which allows us to extract data from arrays, objects, maps and sets. For instance, take this example. I want to extract information from the `car` object in more simpler way,

```js
const Car = {
    color: 'blue',
    type: 'sedan'
}
```

Using ES6 way, we can assign the top level variables of the objects to local variables using destructuring like below:

```js
const {color, type} = Car;
```

So, `color` and `type` has been assigned the variables from the `Car` object respectively. This is how object destructuring is achieved in JavaScript. What about PHP? 

PHP 7.1 has introduced associative array destructuring along with the list destructuring which was present in the earlier versions of PHP. Let's take a very simple example. For earlier versions than 7.1, to assign the array values to the variables, you'd achieve like this:

```php
list($dog, $cat, $cow) = $animals;
```

But from version 7.1, you can achieve it using shorhand array syntax([]):

```php
[$dog, $cat, $cow] = $animals;
```

It's just more cleaner and expressive now. Another area where you can use Array destructuring is in loops.

```php
$data = [
    [1, 'Foo'],
    [2, 'Bar']
]


foreach ($data as [$id, $name]) {
    // logic here with $id and $name
}
```
