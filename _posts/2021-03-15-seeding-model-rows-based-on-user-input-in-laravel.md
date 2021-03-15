---
layout: post
title: Seeding model rows based on the user input in Laravel
image: /cdn/seeding-model-rows-based-on-user-input-in-laravel.png
categories: [Laravel]
fluidbox: true
---

Oftentimes, it would be handy if you could seed the number of model rows based on the user input. i.e you don't hardcode the number of rows a seeder would generate. The user will pass that number while running the seeder.

For instance, let's say, we have a `BookFactory.php` [factory](/class-based-model-factories-in-laravel-8/) under `database/factories` which looks like so.

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
            'title' => $this->faker->name,
            'author' => $this->faker->name,
            'published' => 1
        ];
    }
}
```

And now, if you want to use this factory in the `BookSeeder.php` with a user-supplied number of rows to be generated, you can do it like so.

```php
<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $count = $this->command->ask(
            'How many books you want to create?', 
            10
        );

        Book::factory((int)$count)->create();
    }
}
```

Now, when you run the seeder using `php artisan db:seed --class=BookSeeder`, you will be prompted with the question *"How many books you want to create?"*. You can then provide the number of rows you want to seed or just press enter which will generate 10 rows by default.

{:.you-may-like}
> Related ➔ [Class based model factories in Laravel 8](/class-based-model-factories-in-laravel-8/)

Here's how it would look like.

[![](/images/dynamic-seeding.png)](/images/dynamic-seeding.png)

I got to know about this trick from [this tweet](https://twitter.com/srinathdudi/status/1370413301360947202) by Srinath Reddy. Thanks mate!