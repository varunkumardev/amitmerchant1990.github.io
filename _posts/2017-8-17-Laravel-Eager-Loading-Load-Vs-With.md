---
layout: post
title: Laravel Eager Loading - load() Vs. with()
categories: [PHP, Laravel]
---

Today, while working with one of my projects(which is built on top Laravel) I bumped into the situation where I needed to get associated model's data for one of the models. So here, I had two approaches in Laravel to accomplish this which are basically called Eager Loading:

  - [with()](https://laravel.com/docs/5.2/eloquent-relationships#eager-loading)
  - [load()](https://laravel.com/docs/5.2/eloquent-relationships#lazy-eager-loading)

Both accomplish the same end results—eager loading a related model onto the first. In fact, they both run exactly the same two queries. The key difference is that with() eager loads the related model up front, immediately after the initial query (all(), first(), or find(x), for example); when using load(), you run the initial query first, and then eager load the relation at some later point.

"Eager" here means that we're associating all the related models for a particular result set using just one query, as opposed to having to run n queries, where n is the number of items in the initial set.

{:.you-may-like}
> You may also like: [Build your own Laravel artisan commands for your project](https://www.amitmerchant.com/build-your-own-laravel-artisan-commands-for-your-project/)

## Eager loading using `with()`

If we eager load using with(), for example:

```php
$users = User::with('comments')->get();
```

if we have 5 users, the following two queries get run immediately:

```sql
select * from `users`
select * from `comments` where `comments`.`user_id` in (1, 2, 3, 4, 5)
```

...and we end up with a collection of models that have the comments attached to the user model, so we can do something like `$users->comments->first()->body`.

## "Lazy" eager loading using `load()`

In this approach, we can separate the two queries, first by getting the initial result:

```php
$users = User::all();
```
which runs:

```sql
select * from `users`
```
And later, if we decide(based on some condition) that we need the related comments for all these users, we can eager load them after the fact:

```php
if($someCondition){
  $users = $users->load('comments');
}
```
which runs the 2nd query:

```sql
select * from `comments` where `comments`.`user_id` in (1, 2, 3, 4, 5)
```

And we end up with the same result, just split into two steps. Again, we can call $users->comments->first()->body to get to the related model for any item.

## Conclusion

When to use `load()` or `with()`?

`load()` gives you the option of deciding later, based on some dynamic condition, whether or not you need to run the 2nd query.

If, however, there's no question that you'll need to access all the related items, use `with()`.
