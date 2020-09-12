---
layout: post
title: Class based model factories in Laravel 8
image: /cdn/class-based-model-factories-in-laravel-8.png
categories: [Laravel]
---

The model factories in Laravel are a great way of seeding some fake data in the database for testing purposes which I've discussed [in this article](/create-mass-database-records-using-model-factories-in-laravel/). While the previous implementation was great, Laravel 8 has given model factories a major overhaul and it makes them even better!

Laravel 8's model factories are class-based. Meaning, you'll have now more control over things which was not possible in previous versions.

For comparison, before Laravel 8, model factories are nothing but some PHP files. For instance, if we have a `BookFactory` for the `Book` model, it would look like so.

```php
<?php

use App\Book;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(Book::class, function (Faker $faker) {
    $type = ['fiction', 'nonfiction'];

    return [
        'name' => $faker->word,
        'author' => $faker->name,
        'type' => $type[rand(0, (count($type)-1))]
    ];
});
```

As you can tell, there isn't any class involved in this. And the syntax is also quite hard yo remember with all those Closures and *"magic"* variables like `$factory`.

Laravel 8 has attempted to solve this. Let's look at how.

## Class based model factories

In a nutshell, the model factories aren't simply PHP classes anymore. They are now full-fledged PHP classes which come with some added goodies. 

So, if you create a new factory for the `Book` model using the following Artisan command,

```bash
$ php artisan make:factory BookFactory --model=Book
```

..it would generate a `BookFactory.php` file under `database/factories` which looks like so.

```php
<?php

namespace Database\Factories;

use App\Models\Book;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BookFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Book::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            //
        ];
    }
}
```

As you can tell, the `BookFactory` is a class that extends Laravel's base factory class and define a `model` property and `definition` method.

The `definition` method is where you return need the default set of attribute values that should be applied when creating a model using the factory.

So, if we want to populate the `Book` model using the factory, we can define the `definition` method like so.

```php
public function definition()
{
    return [
        'title' => $this->faker->name,
        'author' => $this->faker->name,
        'published' => 1
    ];
}
```

## Using the factories

Once the `BookFactory` is created, it's now ready to be used. For instance, we can use it in the `database/seeders/DatabaseSeeder.php` class like so.

```php
<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Book::factory(5)->create();
    }
}
```

Notice, you can now directly use the `factory` on the model instance (`App\Models\Book` in this case) that is because when you create a model using the `php artisan make:model Book` Artisan command in Laravel 8, it generates the model which includes the new `HasFactory` trait. So, our `Book` model looks like so.

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;
}
```

Under the hood, this `HasFactory` trait returns a new factory instance for the model and because of which we can directly use the factory on models.

Now, you can seed the database using the good old `php artisan db:seed` command and it will seed the database with five new records in the `books` table.

## Using factories elsewhere in code

Because of the file-based implementation of factories, it wasn't possible to use factories in the code other than seeders. But because they are now class-based, you can use them to create factories elsewhere in the code (probably while testing) like so.

```php
use App\Models\Book;

$book = Book::factory()->make();

// Use model in tests...
```
This will create a model instance throughout your testing.

This will seed the `books` table with a record that can be used as a model instance throughout your testing.

You can create a collection by using a `count` method like so.

```php
$books = Book::factory()->count(5)->make();

// Use model in tests...
```

You can also use the `create` instead of the `make` method which will create a record in the database using Eloquent's save method like so.

```php
use App\Models\Book;

$book = Book::factory()->create();

// Use model in tests...
```

## Overriding attributes on-the-fly

Taking the advantage of these class-based factories, you can now define more methods in the class for various other things. For instance, you can now override some of the factory attributes using the base factory's `state` method.

So, in our example, if I want to change the value of `published` to `0`, we can do it like so.

```php
public function notpublished()
{
    return $this->state([
        'published' => 0,
    ]);
}
```

Now when I create a new factory by attaching the `notpublished`, it would create a `Book` model instance with `published` set to `0` like so.

```php
$book = Book::factory()->notpublished()->make();
```

Alternatively, you can use the `state` method directly on the factory like so.

```php
$book = Book::factory()->state([
    'published' => 0,
])->make();
```

## Conclusion

That was a quick overview of the new class-based factories in Laravel. There a lot of other cool things that you can do using these factories which you can refer to from its [official documentation](https://laravel.com/docs/8.x/database-testing).