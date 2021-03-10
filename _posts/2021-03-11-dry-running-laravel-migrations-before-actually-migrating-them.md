---
layout: post
title: Dry running Laravel migrations before actually migrating them
image: /cdn/dry-running-laravel-migrations-before-actually-migrating-them.png
categories: [Laravel]
fluidbox: true
--- 

Sometimes, you might run into a situation where you want to see what all database queries will run upon running your Laravel migrations, and that too without actually running the migrations.

You can do just this by appending the `--pretend` option/flag to the `artisan migrate` command like so.

```bash
$ php artisan migrate --pretend
```

For instance, let's say, I created a migration to create a `flights` table using the `artisan make:migrate` command with the following content.

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name')->index();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
}
```

Now, when I run the `artisan migrate` command with the `--pretend` option, it will list down all the database queries that will get executed during an actual migration like so.

[![](/images/migrate-pretend.png)](/images/migrate-pretend.png)

Pretty handy, right?