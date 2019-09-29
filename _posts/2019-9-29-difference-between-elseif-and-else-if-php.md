---
layout: post
title: The difference between 'elseif' and 'else if' in PHP
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

In the above statement, the `elseif` is one statement by itself. So, it will check the first condition `$condition1`, if that becomes `false`, it will then checks the second condition `$condition2` and if it becomes true, PHP will excute the code in the following code.

## Using "else if" in conditionals

On the other hand, We can write a conditional statement involving two or more conditions like below.

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

For many cases, this might not be an intended behaviour because let's say you have more than 3-4 conditions and if you're using "else if" you might end up with a completely wrong results. 

## In closing

If you're following PHP Standard Recommendations, [PSR-2](https://www.php-fig.org/psr/psr-2) is actually [recommeds](https://www.php-fig.org/psr/psr-2/#51-if-elseif-else) using `elseif` instead of `else if` because the side effects I've mentioned above. So, it's a good idea to use the `elseif` in your code whenever possible.


