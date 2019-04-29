---
layout: post
title: Laravel Route Model Bindings - Implicit Vs. Explicit Binding
categories: [Laravel]
---

There's this neat feature in Laravel where you can validate model IDs that have been injected into the route by injecting model instances directly at route level.

For instance, instead of injecting `post_id` in the following URL, say, `'api/posts/{post_id}'` and writing all the business logic ourselves just to validate the model IDs, we can directly pass the entire `Post` model instance that matches the given ID in the URL. 

You can achieve this using two methods: `Implicit Model Binding` and `Explicit Model Binding`.

## Implicit Binding

In this method, you'd directly inject model instance into the route or controller actions whose time-hinted variable names match a route segment name. Let's write above example using this approach.

```php
Route::get('api/posts/{post}', function (App\Post $post) {
    return $post->title;
});

//e.g. => http://myblog.com/api/posts/12
```

Notice here, we passed `$post` variable to the route's closure which is type-hinted as the `App\Post` eloquoent model and the variable name matches the `{post}` URI segment of the URL. Laravel will then automatically inject the model instance that has an `id` field matching the corresponding value from the request URI. If a matching model instance is not found in the database, a 404 HTTP response will automatically be generated for that particular route.

## Explicit Binding

As the name suggests, this approach requires you to register an "explicit" binding by using the router's `model` method to specify the class for a given parameter. You can achieve this by defining your explicit model bindings in the `boot` method of the `RouteServiceProvider` class. Let's now rewrite the above example using this approach.

```php
public function boot()
{
    parent::boot();

    Route::model('post', App\Post::class);
}
```

Now, define a route that contains a `post` param:

```php
Route::get('posts/{post}', function (App\Post $post) {
    // Do something here
});
```

Since we have bound all `{post}` parameters to the `App\Post` model, a `User` instance will be injected into the route. So, for example, a request to `posts/7` will inject the `Post` instance from the database which has an `id` of 7. If it doesn't find the matching model instance for the specified `id`, it will generate a 404 response automatically.

The difference between implicit and explicit binding is you can additionally specify a customized logic into the `boot` method of the `RouteServiceProvider` class while doing explicit binding. Let's check the following code:

```php
public function boot()
{
    parent::boot();

    Route::bind('post', function ($value) {
        return App\Post::where('slug', $value)->first() ?? abort(404);
    });
}

//e.g. => http://myblog.com/posts/new-in-laravel
```

As you can see here, We've used `Route::bind` method to write our own logic. Now, instead of checking the 'post' with the model's `id` field, Eloquoent will now check for the customised logic we've written into the `Closure` of the `bind` method. Here, for the above example URL, `new-in-laravel` will be passed as `$value` to the `Closure` which will then be check against the specified custom condition and return the result accordingly.

Alternatively, you may override the `resolveRouteBinding` method on your Eloquent model. 

```php
// App\Post model

public function resolveRouteBinding($value)
{
    return $this->where('slug', $value)->first() ?? abort(404);
}
```






