---
layout: post
title: Top features of PHP 7.4 Explained!
image: /cdn/top-php-74-features.png
categories: [PHP]
---

PHP 7.4 is finally [released](https://www.php.net/archive/2019.php#2019-11-28-1) a few days ago. It's a fourth feature update to the PHP 7 series and it comes with a very interesting set of features which I'm going to talk about in this article. Some of are very long overdue such as unpacking arrays, typed properties and so forth. However, these all comes with some sort of caveats. Let's talk about all of the new features in details.

## Typed properties

When PHP first released it was not intended to be a typed language such as Java or TypeScript. But over last few years the support for typing things has been added although incrementally. Typed properties are a part of that enhancement. 

PHP 7.4 now supports type declarations for class properties.Take following for example:

```php
<?php
class User {
    public int $id;
    
    public function __construct()
    {
        $this->id = 10;
    }
}

$user = new User();
```

If you run the above example on PHP version <7.4 you would get the following fatal error.

```
<b>Parse error</b>:  syntax error, unexpected 'int' (T_STRING), 
expecting function (T_FUNCTION) or const (T_CONST) 
in <b>[...][...]</b> on line <b>3</b><br />
```

PHP threw the fatal error as these version don't support typed properties. Now, if you run the same code on PHP 7.4, it would work without throwing fatal error. 

Let's change the above example a little bit.

```php
<?php
class User {
    public int $id;
    
    public function __construct()
    {
        $this->id = 'php';
    }
}

$user = new User();
```

I'm now assigning a string to the property which is originally declared as integer. If you run the above example on PHP 7.4, you would get following fatal error.

```
<b>Fatal error</b>:  Uncaught TypeError: Typed property 
User::$id must be int, string used in [...][...]:7
```

This is what typed properties are capable of. Now, developers don't have to write type checks explicitly themselves. The language now does that for them. But there are some caveats in this implementation. Let's talk about it.

```php
<?php
class User {
    public int $id = '10';
    
    public function __construct()
    {
        $this->id = 10;
    }
}

$user = new User();
```

As you can see, I'm now assigning a string default value to the `$id` property which is an integer. As you would expect, PHP should throw a fatal error. And it does. It will return the following error upon running above code.

```
<b>Fatal error</b>:  Default value for property of type int 
can only be int in <b>[...][...]</b> on line <b>3</b><br />
```

But things gets weird if you change the above code a little bit.

```php
<?php
class User {
    public int $id = 10;
    
    public function __construct()
    {
        $this->id = '10';
    }
}

$user = new User();
```

I'm now assigning an integer default value (10) to `$id` which is fine. But I'm now assining a string value to `$id` in the constructor. You expect PHP to throw error in this case. But you're wrong. PHP runs this piece of code without any hassle, without any error or warning. Why? Because that might be the limitation of this implementation. PHP's might think `10` is equivalent to `"10"` when it comes to assign it from a class method. This is the caveat you need to be careful of.

## Unpacking inside arrays

If you've ever worked with JavaScript, you might be well aware of this feature. So basically, from PHP 7.4, you would be able to unpack arrays into an another array using spread operator [`...`].

Pre PHP 7.4, if you want to merge two arrays, you would need to use methods like `array_merge`. Take this for example.

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
// FRom PHP 7.4

$array = ['foo', 'bar'];

$result = ['baz', ...$array];

print_r($result);
// Array([0] => baz [1] => foo [2] => bar)
```

You can even unpack multiple arrays into a single array which is not possible using methods such as `array_merge`.

## Null coalescing assignment operator [??]

PHP has introduced a new operator called Null coalescing assignment operator (??) which can be used for the scenarios where you need to check if the variable is set or not before assigning it to an another variable. For instance, check this.

```php
<?php
// Pre PHP 7.4

$user = [
    'name' => 'Amit', 
    'job' => 'Developer'
];


if (!isset($user['job'])) {
    $user['job'] = 'Blogger'; 
}

print_r($user);
//Array([name] => Amit [job] => Developer)
```

The above code code can be reduced to following in PHP 7.4 by using null coalescing assignment operator.

```php
<?php
// From PHP 7.4

$user = [
    'name' => 'Amit'
];

$user['job'] ??= 'Blogger'; 

print_r($user);
//Array([name] => Amit [job] => Blogger)
```

As you can see, it's now matter of just one line when you need to accomplish something like above. Pretty neat, right?

## Arrow functions

This one feature is also inspired from a similar feature from JavaScript. Yes! These are arrow function. In PHP. Finally. You can now use a shorthand syntax for defining functions with implicit by-value scope binding. 

Let's understand this by taking pre and post PHP 7.4 examples.

```php
<?php
// Pre PHP 7.4

$factor = 10;

$numbers = array_map(function($value) use ($factor){
    return $value * $factor;
}, [1, 2, 3]);

print_r($numbers);
//Array([0] => 10 [1] => 20 [2] => 30)
```

As you can see,in the above example, if you want to use higher order functions such as `array_map`, there will be an anonymous function which will evaluate the values from the array passed as a second argument and if you want to use a variable which lies outside of the scope of the anonymous function, you'll need to add `use`. That's a lot of boilerplate code, right?

From PHP 7.4, above can be reduced to the following using fat arrow(=>) syntax.

```php
<?php
// From PHP 7.4

$factor = 10;

$numbers = array_map(fn($value) => $value * $factor, [1, 2, 3]);

print_r($numbers);
//Array([0] => 10 [1] => 20 [2] => 30)
```

The entire code now reduced to one line. It's now more readable and clean now.

## In Closing

Those were all the hot new features of PHP 7.4 explained with all its pros and caveats. Hope you liked the article as much as I loved writing it. Until next time! 