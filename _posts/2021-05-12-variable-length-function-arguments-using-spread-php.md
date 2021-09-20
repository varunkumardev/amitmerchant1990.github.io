---
layout: post
title: Variable-length function arguments using spread token in PHP
image: /cdn/variable-length-function-arguments-using-spread-php.png
categories: [PHP]
---

When working with functions, there might come the scenario where you're unsure as to how many arguments a function would have. Basically, a function can have an unlimited number of arguments that you don't define in the function signature.

For instance, a function that takes multiple strings as its arguments and counts the sum of words from all the specified strings. But there's no limit on how many strings you could provide to the function. So, the calling function could look like so.

```php
wordCount('Hello world', 'What is up?');

wordCount('Amit Merchant', 'Software Developer', 'Male');

wordCount('red', 'green', 'blue', 'pink');
```

As you can tell, the `wordCount` function takes in a different number of arguments when calling it. So, how do you define such a function which can handle variable-length arguments.

## The spread (`...`) token

Essentially, you can use the `...` token to assign variable-length argument lists to user-defined functions. The arguments will be passed into the given variable as an `array`.

So, if we want to write the `wordCount` function using the `...` token, we can do it like so.

```php
function wordCount(...$strings) {
    $totalWords = 0;

    foreach ($strings as $string) {
        $totalWords += str_word_count($string);
    }

    return $totalWords;
}
```

As you can tell, the variable `$string` is an array that contains all the strings provided to the function `wordCount` when calling it.

Conversely, you can also make the number of arguments fixed and provide the arguments using `...` like so.

```php
function wordCount($string1, $string2) {
    $totalWords = 0;

    $totalWords = str_word_count($string1) + str_word_count($string2);

    return $totalWords;
}

$count = wordCount(...['Amit', 'Developer']);
```