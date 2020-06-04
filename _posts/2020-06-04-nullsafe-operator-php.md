---
layout: post
title: This nullsafe operator could come in PHP 8
image: /cdn/nullsafe-operator-php.png
categories: [PHP]
---

Have you ever wanted a feature where you would  only want to call a method or fetch a property on the result of an expression if it is not `null`? So, for instance, check the following code.

```php
$country =  null;
 
if ($session !== null) {
    $user = $session->user;
 
    if ($user !== null) {
        $address = $user->getAddress();
 
        if ($address !== null) {
            $country = $address->country;
        }
    }
}
```

The code looks for the `null` check for each property before going onto the [next chain](/method-chaining-php-nutshell/) of the property/method. It do so by storing the intermediate values in the buffer properties in each condition and go on for the `null` check on the next property in the chain.

This is quite a hassle right now as you can observe. This scenario can be improved if [this RFC](https://wiki.php.net/rfc/nullsafe_operator) gets approved.

## The nullsafe operator

Essentially, the RFC proposes a new operator called nullsafe operator `?->` with full short-circuiting.

How this works is when the left hand side of the operator evaluates to null the execution of the entire chain will stop and evalute to null. When it is not null it will behave exactly like the normal `->` operator.

So, the above code can be rewritten with nullsafe operator like so.

```php
$country = $session?->user?->getAddress()?->country;
```

If the `$session` is null, it won't try fetch the `user`. It will rather return `null` and terminates the chain right at that point. 

The same would be applied to all the properties/methods in the chain like so. This is called as short-circuiting which means when the evaluation of one element in the chain fails the execution of the entire chain is aborted and the entire chain evaluates to null.  

This is really convient as it effectively reduces the number of line of the code and in addition to that there would be less chance of the human error as you don't check for the `null` checks explicitly.

The feature is scheduled to be included in PHP 8 if this RFC gets approved.

Fingers crossed!
