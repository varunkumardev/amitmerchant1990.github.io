---
layout: post
title: Get all the changes applied by model updates in Laravel
image: /cdn/get-all-the-changes-applied-by-model-updates-laravel.png
categories: [Laravel]
---

Here's a little tip I get to know about [Eloquent](https://laravel.com/docs/8.x/eloquent) through [this tweet](https://twitter.com/ninjaparade/status/1417325268146917380) by ninjaparade.

So, oftentimes, it would be useful if you want to have all the changes applied by the model update operation. Probably in situations when you want to show the user which all the things have been affected once they update something.

Turns out, we can get these changes by using the [getChanges()](https://laravel.com/api/5.8/Illuminate/Database/Eloquent/Model.html#method_getChanges) method on the model instance. Take the following for example.

```php
$book = Book::find(1);

$book->update([
    'title' => 'Maharani'
    'author' => 'Ruskin Bond'
]);
```

Now, if we want to know which all fields have been affected by the update, we can call the `getChanges()` method like so.

```php
$book->getChanges();

/*
[
    'title' => 'Maharani',
    'author' => 'Ruskin Bond',
    'updated_at' => '2021-07-20 00:08:25'
]
*/
```

As you can tell, we can get the fields that are updated including the `updated_at` field.

Pretty handy I must say!