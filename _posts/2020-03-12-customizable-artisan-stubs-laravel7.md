---
layout: post
title: Customizable artisan stubs in Laravel 7
image: /cdn/customizable-stubs.png
categories: [Laravel]
---

Artisan commands in Laravel are truly a blessing. I mean you could create just about any files be it controllers, models, middleware, provider by knocking a simple command from the CLI. For instance, if you want to create a model named `Post` you could just fire the following command...

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

Now, as you can see, each command has sort of a template associated with them in which there some variable values which gets replaced by the user provided input. For instance, in above `make:model Post` command, `Post` is assigned as a class name in the `Post.php` file. These template files are called "Stubs".

A typical Model stub file (`model.stub`) looks like the following.

```php
<?php

namespace {{ namespace }};

use Illuminate\Database\Eloquent\Model;

class {{ class }} extends Model
{
    //
}
```

Here, `{{ namespace }}` and `{{ class }}` are variables in the stub files which gets replaced based on the user input in the corresponding artisan command. This is, as you can see, pretty basic skeleton for a model class. What if you want more content in the same, ready to be consumed by you and your team. A template just for your needs? This is where Laravel 7's stub customizations comes into play.

## Customizable Artisan Stubs

Laravel 7 comes with an additional Artisan command `stub:publish` which can be used to publish the most common stubs for customization. So, what you do is run the command,

```bash
$ php artisan stub:publish
```

And the command will create a directory called `stubs` at the root of your folder which will contain all the published stubs. The directory contents looks like so.

![](/images/stubs-folder.png)

As you can see, we have all the stub files that Laravel used to utilize in Artisan commands. Now, all you have to do is make changes to this stub files according to your needs and it will be reflected when you generate their corresponding classes using Artisan `make` commands. 

So, for instance, you want to customize the model stub to have `$guarded` and `$fillable` properties pre-populated and maybe you also want to use `SoftDeletes` on your models, you would customize `stubs/model.stub` like so.

```php
<?php

namespace {{ namespace }};

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class {{ class }} extends Model
{
    use SoftDeletes;

    protected $guarded = [];

    protected $fillable = [];

    //    
}
```

And the next time you use `make:model` command, you'll have all the models which is based on the above template.

Pretty neat, right?
