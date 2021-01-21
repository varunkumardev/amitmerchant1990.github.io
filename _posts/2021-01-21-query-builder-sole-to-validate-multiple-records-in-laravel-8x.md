---
layout: post
title: The query builder's sole() method to validate multiple records in Laravel 8.x
image: /cdn/eloquent-sole-to-validate-multiple-records-in-laravel-8x.png
categories: [Laravel]
---

With the latest release minor of Laravel, i.e. v8.23.0, a really interesting method has been introduced in Laravel's query builder for situation where you want to get the only record for the matching criteria. But if there are more records for this criteria, there should be some sort of exception.

The method is called `sole()`. Let's understand it in detail.

## The `sole()` method

The `sole()` is been proposed [in this](https://github.com/laravel/framework/pull/35869) PR by [Mohamed Said](https://github.com/themsaid). The method is inpired by Django's [get()](https://docs.djangoproject.com/en/3.1/topics/db/queries/#retrieving-a-single-object-with-get) and Rails' [.sole and find_sole_by](https://github.com/rails/rails/blob/master/activerecord/CHANGELOG.md) methods.

Here's how this method works. 

```php
try {
    $order = Order::where('invoice_number', '#INV12345')->sole();
} catch (Illuminate\Database\Eloquent\ModelNotFoundException $e) {
    // order not found
} catch (Illuminate\Database\Eloquent\MultipleRecordsFoundException $e) {
    // multiple records found
}
```

As you can tell, the query builder's `sole()` method will return the only record that matches the criteria, if no records found a `NoRecordsFoundException` will be thrown, and if multiple records were found a `MultipleRecordsFoundException` will be thrown.

This method can proved to be useful when you need a single row, but also want to assert that there aren't multiple rows matching the condition; especially when database constraints aren't enough (such as [Unique indexes](https://dev.mysql.com/doc/refman/8.0/en/create-index.html#create-index-unique) in MySQL) or are impractical.

