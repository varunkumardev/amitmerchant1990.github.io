---
layout: post
title: Some lesser known facts of Traits in PHP
image: /cdn/lesser-known-facts-traits.png
categories: [PHP]
---

Traits in PHP is a way of re-using the code. Basically, Traits are assistive copy-paste mechanism provided by the language itself. Using Traits, developers can reduce the limitations of single inheritence based languages such as PHP. I have written [a dedicated article](/this-is-why-php-dont-have-multiple-inheritance/) about it if you want to check it out.

Here in this article, I want to talk about a few interesting things about Traits which I think is useful if you work with Traits regularly.

### Use of `use` is different for Traits

Normally, When used for namespaces, the "use" keyword treats the argument as an absolute path. So, take following for example.

```php
<?php

namespace Foo\Bar;
use Foo\TestClass;

?>
```

Here, `use` will load the entire `\Foo\TestClass` (the initial `\` is optional) class as an absolute path. But in case of Traits, the `use` keyword will treat the argument relative to the current namespace. Take following for example.

```php
<?php

namespace Amit\Module;

class SomeClass 
{
    use Foo\SomeTrait; // This will be \Amit\Module\Foo\SomeTrait
}

?>
```

In the example above, the `use` keyword will treat the Trait in question as `\Amit\Module\Foo\SomeTrait`.

### Traits can access private properties of a class

Traits have the access to the properties and methods of the class in which they are used. This includes private properties and methods as well.

```php
<?php

trait TestTrait
{
    protected function accessVar()
    {
        return $this->var;
    }
}

class ConsumerClass
{
    use TestTrait;

    private $var = 'private variable';

    public function getVar()
    {
        return $this->accessVar();
    }
}

$consumer = new ConsumerClass();
echo $consumer->getVar(); // 'private variable'

?>
```

As you can see in the example above, the method `accessVar()` is able to access the private property of the class `ConsumerClass`.

### Trait methods can be called as if they are static

Apart from calling trait methods through `$this` inside the class, these methods can also be callable as if they were defined as static methods in a regular class 

```php
<?php

trait Foo
{ 
    function bar()
    { 
        return 'baz'; 
    } 
} 

echo Foo::bar(); 

?>
```

### `__CLASS__` is more magical in traits

The magic constant `__CLASS__`, if used in a trait and if that trait is used in a class, will return the name of the class.

```php
<?php

trait sayWhere
{
    public function whereAmI() 
    {
        echo __CLASS__;
    }
}

class Hello
{
    use sayWHere;
}

class World
{
    use sayWHere;
}

$a = new Hello;
$a->whereAmI(); //Hello

$b = new World;
$b->whereAmI(); //World

?>
```



