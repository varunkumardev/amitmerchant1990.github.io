---
layout: post
title: Invokable classes in PHP
categories: [PHP]
---

In PHP, _Invokables_ refer to any class that may be instantiated without any constructor arguments. In other words, one should be able to create an instance solely be calling `new $className()`. To implement an invokable class, one needs to use [__invoke()](https://www.php.net/manual/en/language.oop5.magic.php#object.invoke) magic method of PHP. Before we understand how invokable exactly works, let's take a look why invokable classes even exists in PHP.

PHP does not allow the passing of function pointers like other languages. Functions are not [first class](http://en.wikipedia.org/wiki/First-class_function) in PHP. Functions being first class mainly means that you can perform operations on functions which includes being passed as an argument, returned from a function, modified, and assigned to a variable. Using `__invoke()` method PHP can accommodate pseudo-first-class functions. The method can be used to pass a class that can act as a [closure](https://www.php.net/manual/en/class.closure.php) or a [continuation](http://en.wikipedia.org/wiki/Continuation), or simply as a function that you can pass around.

## How to create an Invokable class

An invokable class can be created by implementing a `__invoke` magic method into it. Below is a simple example of an invocable class.

```php
function sparkles(Callable $func) {
  $func();
  return "fairy dust";
}
 
class Butterfly {
  public function __invoke() {
    echo "flutter";
  }
}
 
$bob = new Butterfly();
echo sparkles($bob); // flutterfairy dust
```

As you can see, class `Butterfly` is an invocalble class which can be callable by any function. In this case, we've passed the object of the class `Butterfly` directly to the `sparkle` method as an argument which is of type `Callable`. And this when `_invoke` method will be called.

## Usecases for Invokalble classes

As I discussed earlier, Invokables in PHP are designed to compensate for PHP's lack of first class function, so by creating an invokable object, you are essentially creating a first class function. An ideal scenario of invokable object is that it consists of only a constructor and an `__invoke()` method in its public interface, and it's sole responsibility is to serve a first class function.

Invokables are also useful when you don't know or don't want to know the implementation of the object you are receiving. You simply want to execute it without knowing anything about it. For instance take [this very good example](https://stackoverflow.com/a/35277180) which I found on StackOverflow.

Lets say you want to sort the following array:

```php
$arr = [
    ['key' => 3, 'value' => 10, 'weight' => 100], 
    ['key' => 5, 'value' => 10, 'weight' => 50], 
    ['key' => 2, 'value' => 3, 'weight' => 0], 
    ['key' => 4, 'value' => 2, 'weight' => 400], 
    ['key' => 1, 'value' => 9, 'weight' => 150]
];
```

Now, if we want to sort this associative array using `'value'` key, we can use [usort](http://php.net/manual/en/function.usort.php) function which allows you to sort the array using a custom function.

```php
$comparisonFn = function($a, $b) {
    return $a['value'] < $b['value'] ? -1 : ($a['value'] > $b['value'] ? 1 : 0);
};
usort($arr, $comparisonFn);

// ['key' => 4, 'value' => 2, 'weight' => 400] will be the first element, 
// ['key' => 2, 'value' => 3, 'weight' => 0] will be the second, etc
```

Now, if we want to sort the same array using the `'key'` key, you need to rewrite the function in order to do so.

```php
$comparisonFn = function($a, $b) {
    return $a['key'] < $b['key'] ? -1 : ($a['key'] > $b['key'] ? 1 : 0);
};
usort($arr, $comparisonFn);

// ['key' => 1, 'value' => 9, 'weight' => 150] will be the first element, 
// ['key' => 2, 'value' => 3, 'weight' => 0] will be the second, etc
```

As you can see the logic of the function is identical to the previous one, however we can't reuse the previous due to the necessity of sorting with a different key. This problem can be addressed with a class that encapsulates the logic of comparison in the `__invoke` method and that define the key to be used in its constructor:

```php
class Comparator {
    protected $key;

    public function __construct($key) {
            $this->key = $key;
    }

    public function __invoke($a, $b) {
            return $a[$this->key] < $b[$this->key] ? 
               -1 : ($a[$this->key] > $b[$this->key] ? 1 : 0);
    }
}
```

A Class object that implements `__invoke` it's a "callable", it can be used in any context that a function could be, so now we can simply instantiate `Comparator` objects and pass them to the usort function:

```php
usort($arr, new Comparator('key')); // sort by 'key'

usort($arr, new Comparator('value')); // sort by 'value'

usort($arr, new Comparator('weight')); // sort by 'weight'
```

## A real world example of Invokables

A practical use of Invokables we can find in Laravel where you can pass the invocable objects to Laravel's [scheduler](https://laravel.com/docs/5.8/scheduling#defining-schedules) like this.

```php
<?php
namespace App\Console;

use Illuminate\Support\Facades\DB;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(new DeleteRecentUsers)->daily();
    }
}
```

Here, `DeleteRecentUsers` can be a invokable class object which can used to delete recent users.
