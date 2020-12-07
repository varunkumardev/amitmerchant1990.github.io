---
layout: post
title: Run or exclude certain tests in PHPUnit
image: /cdn/include-and-exclude-certain-tests-in-phpunit.png
categories: [PHPUnit]
---

If you're following the [TDD (Test Driven Development)](https://en.wikipedia.org/wiki/Test-driven_development) using [PHPUnit](https://phpunit.de/), you probably stumbled upon a scenario where you would have in need to skip/take some of the tests.

For instance, there might be an integration test that is taking a long time to run. So, you don't want to run that test every time you run the test suite. And you only want it to be run when you wish. How would you do it?

## The `@group` annotation

Well, PHPUnit has a provision for kinds of scenarios. There's a `@group` annotation available which you can use to tag certain tests to one or more groups. So, if you want to tag a test using `@group` annotation using a group named "skip", you can do it like so.

```php
<?php

namespace Tests\Feature;

class AuthenticationTest extends TestCase
{
    /**
     * @group skip
     */
    public function test_users_can_authenticate_using_the_login_screen()
    {
        
    }
}
```

You can apply the same group to as many tests that you want to keep in this group.

## Exclude groups on running test suite 

Once the tests are tagged with suitable groups, now is the time to exclude groups while running the test suite. You can do it by using the `--exclude` option and providing it the group name that you would like to be excluded like so.

```bash
$ vendor/bin/phpunit --exclude skip
```

Or if you're using Laravel 7.x, you can use the `artisan test` [command](https://laravel.com/docs/8.x/testing#artisan-test-runner) like so.

```bash
$ php artisan test --exclude skip
```

This will run all of the tests except the ones that are tagged under the "skip" group.

## Run certain groups on running a test suite 

On the contrary, you can only run certain groups using the `--group` option like so.

```bash
$ vendor/bin/phpunit --group skip
```

Or if you're using Laravel 7.x, you can use the `artisan test` command like so.

```bash
$ php artisan test --group skip
```

This will only run tests that are tagged under the "skip" group. The rest of the tests would get ignored.