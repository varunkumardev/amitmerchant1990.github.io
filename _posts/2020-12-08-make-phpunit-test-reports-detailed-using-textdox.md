---
layout: post
title: Make PHPUnit test reports more detailed using TextDox
image: /cdn/make-phpunit-test-reports-verbose-using-testdox.png
categories: [PHPUnit]
---

If you've ever worked with [PHPUnit](https://phpunit.de/) for TDD, you might be aware of the fact that PHPUnit's default test reports are pretty minimal and ambiguous. 

For instance, a normal test run would look something like this.

![PHPUnit Default](/images/phpunit-default.png)

As you can tell, this test report doesn't show a lot of details. i.e. you can not guess what all tests passed and which ones failed just by looking at the end result.

On the contrary, if you're using Laravel 7.x, you can use the `artisan test` [command](https://laravel.com/docs/8.x/testing#artisan-test-runner) to get results more verbose and detailed like so.

![php artisan test](/images/php-artisan-test.png)

But what if you want similar kind of test results from PHPUnit itself? Well, Meet **TextDox**.

## Make test results verbose using TextDox

[TestDox](https://phpunit.readthedocs.io/en/9.5/textui.html#testdox) is essentially a functionality that comes bundled with PHPUnit which looks at a test class and all the test method names and converts them from camel case (or snake_case) PHP names to sentences. 

Essentially, this makes the test results almost similar like we get using the `php artisan test`. 

To use TextDox, all you'll need to do is use the `--testdox` option with PHPUnit like so.

```bash
$ vendor/bin/phpunit --testdox
```

Running this would give a test report like so.

![PHPUnit with TestDox](/images/phpunit-with-testdox.png)

Looks more detailed as opposed to using PHPUnit in its default state, right?

What TestDox does under the hood is converts test method names to sentences. So, for instance, if there is a method called `testBalanceIsInitiallyZero()` (or `test_balance_is_initially_zero())`, it will convert it to "Balance is initially zero".
