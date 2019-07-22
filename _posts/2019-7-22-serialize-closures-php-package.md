---
layout: post
title: Serialize Closures in PHP using this neat package
categories: [Laravel]
---

It's widely known that PHP can't serialize [closures](https://www.php.net/manual/en/functions.anonymous.php) directly. If you try to serialize a closure in PHP, you'll get a fatal error. Take below example.

```php
<?php
$func = function () {
    echo 'hello!';
};
$func(); // prints "hello!"

$result = serialize($func);  
// Fatal error: Uncaught exception 'Exception' 
// with message 'Serialization of 'Closure' is not allowed' 
?>
```

There are many ways to overcome this issue. One of which you can write your own implementation by using [_sleep()](http://php.net/manual/en/language.oop5.magic.php#object.sleep) and [_wakeup()](http://php.net/manual/en/language.oop5.magic.php#object.sleep) magic methods along with the use of PHP Reflection in order to serialize anonymous functions. 

The other and more holistic way is to use some of the readymade PHP packages to accomplish this. [This package](https://github.com/opis/closure) from [Opis](https://opis.io/) is my favorite among all. It's a library that aims to overcome PHP’s limitations regarding closure serialization by providing a wrapper that will make all closures serializable.

From their documentation here are library's key features:

* Serialize any closure
* Serialize arbitrary objects
* Doesn’t use eval for closure serialization or unserialization
* Works with any PHP version that has support for closures
* Supports PHP 7.0 syntax
* Handles all variables referenced/imported in use() and automatically wraps all referenced/imported closures for proper serialization
* Handles recursive closures
* Handles magic constants like `__FILE__`, `__DIR__`, `__LINE__`, `__NAMESPACE__`, `__CLASS__`, `__TRAIT__`, `__METHOD__` and `__FUNCTION__`.
* Automatically resolves all class names, function names and constant names used inside the closure
* Track closure’s residing source by using the #trackme directive
* Simple and very fast parser
* Any error or exception, that might occur when executing an unserialized closure, can be caught and treated properly
* You can serialize/unserialize any closure unlimited times, even those previously unserialized (this is possible because eval() is not used for unserialization)
* Handles static closures
* Supports cryptographically signed closures
* Provides a reflector that can give you information about the serialized closure
* Provides an analyzer for SuperClosure library
* Automatically detects when the scope and/or the bound object of a closure needs to be serialized in order for the closure to work after deserialization

To serialize a closure, you can wrap the one into an `Opis\Closure\SerializableClosure` object, then serialize the wrapper object using the standard serialize.

```php
use Opis\Closure\SerializableClosure;

// Recursive factorial closure
$factorial = function ($n) use (&$factorial) {
  return $n <= 1 ? 1 : $factorial($n - 1) * $n;
};

// Wrap the closure
$wrapper = new SerializableClosure($factorial);
// Now it can be serialized
$serialized = serialize($wrapper);
```

## Unserializing closures

Closure unserialization is done using the standard [unserialize](https://www.php.net/manual/en/function.unserialize.php) function. Once the wrapper was unserialized, you can directly invoke the wrapper, or you can extract the serialized closure by calling the getClosure method.

```php
// Unserialize the closure
$wrapper = unserialize($serialized);

// You can directly invoke the wrapper...
echo $wrapper(5); //> 120

// Or, the recommended way, extract the closure object
$closure = $wrapper->getClosure();

echo $closure(5); //> 120
```

Due to the fact that `Opis Closure` doesn’t use [eval](https://www.php.net/manual/en/function.eval.php) in the serialization-deserialization process, all closures can be serialized and unserialized an infinite amount of times.

```php
// Once again, but this time using the previously unserialized closure
$wrapper = new SerializableClosure($closure);
$serialized = serialize($wrapper);
$wrapper = unserialize($serialized);
$closure = $wrapper->getClosure();

// Now watch this...
echo $closure(5); //> 120
// It worked!
```

You can also serialize/unserialize arbitrary objects using this package. You can do this by using `Opis\Closure\serialize` function.


```php
use function Opis\Closure\{serialize as s, unserialize as u}

class A
{
    private $closure;
    
    public function __construct()
    {
        $this->closure = function(){
            echo 'It works!';
        };
    }
    
    public function test()
    {
        //call closure
        ($this->closure)();
    }
}

$obj = new A();

u(s($obj))->test(); // It works
```

You can install the package from the composer.

```bash 
composer require opis/closure
```

Or you could directly reference it into your `composer.json` file as a dependency

```json
{
    "require": {
        "opis/closure": "^3.1"
    }
}
```

You can read more about the package on the [official documentation](https://opis.io/closure).