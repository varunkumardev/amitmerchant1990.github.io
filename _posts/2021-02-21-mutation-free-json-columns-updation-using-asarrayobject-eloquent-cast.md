---
layout: post
title: Mutation-free JSON column updation using AsArrayObject Eloquent cast
image: /cdn/mutation-free-json-columns-updation-using-asarrayobject-eloquent-cast.png
categories: [Laravel]
---

If you have worked with a Large scale Laravel application, there might be a great chance that you would have to use JSON columns to save some information in your tables.

* TOC
{:toc}

For instance, let's say, you want to store some metadata of users in form of a JSON. You can create a column named `metadata` in this case and cast that column from JSON to an array in the model using `array` cast like so.

```php
class User extends Model
{
    protected $casts = [
        'metadata' => 'array'
    ];
}
```

Now, every time you fetch the column using `$user->metadata`, you will get the JSON field in the array format automagically.

If you want to save the JSON back to the field, you can do it by assigning the updated array. For instance, if you have the following JSON saved into the `metadata` field...

```json
{
  name: 'Amit',
  age: 30,
  school: {
    name: 'SCET'
  }
}
```

...And if you want to update the `name` field, you can do it like so.

```php
use App\Models\User;

$user = User::find(1);

$metadata = $user->metadata;

$metadata['name'] = 'Jemini';

$user->metadata = $metadata;

$user->save();
```

The problem with this approach is you are mutating the entire array whereas you should be able to mutate the specific JSON property on the field itself like following.

```php
$user->metadata['name'] = 'Jemini';
```

Well, there's a solution for this now in the [recent release](https://github.com/laravel/framework/releases/tag/v8.28.0) of Laravel 8.x. Enter `AsArrayObject` cast.

## The `AsArrayObject` cast

Essentially, a new cast `Illuminate\Database\Eloquent\Casts\AsArrayObject` has been introduced in [this PR](https://github.com/laravel/framework/pull/36245) which tries to solve the problem I mentioned previously.

So, if you want to update the JSON property right onto the field instead of mutating the entire array, you can do it by casting the JSON field to `AsArrayObject` instead of `array` like so.

```php
use Illuminate\Database\Eloquent\Casts\AsArrayObject;

class User extends Model
{
    protected $casts = [
        'metadata' => AsArrayObject::class
    ];
}
```

With this in place, you will be able to update the JSON property right onto the Eloquent field like so.

```php
use App\Models\User;

$user = User::find(1);

$user->metadata['name'] = 'Jemini';
$user->metadata['school']['name'] = 'Kadiwala';

$user->save();
```

Pretty handy, right?

## Caveat

One important thing to note when using `AsArrayObject` as a cast is that you can not use the usual array functions (such as `array_map`) on these JSON columns since `AsArrayObject` uses PHP's [ArrayObject](https://www.php.net/manual/en/class.arrayobject.php) underneath.

So, to get around this, you can use Laravel's [toArray()](https://laravel.com/docs/8.x/collections#method-toarray) collection method if you want to access JSON in an array form like so.

```php
$metadata = $user->metadata->toArray();
```