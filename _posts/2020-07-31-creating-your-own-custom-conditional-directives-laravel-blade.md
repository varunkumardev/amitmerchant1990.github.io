---
layout: post
title: Creating your own custom conditional directives in Laravel Blade
image: /cdn/creating-your-own-custom-conditional-directives-in-laravel-blade.png
categories: [Laravel]
---

Laravel's [Blade template](https://laravel.com/docs/7.x/blade) engine is great and ever-evolving. There are some features in Blade, which if used appropriately, can make your codebase look more organized and recognizable.

One such feature that I recently came across is where one can create their own custom conditional Blade directives which you can use in your codebase. This kind of Blade directives can come in handy if you don't want to spoil your Blade views by throwing in the complex logic and to make your views much cleaner.

You can create a custom conditional directive using `Blade::if` method which you can define in the `boot` method of the `AppServiceProvider`.

So, if you want to create a custom conditional directive which checks the type of book and returns the `boolean` result accordingly, you can do it like so.

```php
use Illuminate\Support\Facades\Blade;

class AppServiceProvider extends ServiceProvider
{
    // code commented for brevity

    public function boot()
    {
        Blade::if('booktype', function ($booktype) {
            if (in_array($booktype, ['fiction', 'nonfiction'])) {
                return true;
            } 

            return false;
        });
    }
}
```

As you can see, the `Blade::if` takes two arguments. The first is the name of the custom conditional which we're going to use in the Blade template. In our case, it's `booktype`. And the second argument is the closure which performs the logic.

Once created, you can now use this custom conditional like so.

```php
@booktype('fiction')
    // This is a fiction book
@elsebooktype('nonfiction')
    // This is a non-fiction book
@else
    // This book falls into some other category
@endbooktype
```

You can even use `unless` on the conditional just like the regular `if` directive if you only want to check for the specific `booktype` like so.

```php
@unlessbooktype('nonfiction')
    // This is a non-fiction book
@endbooktype
```
