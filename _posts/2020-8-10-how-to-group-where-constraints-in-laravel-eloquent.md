---
layout: post
title: How to group where constraints in Laravel Eloquent
image: /cdn/how-to-group-where-constraints-in-laravel-eloquent.png
categories: [Laravel]
---

When writing MySQL queries, when there are more than two where conditions, you'd want to group certain constraints/conditions to avoid unexpected behavior. For instance, check the following query.

```sql
select * from books 
        where author_name = 'JK Rowling' 
        and rating > 4 
        or genre = 'fiction';
```

Here, if we don't specifically mention how the `and` and `or` conditions should get evaluated, we might get unexpected results. So, we must explicitly determine their order and for that, we can use parenthesis in MySQL queries. 

If we want to determine if `rating > 4 or genre = 'fiction'` in the previous query should get evaluated first, we can do it using parenthesis like so.

```sql
select * from books 
        where author_name = 'JK Rowling' 
        and (rating > 4 or genre = 'fiction');
```

We can achieve a similar thing in [Eloquent](https://laravel.com/docs/7.x/eloquent) as well. For this, we can pass in `Closure` into the `where` method of Eloquent where we can further set the constraints which will be grouped. So, if we want to write the previous query using Eloquent, we can do it like so.

```php
$books = Book::where('author_name', '=', 'JK Rowling')
           ->where(function ($query) {
               $query->where('rating', '>', 4)
                     ->orWhere('genre', '=', 'fiction');
           })
           ->get();
```

As you can see here, we passed in a `Closure` to the `where` condition which will receive a query builder instance `$query` on which we can add more constraints which will be contained within the parenthesis group.