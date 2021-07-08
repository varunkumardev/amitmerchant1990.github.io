---
layout: post
title: Checking if array keys are out of order using array_is_list() in PHP 8.1
image: /cdn/checking-out-of-order-array-keys-in-php-81.png
categories: [PHP]
---

Working with arrays, there might come a time when you want to check if the [array](https://www.php.net/manual/en/language.types.array.php) in question is a list or not. So, how does an array qualifies as a *"list"*?

An array can be called a list when the keys (must be in form of an integer) are consecutive in nature. Meaning, if the array is an associative array with integer keys, it shouldn't have missing array offsets, or contains out-of-order keys.

* TOC
{:toc}

For instance, take the following for example.

```php
$cars = [
    0 => 'BMW',
    1 => 'Tesla',
    2 => 'Audi'
]
```

Here, we can call the `$cars` array as a list since the integer keys here are in proper order. But if it's the following...

```php
$cars = [
    2 => 'BMW',
    0 => 'Tesla',
    1 => 'Audi'
]
```

...in this case, the `$cars` array is not a list as the keys are now out of order.

Now, to check if the array is a list or not, we can write our own implementation like so.

```php
function is_list(array $array): bool 
{
    $expectedKey = 0;
    foreach ($array as $i => $_) {
        if ($i !== $expectedKey) { return false; }
        $expectedKey++;
    }
    return true;
}

$cars = [
    2 => 'BMW',
    0 => 'Tesla',
    1 => 'Audi'
]

var_dump(is_list($cars)); // false
```

...Or if you're planning to upgrade to PHP 8.1, there's a function for this that you can use out-of-the-box!

## The `array_is_list()` function

[This PR](https://wiki.php.net/rfc/is_list) for PHP 8.1 will introduce a function called `array_is_list()` which can be used for the same purpose I discussed above.

So, if we want to rewrite our previous example with this function, we can do it like so.

```php
$cars = [
    0 => 'BMW',
    1 => 'Tesla',
    2 => 'Audi'
]

var_dump(array_is_list($cars)); // true
```

And that's it! This is all this function does. 

## Caveat

One thing to note here is this function *would not work correctly* with arrays with keys other than integer for the obvious reasons. 

Also, anything other than array passed to `array_is_list()` would throw in a type error.

```php
array_is_list(new stdClass());  // throws a TypeError
array_is_list(null);  // throws a TypeError
```