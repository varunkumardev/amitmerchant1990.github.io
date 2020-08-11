---
layout: post
title: Accessing private methods and properties outside of class using reflection in PHP
image: /cdn/accessing-private-methods-outside-of-class-using-reflection-php.png
categories: [PHP]
---

 In PHP, the visibility of a property, a method, or a constant can be defined by prefixing the declaration using keywords `public`, `protected` or `private`. Here is how these modifiers work.

- `public` - Class members declared public can be accessed everywhere.
- `protected` - Class members declared protected can be accessed only within the class itself and by inheriting and parent classes.
- `private` - Class members declared as private may only be accessed by the class that defines the member.

Generally, the class members are declared `private` for certain reasons. One is to implement encapsulation which makes the class members available inside of the originating class only i.e. to hide data from the user of the class and can only be modified using public getter and setter methods.

But in certain scenarios, you might want to access these private members outside of the class. There's a workaround in PHP using which you can do so. First, let's check how to access private methods.

## Accessing `private` methods

First, check the following class.

```php
class Foo 
{
    private function privateMethod() {
        return 'Hogwarts';
    }
}
```

As you can see, the `privateMethod` is a private method and if we want to access it outside of the class like so, we would get a fatal error.

```php
$foo = new Foo;
$foo->privateMethod(); 
// Fatal error:  Uncaught Error: Call to private method 
// Foo::privateMethod() from context
```

To get around this, we can use in-built [ReflectionMethod](https://www.php.net/manual/en/class.reflectionmethod.php) class which can give information about the method. And also can "reverse engineer" things for us.

```php
$reflectionMethod = new ReflectionMethod('Foo', 'privateMethod');
$reflectionMethod->setAccessible(true);

echo $reflectionMethod->invoke(new Foo); // Hogwarts
```

As you can see, the `ReflectionMethod` constructor accepts two parameters: *"Class name"* and *"Method name"*. In our case, we passed in `Foo` as the class name and `privateMethod` method name as we want to access this method.

Next, we'll need to make the private method accessible outside of the class. For this, we have used the `setAccessible` method on the object and set it to `true`. This will allow `protected` and `private` methods to be invoked.

And lastly, we can invoke the method using the `invoke` method on the object and passing in the object of the class (`new Foo`) as its only parameter for which we're accessing the method.

And that is how you can access a private method of the class.

## Accessing `private` properties

Similarly, you can also access the `private` properties of the class but the only distinction here is instead of using `ReflectionMethod`, we'd need to used [ReflectionProperty](https://www.php.net/manual/en/class.reflectionproperty.php) class like so.

```php
class Foo 
{
    private $privateProperty = 'Harry Potter!';    
}

$method = new ReflectionProperty('Foo', 'privateProperty');
$method->setAccessible(true);

echo $method->getValue(new Foo); // Harry Potter!
```

As you can see, in this case, we've used `getValue` to fetch the value of the property.