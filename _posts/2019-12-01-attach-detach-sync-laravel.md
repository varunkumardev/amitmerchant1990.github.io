---
layout: post
title: Attach, detach and sync many-to-many relationships in Laravel
image: /cdn/attach-detach-sync-laravel.png
categories: [Laravel]
---

There exists four types of relationship associated between models/entities. And they are: **One To One**, **One To Many**, **Many To One** and **Many To Many**. We're specifically going to talk about Many To Many relationship and most importantly attach, detach and sync helper methods that are provided in Laravel in this article.

## What is a "Many to Many" relationship?

> A relationship betweeen two entities is called as Many to Many when multiple records in a table are associated with multiple records in another table. 

For inatance, let's say we have two entities **Books** and **Authors**. If you carefully observe this relationship, you'll notice that a book can have multiple authors and an author has written multiple books. In this case, you have many books related to many authors. 

So, If we want to define a relationship between these two entities we'll need three database tables: `books`, `authors` and a special table called as a "pivot table" `book_author`. The  `book_author` table is derived from the alphabetical order of the related model names, and contains the `book_id` and `author_id` columns.

And here's how we can define the relationship in the Laravel model using `belongsToMany` method:

```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    /**
     * The authors that belong to the book.
     */
    public function authors()
    {
        return $this->belongsToMany('App\Author');
    }
}
```

We can define the model for `Author` the same way. Now once the relationship is defined, you can access the books all authors like so:

```php
$book = App\Book::find(1);

foreach ($user->authors as $author) {
    dd($author->name);
}
```

Now, back to the intended topic of this article. Laravel comes with handy little helper methods called `attach`, `detach` and `sync` in order add certain amount of convenience for Many To Many relationships. Let's review them one by one.

## The `attach` method

This specific helper method can be used to attach a certain entity record to the other entity record in the pivot table. For instance, in above example, if we want to attach an author to a book, we can use `attach` method which will insert a related record in the pivot/intermediate table like so:

```php
$book = App\Book::find(1);

$book->authors()->attach($authorId);
```

You can also pass additional data in `attach` method if you want to update additional fields in the intermediate table.

```php
$book = App\Book::find(1);

$book->authors()->attach($authorId, ['best_seller' => true]);
```

## The `detach` method

Similarly, if you want to remove a certain entity relationship from the pivot table, you can use `detach` method. For instance, if you want to remove a certain author from a book you can do like so.

```php
$book->authors()->detach($authorId);
```

Or you can pass multiple IDs as an array.

```php
$book->authors()->detach([4, 5, 8]);
```

Of if you want to remove all authors from a book, use `detach` without passing any arguments.

```php
$book->authors()->detach();
```

## The `sync` method

The `sync` helper method is like intersection of `attach` and `detach` method. So, basically what this method can be used to establish Many to many association. That is it will only keep the association which are passed to it as an array like so.

```php
$book->authors()->sync([5, 2, 10]);
```

Any IDs that are not in the given array will be removed from the pivot table. So, only association that will be left in the pivot table would be `[5, 2, 10]` in the above example for books and authors.

If you do not want to detach existing IDs, you may use the `syncWithoutDetaching` method:

```php
$book->authors()->syncWithoutDetaching([1, 2, 3]);
```