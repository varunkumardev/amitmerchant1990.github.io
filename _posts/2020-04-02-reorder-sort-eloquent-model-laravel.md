---
layout: post
title: Reordering the sort order on queries in Laravel 7.x
image: /cdn/reorder-eloquent-query.png
categories: [Laravel]
---

Often times, there comes a sceanrio where you'd want to alter the column through which you've setup your query to be sorted from. So, for instance, you've the following query.

```php
$query = DB::table('users')->orderBy('name');
```

Now, all you want to do is remove the sort order or just change the column for the sorting to something else, what would you do?

## `reorder()` sort method

Well, this [#PR](https://github.com/laravel/framework/pull/32186) in Laravel 7.x actually tries to solve this particular problem. So, the PR adds a method called `reorder()` to the query builder of the Laravel, which when attached to the query without any arguments, it will remove all the existing orders from the query. So, in order to remove the order from the above query, you'd do like so.

```php
$unorderedUsers = $query->reorder()->get();
```

This will remove all the orders or if you want to change the sort column, for instance by `email` column, you'd do like so.

```php
$usersOrderedByEmail = $query->reorder('email', 'desc')->get();
```

Here, you'll need to pass the sort direction as the second argument where `asc` is the default sort direction if you don't pass any.

## `reorder` on relationships

Now, another advantage this method brings is, you can also alter the sort order of the relationship on which it is defined. Quoting the example from the #PR itself, if we have `Account` model which has relationship with `User` like so.

```php
class Account extends Model
{
    public function users()
    {
        return $this->hasMany(User::class)->orderBy('name');
    }
}
```

And if you want to change the sort order on the relationship, you can use `order` in this case as well. Here's an example on how you can do the same.

```php
// Remove the existing "name" order, and then order by "email".
$users = $account->users()->reorder('email');
```

Or you could also apply a [scope](https://www.amitmerchant.com/laravel-eloquent-global-local-scope/) like so.

```php
// Remove the existing "name" order, and then order using a scope
$users = $account->users()->reorder()->orderBySomeScope();
```