---
layout: post
title: These new string functions are coming in PHP 8
image: /cdn/new-string-functions-php8.png
categories: [PHP]
---

Who would've thought that PHP would have to wait till its version 8 or rather 25 years after its inception, to get a truly native and understandable function to check if a string is contained in another string?!

Well, PHP 8 will get shipped with three new such string functions which many of us were anticipating from very long. These functions are as below.

- `str_contains` - The function checks if a string is contained in another string and returns a boolean value (true/false) whether or not the string was found.

```php
str_contains ( string $haystack , string $needle ) : bool
```

- `str_starts_with` - The function checks if a string begins with another string and returns a boolean value (true/false) whether it does.

```php
str_starts_with ( string $haystack , string $needle ) : bool
```

- `str_ends_with` - The function checks if a string ends with another string and returns a boolean value (true/false) whether it does.

```php
str_ends_with ( string $haystack , string $needle ) : bool
```

Let's go over them one by one.

*TL;DR*

## The `str_contains` function

Prior to PHP 8 or up until now, the way that many of us used to check if the specified string is there within an another string or not was by using function `strpos` like so.

```php
$a = 'How are you?';

if (strpos($a, 'are') !== false) {
    echo 'true';
}
```

As you can see, this looks quite hacky, non-intuitive and hard to remember. 

So, in order to fix this, [this RFC](https://wiki.php.net/rfc/str_contains) attempts to add a new function called `str_contains` which checks if a string is contained in another string and returns a boolean value (true/false) whether or not the string was found. Here's how its signature looks like.

```php
str_contains ( string $haystack , string $needle ) : bool
```

So, `str_contains` takes a `$haystack` and a `$needle` as arguments, checks if `$needle` is found in `$haystack` and returns a boolean value (true/false) whether or not the `$needle` was found.

Here are few examples of the same.

```php
str_contains("Hello World!", "Hello"); // true
str_contains("Hello World!", "Foo"); // false

// $needle is an empty string
str_contains("abc", "");  // true
str_contains("", "");     // true
```

It returns `true` when using empty string as needle because PHP compiler thinks that there's an empty string contained in every string.

It's also important to note here that `str_contains` is a case-sensitive function. So, following will return `false`.

```php
str_contains("Hello world!", "hello"); // false
```

## `str_starts_with` and `str_ends_with` [RFC](https://wiki.php.net/rfc/add_str_starts_with_and_ends_with_functions)

The `str_starts_with()` function checks if a string begins with another string and returns a boolean value (true/false) whether it does.

Once again, prior to this, the developers used to check this the same hacky way as we saw 
in `str_contains`'s section which is non-intuitive. 

Below is the function signature.

```php
str_starts_with ( string $haystack , string $needle ) : bool
```

`str_starts_with()` checks if `$haystack` begins with `$needle`. If `$needle` is longer than `$haystack`, it returns `false`; else, it compares each character in `$needle` with the corresponding character in `$haystack` (aligning both strings at their start), returning `false` if it encounters a mismatch, and `true` otherwise. The function is also case-sensitive.

Here are few examples of the same.

```php
$str = "beginningMiddleEnd";
if (str_starts_with($str, "beg")) echo "printed\n";
if (str_starts_with($str, "Beg")) echo "not printed\n";

// empty strings:
if (str_starts_with("a", "")) echo "printed\n";
if (str_starts_with("", "")) echo "printed\n";
if (str_starts_with("", "a")) echo "not printed\n";
```

Similarly, `str_ends_with()` does the same thing as `str_starts_with()` but aligning both strings at their end. Here's its function signature.

```php
str_ends_with ( string $haystack , string $needle ) : bool
```

And here are few examples of this function.

```php
$str = "beginningMiddleEnd";
if (str_ends_with($str, "End")) echo "printed\n";
if (str_ends_with($str, "end")) echo "not printed\n";

// empty strings:
if (str_ends_with("a", "")) echo "printed\n";
if (str_ends_with("", "")) echo "printed\n";
if (str_ends_with("", "a")) echo "not printed\n";
```

The behavior concerning empty strings is in accordance with what is described in `str_contains` section. 



