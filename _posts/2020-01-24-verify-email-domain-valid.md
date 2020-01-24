---
layout: post
title: Verify if email is from a valid domain in PHP
image: /cdn/verify-email-domain-valid.png
categories: [PHP]
---

Working on an application which received user signups and let's suppose it's built on top of PHP, you want to validate that the email the user enters is valid. Sure, you'll check that the email entered is a "syntactically" valid one by using one of [these](https://www.php.net/manual/en/filter.examples.validation.php) methods.

But, what if, let's say, you also want to verify the email in question is also comes from a valid domain. i.e it's not something non-existent such as _"test@iamjusttestingforthesackoftesting.com"_ where `iamjusttestingforthesackoftesting.com` doesn't exist at all on the internet.

There's a handy little function in PHP that let's you do just that.

## The `checkdnsrr` function

What you'd do is parse domain of the email using [checkdnsrr](https://www.php.net/manual/en/function.checkdnsrr.php) like so.

```php
if (checkdnsrr(array_pop(explode("@", "foo@bar.com")), "MX")) {
     // valid email    
}
```

What happens here is, the `checkdnsrr` checks DNS records of given type ("MX" in this case) corresponding to a given email address. Here, "MX" is [a mail exchanger record](https://en.wikipedia.org/wiki/MX_record) (MX record) specifies the mail server responsible for accepting email messages on behalf of a domain name. If "bar.com" exists in the above example, the funtion will return `true`. 

You'd however need to check if the email is a valid "syntactically" before applying the above check for the domain existence because `checkdnsrr` will expect a fully qualified name in order to lookup for the MX records.