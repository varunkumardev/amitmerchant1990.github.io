---
layout: post
title: Non-capturing exception catches in PHP 8
image: /cdn/non-capturing-exception-catches-php8.png
categories: [PHP]
---

The usual way of handling the exception is by requiring the `catch` block to catch the exception (thrown from the `try` block) to a variable like so.

```php
public function bar()
{
    try {
        throw new Exception('foo!');
    } catch (Exception $e) {
        return $e->getMessage();
    } 
}
```

Here, the exception is being catched in the `catch` block to a variable `$e`. This variable now holds any information regarding the exception such as exception message, code, trace, and so on. This is useful in logging exception information to log files or to external services.

But, in several situations, you don't need information regarding the exception. For instance, if you just want to send a predefined email to the administrator without the need of knowing how the exception has been occurred.

## Introducing non-capturing catches

For certain scenario, PHP 8 is introducing "non-capturing catches". According to [this RFC](https://wiki.php.net/rfc/non-capturing_catches), it can be possible to catch exceptions without capturing them to variables like so.

```php
try {
    throw new Exception('foo!');
} catch (Exception) {
    // send a predefined email to the administrator 
    // irrespective of the exception information
} 
```

As you can see, the exception variable is completely omitted as the exception details are become irrelevant now.

Thanks for reading! 🚀

