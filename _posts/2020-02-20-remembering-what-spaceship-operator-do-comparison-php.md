---
layout: post
title: Remembering what spaceship operator do on comparison in PHP
image: /cdn/spaceship-operator-php.png
categories: [PHP]
---

PHP has introduced an operator called "spaceship opearator" (`<=>`) with the release of PHP7. What this spaceship operator do is compare two expressions i.e. its two operands, let's say `$a` and `$b`, and returns -1, 0 or 1 when `$a` is respectively less than, equal to, or greater than `$b`.

Here's some examples of the same.

```php
<?php
// Integers
echo 1 <=> 1; // 0
echo 1 <=> 2; // -1
echo 2 <=> 1; // 1

// Floats
echo 1.5 <=> 1.5; // 0
echo 1.5 <=> 2.5; // -1
echo 2.5 <=> 1.5; // 1
 
// Strings
echo "a" <=> "a"; // 0
echo "a" <=> "b"; // -1
echo "b" <=> "a"; // 1
?>
```

## The trick
 
But it turns out a lot of us tend to forget the purpose of the operator more often. So, here's a handy yet effective trick to remember what this operator do pretty quickly. 

What you'd do is to replace the spaceship operator (<=>) with a minus sign (-). If the result is negative, 0 or positive, the expression will return -1, 0 or 1 respectively. As you can see, it's now more easy to remember when an analogy comes into play. 

...And that is also how remember anything you want, in general.
