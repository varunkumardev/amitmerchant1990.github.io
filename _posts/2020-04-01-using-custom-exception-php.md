---
layout: post
title: Benefits of using custom exceptions in PHP
image: /cdn/using-custom-exception-php.png
categories: [PHP]
---

Exceptions are really useful when you want to handle some situations which can not be handled gracefully otherwise. So, using exceptions, you can handle certain sceanrios by showing a nice error message. Take the following example for instance.

```php
<?php
    function inverse($x) 
    {
        if (!$x) {
            throw new Exception('Division by zero.');
        }
        return 1/$x;
    }

    try {
        echo inverse(5) . "\n";
        echo inverse(0) . "\n";
    } catch (Exception $e) {
        echo 'Caught exception: ',  $e->getMessage(), "\n";
    }
?>
```

As you can see here, we're checking the condition where if the method `inverse` receives the `0` as the argument, you'd terminate the execution by throwing an exception using the built-in [Exception](https://www.php.net/manual/en/class.exception.php) class which then can be catched under the `catch` block as shown in the example above.

Let's take a slightly more real world example. Let's say we have an `Email` class which can be used to send email to the users. Here's how the class looks like.

```php
namespace AmitMerchant\App;

class Email
{
    // code commented for brevity

    public function send()
    {
        if (!$user->isAllowed) {
            throw new Exception('Can not send email to ' . $user->name);
        }

        if ($this->isLimitExceeded()) {
            throw new Exception('Email sending limit has been exceeded.');
        }

        if ($this->toEmail == null) {
            throw new Exception('Invalid email has been provided.');
        }

        $mail = new PHPMailer(true);
        //code commented for brevity
        $mail->send();
    }
}

?>
```

As you can see in the example above, we have an `Email` class which is used to send emails to the users. Now, there are a few checks which needs to be validated before the application could send the email. 

We're throwing exceptions on each of the condition which doesn't match the certain criteria. The above code works perfectly fine. However, we have all the exception texts inside the method which makes the method look cluttered and heavy than it actually is. This can be optimized using custom exception classes. Let's see how.

## Custom Exception Classes

We can extract all the above exceptions to their respective classes and use those instead of throwing the exception directly from the class like what we've done in the above example. We can do  by creating a regular class which then extends the natiave [Exception](https://www.php.net/manual/en/class.exception.php) class. So, the following exception...

```php
throw new Exception('Can not send email to this user.');
```

Can be extracted to the following class,

```php
<?php

namespace AmitMerchant\App\Exceptions;

class IsUser extends Exception
{
    public static function notAllowed($user)
    {
        return new static('Can not send email to this user.' . $user->name);
    }
}

?>
```

We've created a regular class `IsUser` which extends the native `Exception` class. Next, the class have the static method `notAllowed` which upon called will return the exception as shown in the code.

This, then can be used in our example like so.

```php
namespace AmitMerchant\App;

use AmitMerchant\App\Exceptions\IsUser;

class Email
{
    // code commented for brevity

    public function send()
    {
        if (!$user->isAllowed) {
            throw IsUser::notAllowed($user)
        }

        // code commented for brevity

        $mail = new PHPMailer(true);
        // code commented for brevity
        $mail->send();
    }
}

?>
```

As you can see, the code is now less cluttered and the code doesn't contain the exception messages here and there. Also, if you name your exception classes and methods well, you could just guess the purpose of the exceptions by just looking at these names.

Also, notice that I've kept the exception under the `AmitMerchant\App\Exception` namespace, which means all the exception will be there in the central place. In our case, it's `application/app/exceptions`. So, the full example with the other exceptions would look like so.

```php
namespace AmitMerchant\App;

use AmitMerchant\App\Exceptions\IsUser;

class Email
{
    // code commented for brevity

    public function send()
    {
        if (!$user->isAllowed) {
            throw IsUser::notAllowed($user)
        }

        if ($this->isLimitExceeded()) {
            throw SendEmail::limitExceeded();
        }

        if ($this->toEmail == null) {
            throw IsUser::toEmailNull();
        }

        $mail = new PHPMailer(true);
        // code commented for brevity
        $mail->send();
    }
}

?>
```

Looks concise and beautiful, right?

## In Closing

I learned this idea of using the custom class from one of the screencasts by [Freek Van der Herten](https://freek.dev) in the [Mailcoach](https://mailcoach.app)'s video series and I really want to implement this handy little trick to all of my projects now onwards.