---
layout: post
title: The difference between 'elseif' and 'else if' in PHP
image: /cdn/else.png
categories: [PHP]
---

PHP is [funny](http://phpsadness.com/) sometimes. There are many things in PHP which behaves differently instead of the way you think might work. I recently stumbled upon one such thing while working on one of my projects. 

There are basically following ways of writing two or more conditions in conditional statements. i.e using `else if` and `elseif`. We'll discuss both of them here.

## Using "elseif" in conditionals

We can write a conditional statement involving two or more conditions like below.

```php
if ($condition1) {
    // ...
} elseif ($condition2) {
    // ...
} else {
    // ...
}
```

In the above statement, the `elseif` is one statement by itself. So, it will check the first condition `$condition1`, if that becomes `false`, it will then checks the second condition `$condition2` and if it becomes true, PHP will excute the code in the block following the condition.

## Using "else if" in conditionals

On the other hand, We can write a conditional statement involving two or more conditions using `else if` like below.

```php
if ($condition1) {
    // ...
} else if ($condition2) {
    // ...
} else {
    // ...
}
```

You might think that the above example and the previous one using `elseif` behaves same but you're mistaken in this case. In the above case, `else if` is interpreted as an `if` statement in the `else` of the first `if`. As you can see, the conditionals becomes nested in this case.

The code above is actually interpreted like below:

```php
if ($condition1) {
    // ...
} else {
    if ($condition2) {
        // ...
    } else {
        // ...
    }
}
```

So basically, there's not much of a difference in using `else if` versus `elseif` other than the latter is a "syntactic sugar". However, if you're following PHP Standard Recommendations, [PSR-2](https://www.php-fig.org/psr/psr-2) is actually [recommeds](https://www.php-fig.org/psr/psr-2/#51-if-elseif-else) using `elseif` instead of `else if` as a standard approach. So, it's a rather good idea to use `elseif` in your code whenever possible.


