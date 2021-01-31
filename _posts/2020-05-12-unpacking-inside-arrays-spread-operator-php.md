---
layout: post
title: Unpacking inside arrays using spread operator in PHP
image: /cdn/spread-operator-php.png
categories: [PHP]
---

If you’ve ever worked with JavaScript, you might be well aware of this feature. So basically, from PHP 7.4, you would be able to unpack arrays into another array using spread operator [`...`].

Pre PHP 7.4, if you want to merge two arrays, you would need to use methods like [array_merge](https://www.php.net/manual/en/function.array-merge.php). Take this for example.

```php
<?php
// Pre PHP 7.4

$array = ['foo', 'bar'];

$result = array_merge($array, ['baz']);

print_r($result);
// Array([0] => baz [1] => foo [2] => bar)
```

But from PHP 7.4, you can achieve above using following syntax:

```php
<?php
// From PHP 7.4

$array = ['foo', 'bar'];

$result = ['baz', ...$array];

print_r($result);
// Array([0] => baz [1] => foo [2] => bar)
```

You can even unpack multiple arrays into a single array which is not possible using methods such as `array_merge` as the method like these can only take two arrays at a time.

{:.you-may-like}
> You may like: [Array unpacking with string keys coming in PHP 8.1](https://www.amitmerchant.com/array-unpacking-with-string-keys-coming-in-php-81/)

## Caveat

There's one issue however with this implementation. And that is you can not unpack the associative arrays. Doing so will throw a fatal error.

So, if we modify the above example into using an associative array and run it...

```php
<?php

$array = ['foo' => 'pikachu', 'bar' => 'pokemon'];

$result = ['baz', ...$array];

print_r($result);
```

...It will halt the script with the following fatal error.

```
<b>Fatal error</b>:  Uncaught Error: Cannot unpack array with string keys in [...][...]:6
```

So, you would need to keep this in mind while using the spread operator. At least, for now. But I'm pretty sure a workaround for this issue will be there in the upcoming versions of PHP.

Finger crossed!
