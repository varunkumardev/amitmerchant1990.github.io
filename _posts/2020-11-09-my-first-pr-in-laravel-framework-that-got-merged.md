---
layout: post
title: My first PR in laravel/framework that got merged!
image: /cdn/my-first-pr-in-laravel-framework-that-got-merged.png
categories: [Laravel]
---

Alright! So, my [first PR](https://github.com/laravel/framework/pull/35154) in [laravel/framework](https://github.com/laravel/framework) has got merged and I'm on cloud 9 right now. I'm not kidding!

After being in the community for a while, I have always wanted to contribute to Laravel's codebase in some way but I have never got something worthwhile. But today, while going through the changelog of the recent Laravel [release](https://github.com/laravel/framework/releases/tag/v8.12.0), I stumbled upon [this PR](https://github.com/laravel/framework/pull/34997) which got my attention and inspired me to do my first contribution. 
I'm going to share my entire experience with this process. From forking the laravel/framework repo to get my PR merged!

* TOC
{:toc}

## The inspiration

I was looking into this [PR](https://github.com/laravel/framework/pull/34997) and it's about adding route regex registration methods `whereNumber` and `whereAlpha` which can be used to constrain the format of route parameters in a simple way.

So, if you want your route parameter to be always numeric, you can use `whereNumber` like so.

```php
Route::get('authors/{author}')->whereNumber('author');
```

Similarly, the `whereAlpha` method can be used to constrain the route parameter to be always of alphabetic form. 

```php
Route::get('authors/{book}')->whereAlpha('book');
```

This is where the idea striked!

## The idea

Looking at both of these methods, a potential method was missing according to me. And that method is the one that can be used to constrain the route parameter to be always of alphanumeric form.

I've decided to add this method. And decided to call it `whereAlphaNumeric`.

## The implementation

I first forked the [laravel/framework](https://github.com/laravel/framework) repository into my GitHub account and then cloned it into my machine. 

Next, I created a feature branch called `feature-alphanumeric-route-regex` from `8.x`.

The rest of the things were easy. I added the following method into `src/Illuminate/Routing/CreatesRegularExpressionRouteConstraints.php` which is the meat of the functionality.

```php
/**
* Specify that the given route parameters must be alphanumeric.
*
* @param  array|string  $parameters
* @return $this
*/
public function whereAlphaNumeric($parameters)
{
    return $this->assignExpressionToParameters($parameters, '[a-zA-Z0-9]+');
}
```

As you can see, under the hood, this method uses [regex](https://en.wikipedia.org/wiki/Regular_expression) to ensure the given route parameters is alphanumeric.

I have also added relevant tests for the same in this file: `tests/Routing/RouteRegistrarTest.php`

```php
public function testWhereAlphaNumericRegistration()
{
    $wheres = ['1a2b3c' => '[a-zA-Z0-9]+'];

    $this->router->get('/{foo}')->whereAlphaNumeric(['1a2b3c']);

    /** @var \Illuminate\Routing\Route $route */
    foreach ($this->router->getRoutes() as $route) {
        $this->assertEquals($wheres, $route->wheres);
    }
}
```

Once tests ran successfully, it was time to open the PR!

## Raising the Pull Request

So, after ensuring nothing is breaking, I have raised [this PR](https://github.com/laravel/framework/pull/35154) to be merged in the `8.x` branch keeping finger crossed.

## The PR got merged

It was after 2 hours after raising the PR, I got a mail that my PR has got merged! And you will not believe but it was like a dream true for me because not many get successful in getting their PR merged. But I was the lucky one. Thanks, Taylor!

And now I've become a small part of this monolithic framework! 😌