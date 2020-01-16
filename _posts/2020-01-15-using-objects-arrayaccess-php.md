---
layout: post
title: Using objects as arrays (with a real world example) in PHP
image: /images/using-objects-arrays.png
categories: [PHP, Laravel]
---

Sometimes, it's convenient when you could get to access class objects as arrays. For instance, the time when one of the class properties is of type array and you want to manipulate it just like you'd do with an array without exposing it during object creation. I've included a real world example of where this could be useful, at the end of the article. So, read on!

In PHP, there is a predefined interface called [ArrayAccess](https://www.php.net/manual/en/class.arrayaccess.php) comes in PHP 5, 7 which is used to accomplish such kind of a use case. When a class implements `ArrayAccess`, they'll need to implement a few methods in order to comply with the interface and these are the methods that make the objects behave like arrays.

## The `ArrayAccess` interface

The `ArrayAccess` interface, as I said earlier, is a predefined interface in PHP with the following structure.

```php
interface ArrayAccess 
{
    abstract public offsetExists ( mixed $offset ) : bool
    abstract public offsetGet ( mixed $offset ) : mixed
    abstract public offsetSet ( mixed $offset , mixed $value ) : void
    abstract public offsetUnset ( mixed $offset ) : void
}
```

As you can see, the interface contains four abstract methods which have different purposes for them once implemented by the classes. Let's try to understand what each of these does.

### The `offsetExists` method

This method can be used to check if the particular array offset exists in the object or not and return a boolean value when using [isset()](https://www.php.net/manual/en/function.isset.php) or [empty()](https://www.php.net/manual/en/function.empty.php) on objects implementing `ArrayAccess`. For this, you can write your own implementation in the method.

Take following for example,

```php
<?php

class MyObj implements ArrayAccess 
{
    
    // excluded other methods for brevity

    public function offsetExists($var) 
    {
        var_dump(__METHOD__);
        if ($var == 'foobar') {
            return true;
        }
        return false;
    }
}
```

Now, when an offset gets called on the object like following,

```php
$myObj = new MyObj();

var_dump(isset($myObj['foobar']));
```

The `offsetExists` method will get called and excute the underlying implementation which will produce the following output.

```
string(17) "obj::offsetExists"
bool(true)
```

If the offset was something other than "foobar", it would return `bool(false)` instead.

However, if you use `isset()` on the object without any offset like below,

```php
$myObj = new MyObj();

var_dump(isset($myObj));
```

The method `offsetExists` always returns `true` irrespectively.

### The `offsetGet` method

This method returns a value for the specified offset for the object. The method also gets invoked when calling `empty()` on an offset. Here's how it works.

```php
<?php

class MyObj implements ArrayAccess 
{
    private $container = [];

    public function __construct()
    {
        $this->container = [
            'apple'   => 1,
            'banana'   => 2
        ];
    }   
    
    // excluded other methods for brevity

    public function offsetGet($offset) 
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
}
```

So now, whenever am attempt made to access the designated offset on the object, `offsetGet` method will get invoked and it will return the value for the `$container` for that offset and `null` if there doesn't exist the specified offset.

```php
$myObj = new MyObj();

var_dump($myObj['apple']); // 1
var_dump($myObj['kiwi']); // null
```

### The `offsetSet` method

The method assigns a value to the specified offset of the object. 

```php
abstract public ArrayAccess::offsetSet ( mixed $offset , mixed $value ) : void
```

The method accepts following two parameters: 

- `offset` - The offset to assign the value to.
- `value` - The value to be set to the offset.

Check the following for example.

```php
<?php
class MyObj implements ArrayAccess 
{
    private $container = [];

    public function __construct()
    {
        $this->container = [
            'apple'   => 1,
            'banana'   => 2
        ];
    }   
    
    // excluded other methods for brevity

    public function offsetGet($offset) 
    {
        return isset($this->container[$offset]) ? $this->container[$offset] : null;
    }
    
    public function offsetSet($offset, $value) 
    {
        if (is_null($offset)) {
            $this->container[] = $value;
        } else {
            $this->container[$offset] = $value;
        }
    }
}

$myObj = new MyObj;

$myObj['kiwi'] = 10;

var_dump($myObj['kiwi']); // 10

$myObj['apple'] = 5

var_dump($myObj['apple']); // 5

$myObj[] = 50; // will add a "0" offset in the array and set the value
?>
```

### The `offsetUnset` method

This method gets called when an attempt been made to [unset](https://www.php.net/manual/en/function.unset.php) an offset on the object.

```php
abstract public ArrayAccess::offsetUnset ( mixed $offset ) : void
```

The method accepts one parameter `offset` which can be used to unset an offset. Below is an example of the same.

```php
<?php
class MyObj implements ArrayAccess 
{
    private $container = [];

    public function __construct()
    {
        $this->container = [
            'apple'   => 1,
            'banana'   => 2
        ];
    }   
    
    // excluded other methods for brevity
    
    public function offsetUnset($offset) 
    {
        unset($this->container[$offset]);
    }
}

$myObj = new MyObj;

unset($myObj['apple'])

var_dump($obj['apple']); // null
?>
```

## Using `__invoke` to access entire array

In case if you want to access the entire object as an array, you can implement [`__invoke()`](https://www.amitmerchant.com/invokable-classes-php/) magic method into the class and return the entire array from it like so.

```php
<?php
class MyObj implements ArrayAccess 
{
    private $container = array();

    public function __construct()
    {
        $this->container = [
            'apple'   => 1,
            'banana'   => 2
        ];
    }   
    
    // excluded other methods for brevity
    
    public function __invoke()
    {
        return $this->container;
    }
}

$myObj = new MyObj;

var_dump($myObj);

/*
object(MyObj)#1 (1) {
  ["container":"MyObj":private]=>
  array(2) {
    ["apple"]=>
    int(1)
    ["banana"]=>
    int(2)
  }
}
*/
?>
```

## A real-world usecase

Recently, I came across this PR [#30817](https://github.com/laravel/framework/pull/30817) in the [Laravel](https://laravel.com) framework by Taylor Otwell. In this, he has implemented [ArrayAccess](https://github.com/laravel/framework/pull/30817/files#diff-49e4c7336113da8056b29274de795170R22) on both `JsonResponse` and `TestResponse` to be able to proxy directly into the response JSON without going through the `original` property.

And due to this the code that used to access the JSON payload in the response like so.

```php
$response->original['foo'];
```

Now, reduced to to the following because of implementing `ArrayAccess`.

```php
$response['foo'];
```

Pretty neat, right?
