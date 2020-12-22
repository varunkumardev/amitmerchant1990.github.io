---
layout: post
title: Using arrow functions in PHP 7.4
image: /cdn/arrow-functions.png
categories: [PHP]
---

When PHP 7.4 [released](https://www.php.net/archive/2019.php#2019-11-28-1), it came with a whole lot of features/improvements that makes the language more interesting to work with. The one such feature that I want to talk about is arrow functions. For a primer, arrow functions are not new. In fact, If you've been working with the latest JavaScript (EcmaScript 6), you might've worked with [arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) already.

You can now use a shorthand syntax for defining functions with implicit by-value scope binding. Let's understand it by taking the following example.

```php
<?php

$factor = 10;

$numbers = array_map(function($value) use ($factor){
    return $value * $factor;
}, [1, 2, 3]);

print_r($numbers);
//Array([0] => 10 [1] => 20 [2] => 30)

?>
```

As you can see, in the above example, if you want to use higher order functions such as [array_map](https://www.php.net/manual/en/function.array-map.php), there will be an anonymous function which will evaluate the values from the array passed as a second argument and if you want to use a variable which lies outside of the scope of the anonymous function, you’ll need to add use. That’s a lot of boilerplate code, right?

From PHP 7.4, the above can be reduced to the following using fat arrow(=>) syntax like so.

```php
<?php

$factor = 10;

$numbers = array_map(fn($value) => $value * $factor, [1, 2, 3]);

print_r($numbers);
//Array([0] => 10 [1] => 20 [2] => 30)

?>
```

The entire code is now reduced to just one line. It’s now more readable, shorter and clean now. And as an added bonus, you now don’t have to pass the local varible (in above example `$factor`) using `use` explicitly. It’ll be accessible in the arrow function automatically.

Also, because arrow functions have an implicit "return", it makes them ideal for single expressions rather than blocks of procedural code.

## The limitation

There's one limitation however using arrow functions. i.e. Currently, PHP only supports arrow functions for anonymous functions which consists of only one line. So, something like following is not supported yet.

```php
<?php

$factor = 10;

$numbers = array_map(fn($value) => { 
    $factor = $factor * 2;

    return $value * $factor;
}, [1, 2, 3]);

print_r($numbers);
//Array([0] => 10 [1] => 20 [2] => 30)

?>
```

Hopefully, this will get fixed in the next iterations of PHP.

Fingers crossed!
