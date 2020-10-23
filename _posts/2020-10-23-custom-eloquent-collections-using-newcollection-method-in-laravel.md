---
layout: post
title: Custom Eloquent collections to make queries more readable in Laravel
image: /cdn/custom-eloquent-collections-using-newcollection-method-in-laravel.png
categories: [Laravel]
---

If you've worked with Laravel, you might be aware of the fact that all the multi-result sets returned by Eloquent are instances of the `Illuminate\Database\Eloquent\Collection` object. So, for instance, if you have a `User` model, you can get all the users like so.

```php
$users = App\Models\User::all();
dd($users);
```

As you can tell, the result is the instance of the `Illuminate\Database\Eloquent\Collection` object.

![](/images/eloquent_collection.png)

Now, as the Eloquent collections are essentially Laravel's [base collection](https://laravel.com/docs/8.x/collections), you can use all of the [collection methods](https://laravel.com/docs/8.x/collections#available-methods) with Eloquent collections as well. 

For instance, you can use the following Eloquent query on the `Book` model to get the recent 20 records from the `books` table like so.

```php
$books = App\Book::all()
    ->orderBy('id', 'desc')
    ->take(20);
```

Now, this looks alright. But there's a way you can make this query more readable and elegant.

## The `newCollection` method

The way this works is you have to override a `newCollection` method in your Eloquent model which will return the custom collection's object. And that custom collection would eventually be extending the Eloquent `Collection` class. Let's see how.

So, if we want to create a custom collection for the `Book` model, we can do it like so.

```php
<?php

namespace App\Models;

use App\Support\BookCollection;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /**
     * Create a new Eloquent Collection instance.
     *
     * @param  array  $models
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function newCollection(array $models = [])
    {
        return new BookCollection($models);
    }
}
```

## The Custom Collection

Here, the `App\Support\BookCollection` is just a simple class that will act as a custom collection. Here's how it would look like.

```php
<?php

namespace App\Support;

use App\Support\BookCollection;
use Illuminate\Database\Eloquent\Collection;

class BookCollection extends Collection
{
    public function fetchLatestBooks()
    {
        return $this->orderBy('id', 'desc')->take(20);
    }
}
```

As you can see, the custom collection is extending the `Illuminate\Database\Eloquent\Collection` class and now you can define your own methods with readable names over here. 

With this in place, the previous query of the `Book` model can be rewritten like so.

```php
$books = App\Book::all()->fetchLatestBooks();
```

And that's how you can make your Eloquent queries more readable and understandable!