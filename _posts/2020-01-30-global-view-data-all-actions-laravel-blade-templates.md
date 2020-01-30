---
layout: post
title: Global view data for all actions in Laravel Blade
image: /cdn/global-view-data-laravel-blade-templates.png
categories: [Laravel]
---

Laravel's [Blade](https://laravel.com/docs/5.8/blade) is a great templating system that blends with Laravel's ecosystem very well. Setting some data to the view is a breeze and rendering those data into the template is ever so easy. For instance, if you would like to share some data from a controller's action to a view, you'd do like so.

```php
class HomeController extends BaseController
{
    public function __construct()
    {
       parent::__construct();
    }

    public function index()
    {
      return view('greetings', ['name' => 'Victoria']);
    }
}
```

In the above example, a `$name` variable is available to be rendered in a blade template `greetings.blade.php`. You can pass around a lot more data similarly but you got the idea.

But what if you want to share some data across all controller actions? Read on to find out.

## Using `View::share` for sharing data

In order to share common data across each view of the controller's actions, you can use the view facade's `share` method by establishing a key-value pair like so which can then be accessible across all the actions' views.

```php
class HomeController extends BaseController
{
    public function __construct()
    {
       parent::__construct();

       View::share( 'common_data', ['name'=>'Amit Merchant','address'=>'India'] );
    }

    public function index()
    {
      return view('index');
    }

    public function show()
    {
      return view('show');
    }
}
```

As you can see here, the `$common_data` will be available to each view, both `index.blade.php` and `show.blade.php` alike.

This is useful in scenarios for example there are menu items which are common across a particular set of actions and you don't want to repeat the code over and over again.


