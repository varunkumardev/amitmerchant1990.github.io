---
layout: post
title: Array destructuring in PHP
categories: PHP
---

Folks who are familiar with the JavaScript's ES6 may very well aware of the [destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) feature which allows us to extract data from arrays, objects, maps and sets. For instance, Using ES6 way, we can assign the top level variables of the objects to local variables using destructuring like below:

```js
const Car = {
    color: 'blue',
    type: 'sedan'
}

const {color, type} = Car;
```

So, `color` and `type` has been assigned the variables from the `Car` object respectively. This is how object destructuring is achieved in JavaScript. What about PHP? 

PHP >=7.1 has introduced [associative array destructuring](http://php.net/manual/en/migration71.new-features.php#migration71.new-features.symmetric-array-destructuring) along with the list destructuring which was present in the earlier versions of PHP. Let's take a very simple example. For earlier versions than 7.1, to assign the array values to the variables, you'd achieve using [list()](http://php.net/manual/en/function.list.php) like this:

```php
list($dog, $cat, $cow) = $animals;
```

But from version 7.1, you can just use shorhand array syntax([]) to achieve the same:

```php
[$dog, $cat, $cow] = $animals;
```

As you can see, it's just more cleaner and expressive now, just like ES6. Another area where you can use Array destructuring is in loops.

```php{2-3}
$data = [
    [1, 'Foo'],
    [2, 'Bar']
]

foreach ($data as [$id, $name]) {
    // logic here with $id and $name
}
```

If you want to be specific about the key you assign to the variable, you can do it like this:

```php
foreach ($data as ['uid' => $id, 'fname' => $name]) {
    // logic here with $uid and $fname
}
```

## Wrapping up

Although, we have 'list()' already, utilizing the shorthand array syntax for destructuring is just more cleaner way and makes more sense.
