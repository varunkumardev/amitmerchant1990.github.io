---
layout: post
title: Customizable artisan stubs in Laravel 7
image: /cdn/customizable-stubs.png
categories: [Laravel]
---

Artisan commands in Laravel are truly a blessing. I mean you could just create just about any files be it controllers, models, middleware, provider by knacking a command from the CLI. For instance, if you want to create a model named `Post` you could just fire the following command...

```bash
$ php artisan make:model Post
```
...And a new `Post.php` model is created in your project under `App` directory like so.

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    //
}
```

You can create a controller or any other files the similar way. You can check all the available artisan commands by firing `php artisan list` command.

Now, as you can see, each command has sort of a template associated with them in which there some variable values which gets replaced by the user provided input. For instance, in above `make:model Post` command, `Post` is assigned as a class name in the `Post.php` file. These template files are called as "Stubs".
