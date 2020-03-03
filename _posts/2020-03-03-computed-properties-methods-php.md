---
layout: post
title: Computed properties and methods in PHP
image: /cdn/computed-props.png
categories: [PHP]
---

Sometimes, it's handy if we have an ability to create property and method names from another properties just like what [we have in JavaScript](http://es6-features.org/#ComputedPropertyNames). In another words, a property or method name which can be set and used dynamically. For instance, a normal property can be set with a statement in PHP like so.

```php
$foo = 'bar';
```

But what if you want to keep `$foo`'s name variable/dynamic? In PHP, you can do it like so.

```php
$baz = 'foo';

$$baz = 'bar';
  ^
// $foo  
```

The above snippet is just like the first example but now you have a property called `$baz` which is used to create a computed property `$$baz` which is equavalent to `$foo`. You need use two dollar sign to build a computed property as you can see.

To make the syntax more obvious and amguity-free, you surround the propery using parentheses like so.

```php
$baz = 'foo';

${$baz} = 'bar';
  ^
// $foo  
```

This is much better than using two dollar sign as it removes ambiguity in certain cases. For instance, if you write `$$a[1]` then the parser needs to know if you meant to use `$a[1]` as a variable, or if you wanted `$$a` as the variable and then the `[1]` index from that variable. Using parenthesis makes it all clear.

## Computed method names

Similar to the computed properties, you can also make use of computed method names as well. Take below for example.

```php
<?php

class Foo 
{
   public function helloWorld()
   {
      echo 'Hello world!';
   }
}

$dynamicMethod = 'helloWorld';
$a = new Foo();
$a->{$dynamicMethod}(); //prints 'Hello world!'

?>
```

## A more practical example

This can come in handy in scenarios where you have multiple methods of different types and you want to access a method based on the type available. Something like below.

```php
<?php

class Numbers 
{
   private function isInteger($number = null)
   {
      // Do something with integer numbers
   }

   private function isFloat($number = null)
   {
      // Do something with float numbers
   }

   public function processNumber($number)
   {
       $methodName = is_int($number) ? 'isInteger' : 'isFloat';

       $this->{$methodName}($number);
   }
}

?>
```

As you can see, by using computed name for calling methods, the code now looks more intuitive and it also got shorter as you'd have saved couple of lines writing an if-else condition.
