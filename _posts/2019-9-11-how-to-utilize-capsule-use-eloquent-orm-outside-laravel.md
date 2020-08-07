---
layout: post
title: How to utilize Capsule to use Eloquent ORM outside Laravel
image: /cdn/how-to-utilize-capsule-use-eloquent-orm-outside-laravel.png
categories: [Laravel]
---

If you love the [Laravel](https://laravel.com) as a framework or more specifically its [Eloquent ORM](https://laravel.com/docs/6.0/eloquent) like I do then there's a great chance that you'd like to use this great ORM in your non-Laravel PHP apps as well. And the good news is it's rather easier than you might think. Laravel provides a standalone pacakge called Capsule which you can use in your own project. It's a full database toolkit for PHP, providing an expressive query builder, ActiveRecord style ORM, and schema builder. It currently supports MySQL, Postgres, SQL Server, and SQLite.

## Installing Eloquent Capsule

In order to use Eloquent, you just need to install it via Composer into your project using following command.

```bash
composer require "illuminate/database"
```

## Usage

Now, once installed, to actually use Eloquent, you need first create a new "Capsule" manager instance. Capsule aims to make configuring the library for usage outside of the Laravel framework as easy as possible. Here's how you can create database configuration.

```php
use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => 'mysql',
    'host'      => 'localhost',
    'database'  => 'database',
    'username'  => 'root',
    'password'  => 'password',
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
```

{% include affiliates.html %}

### Executing queries

Once the Capsule instance has been registered, you can use it like this.

```php
$users = Capsule::table('users')->where('votes', '>', 100)->get();
```

Other core methods may be accessed directly from the Capsule in the same manner as from the DB facade:

```php
$results = Capsule::select('select * from users where id = ?', [1]);
```

### Using The Schema Builder

```php
Capsule::schema()->create('users', function ($table) {
    $table->increments('id');
    $table->string('email')->unique();
    $table->timestamps();
});
```

You can even use Eloquent directly using `Illuminate\Database\Eloquent\Model` by creating table models.

```php
class User extends Illuminate\Database\Eloquent\Model {
    // code goes here
}

$users = User::where('votes', '>', 1)->get();
```

