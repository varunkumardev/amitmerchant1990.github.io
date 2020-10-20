---
layout: post
title: Insert or update multiple records using upsert in Laravel 8.x
image: /cdn/insert-or-update-multiple-records-using-upsert-in-laravel8.png
categories: [Laravel]
---

It would be useful sometimes when you're not sure if you want to insert or update records and you'd let the system decide that. Laravel comes with one such feature that lets you do just that.

## The `upsert` method

Laravel 8.x's [query builder](https://laravel.com/docs/8.x/queries) comes packed with a method called `upsert` that will let you insert (multiple) rows that do not exist and update the rows that already exist with the new values.

So, for instance, let's say, you have a table called `books` and it contains the following records right now.

|  name | author  |  quantity |
|---|---|---|
| J.K. Rowling  |  Harry Potter | 6  |
| Ruskin Bond  | Angry River  | 10  |

As you can see, there are three fields for the books that I've shown here but in real life, there could be many. For the sack of simplicity, I've ignored the other fields.

Also, note that here, the `name` and `author` fields are unique for the `books` table.

Now, consider this scenario, where you're adding more records into the table but there might be some records that are identical when it comes to `name` and `author` fields. In such cases, you'd want to update the `quantity` field.

This is where the `upsert` method can come in handy. Here's how it works.

```php
DB::table('books')->upsert([
    [
        'name' => 'J.K. Rowling', 
        'author' => 'Harry Potter', 
        'quantity' => 15
    ],
    [
        'name' => 'Cal Newport', 
        'author' => 'Deep Work', 
        'quantity' => 20
    ]
], ['name', 'author'], ['quantity']);
```

As you can see, the `upsert` method accepts three arguments. 

- The first argument consists of the values to insert or update.
- The second argument lists the column(s) that uniquely identify records (`name` and `author` fields in our case) within the associated table.
- The third and final argument is an array of columns that should be updated if a matching record already exists in the database. We want `quantity` to be updated in our case.

In our example, the combination *"J.K. Rowling"* and *"Harry Potter"* already exists in the `books` table and so our `upsert` query would update the `books` table to the following state.

|  name | author  |  quantity |
|---|---|---|
| J.K. Rowling  |  Harry Potter | 15  |
| Ruskin Bond  | Angry River  | 10  |
| Cal Newport  | Deep Work  | 20  |

As you can see, only the `quantity` of combination *"J.K. Rowling"* and *"Harry Potter"* has been changed but the combination *"Cal Newport"* and *"Deep Work"* added as a new record into the table.