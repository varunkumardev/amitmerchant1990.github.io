---
layout: post
title: Using register_shutdown_function() instead of desctructor in PHP
image: /cdn/register-shutdown-function-desctructors.png
categories: [PHP]
---

The usual and might be the most used way of cleaning the object is to use the good old [__destruct()](https://www.php.net/manual/en/language.oop5.decon.php#language.oop5.decon.destructor) magic method in PHP. The magic method proves to be good in most of the cases. But there might be some scenario where even the `__destruct()` method will fail. For instance, a scenario where your PHP script exceeds the maximum execution time, and terminates thusly. And a fatal error would occur called `Maximum execution time of 20 seconds exceeded in - on line XX`.

What would you use in such a case? This is where an alternative method [register_shutdown_function()](https://www.php.net/manual/en/function.register-shutdown-function.php) can be used.

Basically, you can register a function in `register_shutdown_function()` that gets executed after script execution finishes or [exit()](https://www.php.net/manual/en/function.exit.php) is called.

To understand this, let's take the [following example](https://www.php.net/manual/en/language.oop5.decon.php#76710) which I found on php.net.

```php
<?php

class Destruction 
{
    private $name;

    public function __construct($name) 
    {
        $this->name = $name;
        register_shutdown_function([&$this, "shutdown"]);
    }

    public function shutdown()
    {
        echo 'shutdown: '.$this->name."\n";
    }

    public function __destruct()
    {
        echo 'destruct: '.$this->name."\n";
    }
}

$a = new Destruction('a: global 1');

function test() 
{
    $b = new Destruction('b: func 1');
    $c = new Destruction('c: func 2');
}

test();

$d = new Destruction('d: global 2');

```

The output of the above code snippet would be something like below.

```
shutdown: a: global 1
shutdown: b: func 1
shutdown: c: func 2
shutdown: d: global 2
destruct: b: func 1
destruct: c: func 2
destruct: d: global 2
destruct: a: global 1
```

We can conclude following things by observing the output.

- The shutdown function is called before the destructor.
- Shutdown functions are called in there "register" order.
- Destructors are always called on script end.
- Destructors are called in order of their "context": first functions, then global objects.
- Objects in function context are deleted in order as they are set (older objects first).
- Objects in global context are deleted in reverse order (older objects last)

Also, as I mentioned previously, shutdown functions will always gets called no matter the execution time limit gets exceeded for the script. So, it will always be safe to use instead of destructors.

## A Parctical Usecase

Many PHP frameworks use this approach for special cases. For instance, Laravel uses `register_shutdown_function()` [here](https://github.com/illuminate/console/blob/master/Scheduling/CallbackEvent.php#L65) in `Illuminate\Console\Scheduling\CallbackEvent` in order to remove the mutex for the event no matter what happend to the event. They probably used `register_shutdown_function()` for the issue with desctructors I've mentioned above.

## In Closing

The `register_shutdown_function()` method is clearly not the replacement to the destructors but would turn out to be helpful in certain scenarios. Hope you liked this article and learned a thing or two.

Until next time!
