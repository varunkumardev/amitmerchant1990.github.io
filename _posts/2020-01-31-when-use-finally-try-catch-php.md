---
layout: post
title: When to use finally in exception handling in PHP
image: /cdn/finally-exception-handling.png
categories: [PHP]
---

Exception handling is an essential part of the software development workflow. It is used to handle the runtime errors so that the normal flow of the application can be maintained.

* TOC*
{:toc}

PHP has a robust mechanism of handling exception using ["try-catch"](https://www.php.net/manual/en/language.exceptions.php) blocks where an exception can be thrown from the "try" block and the same can be caught in the "catch" block. Onwards from PHP 5.5, the language has been introduced with an another block called "finally". And in this article, I'm going to talk about the same and usecases where you should use it.

## The `finally` block

In PHP 5.5, a "finally" block can be used after or instead of catch blocks. So, essentially the code within the "finally" block will always be executed after the try and catch blocks, regardless of whether an exception has been thrown, and before normal execution resumes. 

Here's an example of how you can write a "try-catch" block:

```php
<?php

class TestException
{
    public function testing()
    {
        try {
            throw new Exception('foo!');
        } catch (Exception $e) {
            return $e->getMessage();
        } 

        echo "executing after try-catch block...\n";
    }
}

$foo = new TestException;
echo $foo->testing();

// foo!

?>
```

Here, in the above example, we've thrown an exception and returned that exception from the catch block. Thing here is, the execution won't reach "echo" statement after the "try-catch" block as we're returning the message. You can check this here in [this sandbox](http://sandbox.onlinephpfunctions.com/code/fe93d3ef12954306e9bfec6d48982445e0d5254c). That's where `finally` comes into the picture.

## Using `finally` block

Adding an additional `finally` block and moving the "echo" statement into that block in the above example will make sure that the statement will get executed even if we return from the "catch" block. Here's how you can do it.

```php
<?php

class TestException 
{
    public function testing()
    {
        try {
            throw new Exception('foo!');
        } catch (Exception $e) {
            return $e->getMessage();
        } finally {
            echo "executing in the finally block...\n";    
        }
        
    }
}

$foo = new TestException;
echo $foo->testing();

// executing in the finally block...
// foo!

?>
```

Here, even if we've returned from the "catch" block, the execution won't stop there. The code inside of the "finally" block will always be executed. 

Also note here that, the code in the "finally" block is being printed first and then the statement returned from the "catch" block. Test it here [in this sandbox](http://sandbox.onlinephpfunctions.com/code/171c8e184dc83c5029e9261ebea5110bedd803a9).

## When to actually use the `finally` block

So, the question comes here when you should use the "finally" block? 

The answer is, you can use in the scenario where you'd like to do cleanup kind of stuff such as cleaning the cache after file manipulation or in the situations where you'd like to dispatch some events even there's an exception beforehand. 

Laravel use this approach in many of its core classes where it [dispatches an event](https://github.com/laravel/framework/blob/6.x/src/Illuminate/Database/Eloquent/Concerns/HasEvents.php#L406) regardless of an exception.

```php
public static function withoutEvents(callable $callback)
{
    $dispatcher = static::getEventDispatcher();

    static::unsetEventDispatcher();

    try {
        return $callback();
    } finally {
        if ($dispatcher) {
            static::setEventDispatcher($dispatcher);
        }
    }
}
```

If you've notice in the example above, you can entirely skip the "catch" block to let the exception itself propagate up the call stack so it can be dealt with separately.

## In Closing

I hope you've learnt a thing or two in this brief article about exception handling and more specifically about the "finally" block. If you find something wrong in this article, I'd like you address it in the comments. 

Until next time!







