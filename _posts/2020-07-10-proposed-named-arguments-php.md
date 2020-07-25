---
layout: post
title: Proposed named arguments in PHP 8
image: /cdn/proposed-named-arguments-php.png
categories: [PHP]
---

*Update: Named parameters has been accepted to be included in PHP 8. A 2/3 majority in voting from members was required and it got the required votes! Here's [the RFC](https://wiki.php.net/rfc/named_params) that got accepted.*

<hr>

Did you ever get in a situation where you're seeing a function and its parameters and wonders what those parameters are all about? I'm pretty sure you did.

For instance, take following,

```php
array_slice($array, $offset, $length, true);
```

Now, the first three parameters passed to [array_slice](https://www.php.net/manual/en/function.array-slice.php) is seemed to be self-explanatory because of informative variable names but what about the fourth parameter? It just says `true`. But what does `true` signify here? Well, to find it out, you'd need to navigate to the function definition or refer to the documentation. In the case of `array_slice`, the definition of it is like so.

```php
function array_slice(
    array $array,
    $offset,
    $length = null,
    $preserve_keys = false
) { }
```

So, the fourth parameter is `$preserve_keys` which you can tell by looking at the definition. But you don't have anything using which you can tell just by looking at the function declaration.

Well, this can be solved if [this RFC](https://wiki.php.net/rfc/named_params) is approved in PHP 8 which introduces **named parameters**.

## Named parameters

In a nutshell, named arguments/parameters allow passing arguments to a function based on the parameter name using the following syntax.

```php
callAFunction(paramName: $value);
```

Here, named arguments are passed by prefixing the value with the parameter name followed by a colon.

So, the previous example of `array_slice` can be written using named parameters like so.

```php
array_slice($array, $offset, $length, preserve_keys: true);
```

As you can see, the code is now pretty self-documenting as compared to the previous example. Now, we know what the fourth param is intended to do.

Apart from this, this would be very convenient when a function has a high number of parameters or default ones. With named arguments, we can make the code much more readable.

### Order-agnostic paramters

Apart from making the code self-documenting, this feature also makes the parameters *order agnostic*, and allows skipping default values arbitrarily.

To give a simple example:

```php
// Using positional arguments:
array_fill(0, 100, 50);
 
// Using named arguments:
array_fill(start_index: 0, num: 100, value: 50);
```

The order in which the named arguments are passed does not matter. The above example passes them in the same order as they are declared in the function signature, but any other order is possible too:

```php
array_fill(value: 50, num: 100, start_index: 0);
```

### Skipping defaults

With named parameters, it's possible to not specify all the defaults until the one you want to change. Named arguments allow you to directly overwrite only those defaults that you wish to change.

So, the following would be perfectly fine...

```php
htmlspecialchars($string, double_encode: false);
```

Instead of specifying all the default values like so...

```php
htmlspecialchars($string, default, default, false);
```

Pretty cool, no?

## In closing

We're just scratching the surface here. There a lot of exciting things that would come along with named parameters. You can refer to [the original RFC](https://wiki.php.net/rfc/named_params) (which is still in the voting phase) if you want to take a more in-depth look at named parameters and constraints they comes with.

I'm really hoping that this RFC gets approved because it would certainly make a difference to a lot of PHP codebases. Of course, for a good!

Until next time!

- [RFC: Named Arguments](https://wiki.php.net/rfc/named_params)