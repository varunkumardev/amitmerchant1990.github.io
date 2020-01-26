---
layout: post
title: Little trick to loop through class properties in PHP
image: /cdn/little-trick-loop-through-class-properties-php.png
categories: [PHP]
---

There's this little trick in PHP that I got to know about today. The trick basically is, you can loop through all the class properties having the "public" visibility just by iterating over the class object using loop construct such as `foreach`.

Take following for example,

```php
<?php
class MyClass
{
    public $prop1 = 'property 1';
    public $prop2 = 'property 2';
    public $prop3 = 'property 3';

    protected $prop4 = 'protected property';
    private $prop5 = 'private property';
}

$object = new MyClass();

foreach($object as $key => $value) {
    print "$key => $value\n";
}
?>
```

[Running above code](http://sandbox.onlinephpfunctions.com/code/cbd1d70d9711c0e006e7fa91f42a80f1d8a4f0da) will print the following,

```
prop1 => property 1
prop2 => property 2
prop3 => property 3
```

As you can see, all we needed to do is iterate over the class object which will pickup all the "public" properties, where the "key" is name of the property and "value" is the value assigned to the property.

There's, however, one issue with the above approach. `protected` and `private` properties can not loop be iterated over. So, what you can do to tackle this is, define a method which iterates over all the properties of the class using `$this`. This time it will also pick up `protected` and `private` properties as the method is member of the class.

The above example can be re-written like so.

```php
<?php
class MyClass
{
    public $prop1 = 'property 1';
    public $prop2 = 'property 2';
    public $prop3 = 'property 3';

    protected $prop4 = 'protected property';
    private $prop5 = 'private property';

    public function iterateAllProperties()
    {
       foreach ($this as $key => $value) {
           print "$key => $value\n";
       }
    }
}

$object = new MyClass();

$object->iterateAllProperties();
?>
```

[Running above code](http://sandbox.onlinephpfunctions.com/code/3083fc24b19ed279911de0cec99defe864862a28) will print the following,

```
prop1 => property 1
prop2 => property 2
prop3 => property 3
prop4 => protected property
prop5 => private property
```

As you can see, this time around all the class properties got printed, including `protected` and `private` ones.

There's however a nicer interface called [Iterator](https://www.php.net/manual/en/class.iterator.php) which can be implemented on the class. The iterator allows the object to dictate how it will be iterated and what values will be available on each iteration using methods such as `current()`, `next()` and `key()`. I'll talk about it in some other article.

Until next time.


