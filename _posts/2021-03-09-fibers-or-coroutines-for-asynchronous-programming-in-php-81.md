---
layout: post
title: Fibers or Coroutines for asynchronous programming in PHP 8.1
image: /cdn/fibers-or-coroutines-for-asynchronous-programming-in-php-81.png
categories: [PHP]
---

There has been a scarcity of discussion in PHP land when it comes to asynchronous PHP. Maybe, PHP developers don't seem to be interested in the very idea of it.

But there's a selected set of people such as the library and framework authors who would benefit from asynchronous programming. And that's exactly why libraries like [ReactPHP](https://reactphp.org/) exists.

In [one of my articles](/using-javascript-style-promises-php/), I have explained how you can use JavaScript-style promises in PHP using ReactPHP. That's indeed interesting if you're coming from languages such as JavaScript and want to achieve similar behavior in single-threaded languages like PHP.

* TOC
{:toc}

As you can tell, this can only be achieved using third-party libraries up until now. But, it seems like things are going to change in PHP 8.1.

## Fibers or Coroutines in PHP 8.1

An RFC targetted for PHP 8.1, currently in voting phase, is proposing to add [Fibers](https://en.wikipedia.org/wiki/Fiber_(computer_science)) (or [Coroutines](https://en.wikipedia.org/wiki/Coroutine)) in PHP natively.

The RFC would add a `Fiber` class and the corresponding reflection class `ReflectionFiber` in PHP 8.1.

And essentially, 

> Fibers allow the creation of full-stack, interruptible (suspendable) functions that can be used to implement cooperative multitasking in PHP. These are also known as coroutines or green-threads.

## Creating a Fiber

`Fiber` objects can be created by passing a callable to the constructor of the `Fiber` class like so.

```php
new Fiber(callable $callback)
```

After this, you can call a set of predefined methods (`start()`, `suspend()`, and `resume()`) on this object to perform non-blocking I/O implementations.

Let's check a simple example from the RFC below.

```php
$fiber = new Fiber(function (): void {
    $value = Fiber::suspend('fiber');
    echo "Value used to resume fiber: ", $value, "\n";
});
 
$value = $fiber->start();
 
echo "Value from fiber suspending: ", $value, "\n";
 
$fiber->resume('test');

// output
/*
Value from fiber suspending: fiber
Value used to resume fiber: test
*/
```

From the above snippet, we can conclude that Fibers involves two operations:

- **Suspension of the program execution**
- **Resumption of the program execution**

### Suspend the program execution

As you can tell, we have created a fiber that immediately *suspends* with the string **"fiber"** using the `Fiber::suspend` method. This string is returned from the call to `$fiber->start()` which will print **"Value from fiber suspending: fiber"**.

### Resume the program execution

The fiber is then *resumed* with the string **"test"** using `$fiber->resume('test')`, which is returned from the call to `Fiber::suspend()`. This will print **"Value used to resume fiber: test"**.

### Throw exception from a fiber

You can also throw an exception from a fiber using `Fiber->throw()`. So, a suspended fiber can be extended by throwing an exception from `Fiber::suspend()` as well.

## In closing

So, this was your first look at Fibers/Coroutines in PHP 8.1. There are a lot of other things about Fibers that I have not discussed in this article such as how Fibers are different from [Generators](/deep-dive-into-generators-php/), the performance of fibers, support, and other things.

If you are interested, I would recommend checking out the [official RFC](https://wiki.php.net/rfc/fibers).
