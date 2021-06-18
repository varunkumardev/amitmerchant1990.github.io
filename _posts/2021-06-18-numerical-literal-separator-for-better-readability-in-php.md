---
layout: post
title: Numerical literal separator for better readability in PHP
image: /cdn/numerical-literal-separator-for-better-readability-in-php.png
categories: [PHP]
---

When you're working with numbers in your code, they sometimes become hard to comprehend. For instance, in cases where numbers are too large in terms of length. Take the following for example.

```php
$number = 5000000000;
```

If you spot the above number somewhere in your code, I'm pretty sure you would not be able to make out what this number represents by just looking at it. 

You would need to squeeze your eyes a little more in order to process the number in your mind.

In the real world, to make this easier to read, we are used to using *commas* (`,`) like so.

```
This is a number: 5,000,000,000
```

You can not just use these commas when it comes to the code. So, how do you overcome this? More specifically in PHP?

Enter **numerical literal separator**.

## Numerical literal separator

As I mentioned earlier, humans can process numbers faster if there's some sort of separator between them. So, while we can not use commas, we certainly can use underscores. This is what is called numerical literal separators in PHP and here's how we can rewrite the previous example using it.

```php
$number = 5_000_000_000; // 5 billion

var_dump($number); // int(5000000000)
```

As you can tell, the number has become easier to read because underscores visually separate groups of digits. You can easily make out now that this number represents *"5 billion"*!

Also, notice adding an underscore between digits in a numeric literal will not change its value. The underscores are stripped out during the lexing stage, so the runtime is not affected.

Likewise, underscore separators can be used in all-numeric literal notations supported by PHP like so.

```php
6.674_083e-11; // float
299_792_458;   // decimal
0xCAFE_F00D;   // hexadecimal
0b0101_1111;   // binary
0137_041;      // octal
```

## In closing

This feature has been there in PHP since [v7.4](https://wiki.php.net/rfc/numeric_literal_separator). So, if you're on PHP `>7.4`, I would highly recommend you start using numerical literal separators for better readability of code in your projects!