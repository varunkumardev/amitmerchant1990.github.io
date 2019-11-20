---
layout: post
title: Nullable types in PHP 7.1
categories: [PHP]
image: /cdn/nullable-types.png
excerpt: In this article, I've discussed regarding Nullable types that are introduced in PHP 7.1 and its usefulness.
---

Today, while reading through the code of [laravel-vouchers](https://github.com/beyondcode/laravel-vouchers) package, I stumbled upon [this litle code](https://github.com/beyondcode/laravel-vouchers/blob/master/src/VoucherGenerator.php#L23) which looks like this.

```php
/**
 * @param string $prefix
 */
public function setPrefix(?string $prefix): void
{
    $this->prefix = $prefix;
}
```

Noticed `?string` type-hint in the function parameter? This is the thing that had got me. I wondered what this means and why it is useful. So, I needed to find it out. And after a little Googling, I found that this are called as [Nullable types](https://www.php.net/manual/en/migration71.new-features.php#migration71.new-features.nullable-types) which are added in PHP 7.1.

## What are Nullable types?

Nullable type simply means when you prepens `?` to the type name while declaring types in the method parameters or for return values, it will be marked as nullable. This signifies that as well as the specified type, NULL can be passed as an argument, or returned as a value, respectively.

So, if you type hint parameter with `?` like below

```php
function printMe(?string $name)
{
    var_dump($name);
}

printMe('FooBar'); // string(10) "FooBar"
printMe(null); // NULL
```

As you can see, the method will accept both `string` and `null` as a parameter without any error and process them likewise. But if you don't pass any arguments it then it will result into a fatal error.

Similarly, if you type hint return type of a method with `?` like below

```php
function testReturn(): ?string
{
    return 'FooBar';
}

var_dump(testReturn()); // FooBar

function testReturn(): ?string
{
    return null;
}

var_dump(testReturn()); // NULL
```
