---
layout: post
title: Multiple constructors in PHP
image: /cdn/multiple-constructors.png
categories: [PHP]
---

Constructors are a really important part of the class-based object oriented programming. Through constuctors, a newly created objects initialize properties automatically before it is usable. In PHP, a constructor is a method named `__construct()`, which the keyword `new` automatically calls after creating the object. Constructors can also accept arguments, in which case, when the `new` statement is written, you also need to send the constructor arguments for the parameters.

Here's an example of how a constructor can be defined in PHP.

```php
<?php

class Person
{
    private string $name;

    public function __construct(string $name)
    {
        $this->name = $name;
    }

    public function getName() : string
    {
        return $this->name;
    }
}
```

Now, whenever an object of class `Person` gets created like so.

```php
$person = new Person('Foo');
```

...constructor gets called, and it assigns "Foo" to `$name` which then can be accessed by calling `getName()` method.

Now, what if you want to introduce an another constructor into this class which have different sets of arguments. For instance, you want to intialize `$name` and `$age` of the person with this constructor, how would you do that?

Well, the simple answer is, You can't. At least natively. PHP lacks support for declaring multiple constructors of different numbers of parameters for a class unlike languages such as Java. So, if we declare an another constructor in the above example like so.

```php
<?php

class Person
{
    private string $name;
    private string $age;

    public function __construct(string $name)
    {
        $this->name = $name;
    }
    
    public function __construct(string $name, string $age)
    {
        $this->name = $name;
        $this->age = $age;
    }

    public function getName() : string
    {
        return $this->name;
    }
}

$person1 = new Person('Amit');

$person2 = new Person('Amit', '12');
```

PHP will throw a fatal error upon running the above code.

```
<b>Fatal error</b>:  Cannot redeclare Person::__construct() in <b>[...][...]</b> on line <b>13</b><br />
```

There's a workaround though through which one can leverage the use of multiple constructors in a class.

## The workaround

Here's a little snippet which demonstrate how to utilize multiple constructors in PHP. 

```php
<?php

class Animal
{
    public function __construct()
    {
        $arguments = func_get_args();
        $numberOfArguments = func_num_args();

        if (method_exists($this, $function = '__construct'.$numberOfArguments)) {
            call_user_func_array(array($this, $function), $arguments);
        }
    }
   
    public function __construct1($a1)
    {
        echo('__construct with 1 param called: '.$a1.PHP_EOL);
    }
   
    public function __construct2($a1, $a2)
    {
        echo('__construct with 2 params called: '.$a1.','.$a2.PHP_EOL);
    }
   
    public function __construct3($a1, $a2, $a3)
    {
        echo('__construct with 3 params called: '.$a1.','.$a2.','.$a3.PHP_EOL);
    }
}

$o = new Animal('sheep');
$o = new Animal('sheep','cat');
$o = new Animal('sheep','cat','dog');

// __construct with 1 param called: sheep
// __construct with 2 params called: sheep,cat
// __construct with 3 params called: sheep,cat,dog
```

As you can see, the class has a standard constructor and rest of the three are normal class methods. But the magic lies in the constructor itself. 

Here, we first need to count the number of arguments passed to the constructor using `func_num_args()`, and get all the assigned arguments by `func_get_args()`. Then all that's left for us to do is to call the suitable function using [call_user_func_array()](https://www.php.net/manual/en/function.call-user-func-array.php) by passing the original arguments as `call_user_func_array()`'s second argument. And voila! you've written yourself a functional multiple constructor implementation in PHP.
