---
layout: post
title: A cool helper function to check if anything is blank in PHP
image: /cdn/cool-helper-function-to-check-anything-blank-php.png
categories: [PHP]
---

There are a lot of different ways in PHP using which you can validate if the given value is *"blank"* or not. The method to validate depends upon the type of value that we're targetting.

So, for instance, let's say if you want to check if the value is `null`, you would use the [is_null](https://www.php.net/manual/en/function.is-null) function of PHP. If you want to check if the given string is empty, you would use the combination of the [is_string](https://www.php.net/manual/en/function.is-string.php) and [trim](https://www.php.net/manual/en/function.trim) functions to validate this scenario.

Similarly for numeric and boolean values.

But what if you could combine all of these and conjure up a single function that can validate everything all at once?

Well, recently I have come across one such function that can literally do so.

## The `blank()` swiss army knife function

Braunson Yager [shared](https://twitter.com/braunshizzle/status/1435624428126232583) this function called `blank()` that can do all the things (that I mentioned above) all at once.

Here's how it looks like.

```php
/**
 * Determine if the given value is "blank".
 *
 * @param mixed $value
 * @return bool
 */
function blank($value)
{
    if (is_null($value)) {
        return true;
    }

    if (is_string($value)) {
        return trim($value) === '';
    }

    if (is_numeric($value) || is_bool($value)) {
        return false;
    }

    if ($value instanceof Countable) {
        return count($value) === 0;
    }

    return empty($value);
}
```

As you can tell, you can give the value of any type as an only parameter to this function to validate if it's blank or not and return a boolean based on the matching scenario.

It even has this obscure scenario that validates arrays and objects using the [Countable](https://www.php.net/manual/en/class.countable.php) interface.

A really handy helper function I must say!