---
layout: post
title: Method overloading in PHP
image: /cdn/method-overloading-in-php.png
categories: [PHP]
---

Although the official PHP website's documentation has a dedicated section on ["Overloading"](https://www.php.net/manual/en/language.oop5.overloading.php), it's not truly called overloading by any means.

Because if you check [the definition](https://en.wikipedia.org/wiki/Function_overloading) of function overloading or method overloading, it goes like this.

> Function overloading or method overloading is the ability to create multiple functions of the same name with different implementations.

In simple words, *"Overloading means declaring a function multiple times with a different set of parameters"*. So, if you would like to explain this in terms of a simple example, it would look like so.

```php
function foo($a) 
{
    return $a;
}

function foo($a, $b) 
{
    return $a + $b;
}

echo foo(5); // should print "5"
echo foo(5, 2); // Should prints "7"
```

Here's a thing. **There is no way of doing this in PHP as of now.** But, there's a workaround using which you can implement overloading in PHP. Read on!

## Method or function overloading

If you want to implement Method or function overloading in PHP to some degree, you can achieve it by using the [__call](https://www.php.net/manual/en/language.oop5.overloading.php#object.call) magic method.

So, if we want to make the previous example work, here's how we can do it using the `__call` magic method.

```php
<?php

class A 
{  
    public function __call($member, $arguments) 
    {
        $numberOfArguments = count($arguments);

        if (method_exists($this, $function = $member.$numberOfArguments)) {
            call_user_func_array(array($this, $function), $arguments);
        }
    }
  
    private function foo1 ($argument1)
    {
        return $argument1;
    }

    private function foo2 ($argument1, $argument2)
    {
        return $argument1 + $argument2;
    }
}

$class = new A;
echo $class->foo(2); // echoes '2'
echo $class->foo(5, 7); // echoes '12'
```

As you can see, when calling the method `foo` on the class `A`'s object, it would trigger the `__call` magic method as the method named `foo` doesn't exist.

And that's where the magic starts. As you can tell, we have two different methods called `foo1` and `foo2` for handling one argument and two arguments respectively. 

The `__call` magic method calls these methods by using [call_user_func_array](https://www.php.net/manual/en/function.call-user-func-array.php) function based on the number of arguments when calling the `foo` method. And that's how you can achieve method/function overloading in PHP.

Of course, the use of this is somewhat tricky. As you'll have to manually validate things and makes sure something doesn't break.

However, using this general principle and optionally building forth on other suggestions a *form* of overloading is possible, provided you have some strict naming conventions in your functions to call them accurately. Like we have `foo1` and `foo2` in our example.

## In closing

It would of course become a lot easier once PHP would let us declare the same member function several times but with different arguments without doing all sorts of manual work.

Let's see if future versions of PHP would implement this behavior natively.

Until next time!