---
layout: post
title: Aliasing polymorphic types in Laravel's Eloquent
image: /cdn/aliasing-polymorphic-types-in-laravel-eloquent.png
categories: [Laravel]
---

When working with [polymorphic relationships](https://laravel.com/docs/8.x/eloquent-relationships#polymorphic-relationships) in Laravel's Eloquent, it's important to specify the "type" of the related model. You can do this by using `morphOne`, `morphMany`, and `morphToMany` methods. 

* TOC
{:toc}

Let's say we have `Book` and `Author` models which shares a polymorphic relationship with `Rating` model. And the table structure of all these would look like following.

```
books
    id - integer
    name - string

authors
    id - integer
    name - string

ratings
    id - integer
    url - string
    ratingable_id - integer
    ratingable_type - string
```

Here, as you might know, the `ratingable_type` column of the `ratings` table detrmines which "type" of parent model to return when accessing the `ratingable` relation.

So, for instance, if you want to specify this into the `Book` model, you can do it using `morphOne` method like so.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    /**
     * Get the parent ratingable model (book or author).
     */
    public function ratingable()
    {
        return $this->morphTo();
    }
}

class Book extends Model
{
    /**
     * Get the book's rating.
     */
    public function rating()
    {
        return $this->morphOne(Rating::class, 'ratingable');
    }
}
```

Now, as you can see, we specified the "type" in the `morphOne` as the fully qualified class name (FQCN) of the model. But, we can do this the better way using something called "map morphing".

## Aliasing Polymorphich Types

There's this another way in which you can "map" these FQCNs to strings using `Illuminate\Database\Eloquent\Relations\Relation`'s `morphMap` method. You can register this in the `boot` method of your `App\Providers\AppServiceProvider` class.

So, if you want to map/alias the `App\Models\Rating` to `rating` string, you can do it like so.

```php
<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Relations\Relation;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Relation::morphMap([
            'rating' => 'App\Models\Rating',
        ]);
    }
}
```

And now you can specify `rating` as the polymorphic type instead of giving the FQCN like so.

```php
class Book extends Model
{
    /**
     * Get the book's rating.
     */
    public function rating()
    {
        return $this->morphOne('rating', 'ratingable');
    }
}
```

## Benefits of using aliasing types

The main benefit of aliasing polymorphic type is...

- You get a central place where you can manage your polymorphic types.
- As you are aliasing models as strings from a central place, it's now safe for you to rename the models. By doing so, you don't have to go over places just to rename the classes.

## Caution when using "map morph"

It's important to note here that, when you start using "map morph" in your existing application, every morphable `*_type` (`ratingable_type` in our example) column value in your database that still contains a fully-qualified class will need to be converted to its "map" name.