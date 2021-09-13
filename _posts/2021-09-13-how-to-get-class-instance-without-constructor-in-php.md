---
layout: post
title: How to get class instance without a constructor in PHP
image: /cdn/how-to-get-class-instance-without-constructor-in-php.png
categories: [PHP]
---

Have you ever stumbled upon a situation in which you need an instance of a class to create its object but with one condition and that is there is no [constructor](https://www.php.net/manual/en/language.oop5.decon.php) declared for that class?

* TOC*
{:toc}

## The problem

I did encounter this while working on one of my PHP packages called [array-utils](https://github.com/amitmerchant1990/array-utils).

So, the package is just a simple library which is a wrapper implementation of common PHP array methods. I created this package because I wanted uniformity across these different array methods. Because the PHP methods have [parameter inconsistency](http://phpsadness.com/sad/6) among them, it would be great if it could be [streamlined](/how-to-implement-wrapper-classes-php/) a little bit. And so, I started working on this package.

I wanted to design the package the same way how the Laravel [collections](https://laravel.com/docs/8.x/collections) works. Essentially, to *collect* the array and calling array methods fluently on it.

For this to be done, one thing was clear that the class (The [ArrayUtils](https://github.com/amitmerchant1990/array-utils/blob/master/src/ArrayUtils.php) class in this case) that I would create would not have a constructor. Because, if it would have a constructor, it would be absolutely necessary to create an object of this class to use it further.

I did not want that. I needed a way using which the user can simply call a class method to create a class instance.

## The solution

Turns out, you can do this by using the [static](https://www.php.net/manual/en/language.oop5.static.php) method and return the class instance from it.

Here's how I did it for my package.

```php
namespace Amitmerchant\ArrayUtils;

class ArrayUtils
{
    // code commented for brevity

    /**
     * Returns the class instance
     *
     * @return \AmitMerchant\ArrayUtils\ArrayUtils
     */
    public static function getInstance()
    {
        return new ArrayUtils();
    }

    // code commented for brevity
}
```

As you can tell, the static `getInstance` method returns the instance of the class here. This makes it to get a class instance when using the package like so.

```php
ArrayUtils::getInstance(); // returns instance of the class
```

And that's it! It's now fairly easy to call any class methods [fluently](/method-chaining-php-nutshell/) on this.

Here's a slightly expanded version of the `ArrayUtils` class.

```php
namespace Amitmerchant\ArrayUtils;

use Closure;

class ArrayUtils
{
    private $collection;

    /**
     * Returns the class instance
     *
     * @return \AmitMerchant\ArrayUtils\ArrayUtils
     */
    public static function getInstance()
    {
        return new ArrayUtils();
    }

    /**
     * Collects the input array
     *
     * @param array $collection
     * @return $this
     */
    public function collect(array $collection)
    {
        $this->collection = $collection;

        return $this;
    }

    /**
     * Wrapper method for array_map
     *
     * @param Closure $closure
     * @return mixed
     */
    public function map(Closure $closure)
    {
        return array_map($closure, $this->collection);
    }
}
```

As you can tell, the class now has two new methods called `collect` and `map`. These methods can be called fluently using the `getInstance` method like so.

```php
use Amitmerchant\ArrayUtils\ArrayUtils;

$mappedArray = ArrayUtils::getInstance()
            ->collect([1, 2, 3, 4])
            ->map(function($iteration) {
                return $iteration * 2;
            }) 
```

And that is how you can get the class instance without having the class constructor!
