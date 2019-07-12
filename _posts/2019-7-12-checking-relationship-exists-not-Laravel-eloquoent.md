---
layout: post
title: Checking if the relationship exists on the model or not in Laravel Eloquoent
categories: [Laravel]
---

If you want to check if the eloquoent model has certain relationship or not while querying upon it, you can do this by two approaches in the Laravel Eloquent.

* By using `has` method to check the existence of the relationship
* By using `doesntHave` method to check the existence of the relationship

We'll take a look at both of the approaches one by one.

## Check existence of relationships

Let's say you want to fetch only users which have atleast posted a single photo. You can do this by by passing the name of the relationship to the `has` method on the `User` model.

```php
// Retrieve all users that have at least one photo uploaded...
$users = App\User::has('photos')->get();
```

You can further filter down the results by providing an operator and count into the `has` method. For instance, in above example, if you want to retrieve only users which have uploaded 5 or more photos, you can do this like this.

```php
$users = App\User::has('photos', '>=', 5)->get();
```

You can also attach more relationships using "dot" notation for checking existence of nested relationships. For instance, if you want to retrieve users with photos with comments on it, you can do this like this.

```php
// Retrieve all users that have at least one photo with comments on it...
$users = App\User::has('photos.comments')->get();
```

If you want to also add conditions on the relationship itself, you can do this by `whereHas` or `orWhereHas` methods in which you can pass in the condition using a `Closure` to the second parameter of the `whereHas` or `orWhereHas` method.

For, instance if you want to fetch all the users which are from "Arizona" state, you can do this like this.

```php
use Illuminate\Database\Eloquent\Builder;

// Retrieve users with at least one address containing state like arizona%...
$users = App\User::whereHas('addresses', function (Builder $query) {
    $query->where('state', 'like', 'arizona%');
})->get();
```

## Check absense of relationships

Similar to checking the existence of the relationship on the certain model, you can check the absence of certain relationships and fetch the results accordingly. For this purpose, Eloquoent provides `doesntHave` and `orDoesntHave` methods.

For instance in the previous example if you want to fetch only users which don't have a single photo. You can do this by by passing the name of the relationship to the `doesntHave` method on the `User` model.

```php
// Retrieve all users that don't have a photo...
$users = App\User::doesntHave('photos')->get();
```

If you want to filterise the query by applying the contarints on the relationship, you can further use `whereDoesntHave` and `orWhereDoesntHave` methods to put "where" conditions on your `doesntHave` queries. 

For, instance if you want to fetch all the users which are not from "Arizona" state, you can do this like this.

```php
use Illuminate\Database\Eloquent\Builder;

// Retrieve users with at least one address containing state like arizona%...
$users = App\User::whereDoesntHave('addresses', function (Builder $query) {
    $query->where('state', 'like', 'arizona%');
})->get();
```

You can also use "dot" notion to make a nested relationship and execute the query against it. For instance, if you want to retrive users whose photos have comment authors which are active. You can do this like following:

```php
use Illuminate\Database\Eloquent\Builder;

$users = App\User::whereDoesntHave('photos.comments.author', function (Builder $query) {
    $query->where('active', 0);
})->get();
```



