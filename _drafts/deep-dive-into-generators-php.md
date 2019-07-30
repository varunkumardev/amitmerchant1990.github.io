---
layout: post
title: A deep dive into Generators in PHP
categories: PHP
---

Have you ever stuck in a situation where the code that you've wrote uses foreach to iterate over a set of data into an array and which ultimately caused you to exceed a memory? Well, I've been to. Many times.

Take this for example:

```php
<?php
function generateNumbers($number) {
    $build = [];
    for ($i = 1; $i <= $number; $i++) {
        $build[] = $i;
    }
    return $build;
}

$result = generateNumbers(5);
foreach ($result as $value) {
    echo "Number: $value\n";
}
?>
```

As you can see, we've a function `generateNumbers` which basically accepts a number as its only parameter and will build an array which stores the range of numbers and returns the array ultimately and then we can loop over the result of that function. In our example, it will generate an array which contains range of number from 1 to 5. 

![normal-function](/images/normal-function.png)

This will work fine for the small amount of `$number`. But what if we want to generate a really big range of numbers? Let's say `generateNumbers(100000000000)`. Running the above script by replacing the number with "100000000000". Let's see what happens.

![](/images/out-of-memory.png)

As you can see, PHP has thrown "Out of memory" fatal error. Obvious solution here would be to increase `memory_limit` by going into **php.ini**. But PHP has better solution for this situation. Enter "Generators".

