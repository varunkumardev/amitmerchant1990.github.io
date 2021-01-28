---
layout: post
title: Array unpacking with string keys coming in PHP 8.1
image: /cdn/array-unpacking-with-string-keys-coming-in-php-81.png
categories: [PHP]
excerpt: The spread operator in PHP is getting more awesome in PHP 8.1! So, to give you a primer, with the release of PHP 7.4, it got possible to merge multiple arrays by unpacking arrays into another array using the spread operator.
---

The spread operator in PHP is getting more awesome in PHP 8.1!

So, to give you a primer, with the release of PHP 7.4, it got possible to merge multiple arrays by unpacking arrays into another array using [spread operator](https://www.amitmerchant.com/unpacking-inside-arrays-spread-operator-php/) `[...]`. It was only possible by using methods like [array_merge](https://www.php.net/manual/en/function.array-merge.php) before PHP 7.4.

* TOC
{:toc}

Here's how you can merge multiple arrays using array unpacking.

```php
<?php

$foo = ['bar'];
$baz = ['qux'];

$result = ['baz', ...$foo, ...$baz];

print_r($result);
// Array([0] => baz [1] => bar [2] => qux)
```

## The caveat

There was however one caveat in this. And that is you can not unpack the associative arrays. Doing so will throw a fatal error like so.

```php
<?php

$array1 = ['john' => 'doe'];
$array2 = ['harry' => 'potter'];
$array = [...$array1, ...$array2];
echo "<pre>";
var_dump($array);

// Fatal error: Uncaught Error: Cannot unpack array with 
// string keys in /var/www/index.php:5 
// Stack trace: #0 {main} thrown in /var/www/index.php on line 5
```

But this is getting solved starting from PHP 8.1!

## Array unpacking with string keys

There is [this RFC](https://wiki.php.net/rfc/array_unpacking_string_keys) for PHP 8.1 which proposes to permit unpacking of string keys ([associative arrays](https://www.php.net/manual/en/language.types.array.php)) into arrays as well.

This means that the example we looked at previously would work just fine in PHP 8.1. Take a look.

```php
<?php

$array1 = ['john' => 'doe'];
$array2 = ['harry' => 'potter'];
$array = [...$array1, ...$array2];
echo "<pre>";
var_dump($array);
// ['john' => 'doe', 'harry' => 'potter']
```

One thing to note here is, if there is a key that occurs several times in the array, in that case, the later string key overwrites the earlier one. Take below for an example.

```php
<?php

$array1 = ['john' => 'doe'];
$array2 = ['john' => 'potter'];
$array = [...$array1, ...$array2];
echo "<pre>";
var_dump($array);
// ['john' => 'potter']
```

Although the RFC is still in the voting phase, the good news here is almost every voter has given it the "green" signal already.

So, it's almost certain that the RFC will get implemented in PHP 8.1!
