---
layout: post
title: Immediately Invoked Function Expression in PHP
image: /cdn/iife-php.png
categories: [PHP]
---

Sometimes all you need is to define and call function at the same time and only once throughout the scope. Such functions are called as *Immediately Invoke Function Expression (IIFE)* also known as *Self-Executing Anonymous Function*. 

IIFE is a design pattern you've most probably seen in some of the other popular scripting language such as [JavaScript](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). In JavaScript, the primary reason to use an IIFE is to avoid contaminating Javascript global space with unneeded variables is to move the code into an immediately called anonymous closure.

We can use IIFE for the similar reasons in PHP as well. An IIFE can be written by wrapping a [closure](https://www.php.net/manual/en/functions.anonymous.php) by parenthesis, which will create a function expression and then including `()` at the end of our function expression, it will invoke the IIFE immediately.

So, a typical function in PHP can be defined and called like so.

```php
function doSomething()
{
    echo "Hello World!";
}

doSomething();
```

If you want to covert the above function into a IIFE in PHP 7+, you can do it like so.

```php
// For PHP 7 or higher

(function() {
    echo "Hello World!";
})();

// Hello World!
```

The function would get invoked immediately without being called. And hence the name *Immediately Invoked Function Expression*.

Another cool thing about IIFEs is you can also pass in arguments to it if you want to like so.

```php
(function($a, $b) {
    $sum = $a + $b;
    echo $sum;
})(25, 9);

// 34
```

The similar can be achieved in versions lower than PHP 7 by passing in an anonymous function in [call_user_func](https://www.php.net/manual/en/function.call-user-func.php) like so.

```php
// For versions lower than PHP 7

call_user_func(function() {
    echo "Hello World!";
});
```

And for working with arguments, here's how you can do it.

```php
call_user_func(function($a, $b) {
    $sum = $a + $b;
    echo $sum;
}, 25, 9);
```







