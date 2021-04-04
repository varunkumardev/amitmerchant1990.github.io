---
layout: post
title: Quick tip - Using lightweight pagination in Laravel
image: /cdn/using-lightweight-pagination-in-laravel.png
categories: [Laravel]
fluidbox: true
---

If you want to paginate database records in Laravel, you can use the `paginate` method on the [query builder](https://laravel.com/docs/8.x/queries) or an [Eloquent](https://laravel.com/docs/8.x/eloquent) query.

* TOC
{:toc}

So, for instance, if you want to paginate a query on the `users` table for five records per page, you can use the `paginate` method like so.

```php
$users = DB::table('users')->paginate(5);
```

Here's what you get if you `dd()`'d the output.

[![](/images/paginate-laravel.png)](/images/paginate-laravel.png)

As you can tell, it has several parameters such as `total` (total number of records), `lastPage`, `currentPage`, and so on that you can use this information to show the pagination links. 

But here, if you notice, `paginate()` gives the count of a total number of records the query returns and that is a problem. This operation is sort of [expensive](https://stackoverflow.com/a/2720287/1485183) if you're paginating a large set of records. So, unless you need the total number of records and number of pages, you should use something else. Something way more light-weight.

Enter `simplePaginate()`.

## Light-weight pagination with `simplePaginate()`

As I mentioned, in the scenarios where you don't need the total number of records and number of pages, you can use the `simplePaginate()`.

What this method do differently than `paginate()` is, it doesn't count the number of records and a total number of pages the query returns. And because of that, you can optimize at the pagination front.

So, if we want to re-write the previous query using `simplePaginate()`, you can do it like so.

```php
$users = DB::table('users')->simplePaginate(5);
```

Here's what you get if you `dd()`'d the output.

[![](/images/simple-paginate-laravel.png)](/images/simple-paginate-laravel.png)

As you can tell, the returned object is stripped down with only necessary parameters such as `hasMore` (which indicates that there are records available on the next page) and `currentPage`.

## Usecases

This kind of approach is especially useful when you want to implement the *infinite scrolling* where you don't really need the total number of records or how many pages are there.

Or in the scenario where you just need to show the *"next"* and *"previous"* links leaving out showing the link of each page.