---
layout: post
title: Zipping up multiple arrays using array_map in PHP
image: /cdn/zipping-up-multiple-arrays-using-array-map-in-php.png
categories: [PHP]
---

Little-known features are the best when you find them unknowingly. One such feature I came across recently is of the PHP's popular [array_map](https://www.php.net/manual/en/function.array-map.php) function.

* TOC
{:toc}

So, the array_map function is usually used for applying the callback to the elements of the given arrays but did you know you can also zip up multiple arrays of the same length using `array_map`. 

By the way, *zipping up is an operation where you can build an array of arrays*. Let's look at how you can do this with `array_map`.

## Zipping up arrays

For instance, let's say, we have three arrays of the same length with the following values.

```php
$users = ['Amit', 'Jemini', 'Cherika'];

$age = [31, 30, 4];

$sex = ['Male', 'Female', 'Female'];
```

Now, a zipping operation can create a resulting array from these arrays which look like so.

```
Array
(
    [0] => Array
        (
            [0] => 'Amit'
            [1] => 31
            [2] => 'Male'
        )

    [1] => Array
        (
            [0] => 'Jemini'
            [1] => 30
            [2] => 'Female'
        )

    [2] => Array
        (
            [0] => 'Cherika'
            [1] => 4
            [2] => 'Female'
        )
)
```

How would you do this using `array_map`?

## Using `array_map` for zipping

You can use `array_map` to easily perform zipping operation by using `null` as the name of the callback function in the first argument and passing all the available arrays as the rest of the arguments like so.

```php
$users = ['Amit', 'Jemini', 'Cherika'];

$age = [31, 30, 4];

$sex = ['Male', 'Female', 'Female'];

$userDetails = array_map(null, $users, $age, $sex);
print_r($userDetails);
```

This will return the zipped up array of arrays just like how I've mentioned in the [previous section](/zipping-up-multiple-arrays-using-array-map-in-php/#zipping-up-arrays).

It's important to note here is when using two or more arrays, they should be of equal length because the callback function (in this case `null`) is applied in parallel to the corresponding elements. If the arrays are of unequal length, shorter ones will be extended with empty elements to match the length of the longest.