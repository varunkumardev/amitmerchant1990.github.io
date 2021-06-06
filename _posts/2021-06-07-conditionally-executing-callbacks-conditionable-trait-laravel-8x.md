---
layout: post
title: Conditionally executing callbacks using Conditionable trait in Laravel 8.x
image: /cdn/conditionally-executing-callbacks-conditionable-trait-laravel-8x.png
categories: [Laravel]
---

If you have been working with Laravel lately, you might have used this feature called "conditional clauses" using which you will be able to run a certain callback when a condition becomes `true`.

For instance, take the example of Laravel's [query builder](https://laravel.com/docs/8.x/queries) where using the `when` method, you can query clauses to apply to a query based on another condition like so.

```php
$isAdmin = $request->input('is_admin');

$books = DB::table('books')
                ->when($isAdmin, function ($query, $role) {
                    return $query->where('is_pulished', 1);
                })
                ->get();
```

As you can tell, the `when` method accepts two arguments here. The first argument, which would typically be a `boolean` value, when it's `true`, the second argument which is a callback will get executed. If it is `false`, it won't execute the closure.

There's another method called `unless`(the opposite of the `when` method) which will execute the given callback unless the first argument given to the method evaluates to `true`.

The similar is the case with Laravel [collections](https://laravel.com/docs/8.x/collections) as well. You can use the `when` and `unless` methods on collections the similar way I have described above.

These methods are really simple but make the code concise and more readable.

So, what if you want to use a similar kind of convenience in your own custom classes? Let's say, in your services? 

Well, there's now a workaround for the same in Laravel 8.x with the introduction of the `Conditionable` trait.

## The `Conditionable` trait for custom classes

Laravel 8.x now comes packed with an `Illuminate\Support\Traits\Conditionable` trait which you can use in your classes to add `when` and `unless` methods in your custom classes.

Let's say, if you have a `BookService` class and you want to use the `Conditionable` trait in it, you can do it like so.

```php
use Illuminate\Support\Traits\Conditionable;

class BookService
{
    use Conditionable;

    function fetchCategories() {
        //
    }

    function fetchAuthors() {
        //
    }
}
```

Once added, here's you can make use of `when` and `unless` methods like so.

```php
$bookService = new BookService;

$bookService = $bookService->when(true, function ($bookService) {
    return $bookService->fetchCategories();
})->fetchAuthors();

$bookService = $bookService->unless(true, function ($bookService) {
    return $bookService->fetchCategories();
})->fetchAuthors();
```