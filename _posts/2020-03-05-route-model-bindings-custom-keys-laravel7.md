---
layout: post
title: Route model bindings using custom columns in Laravel 7
image: /cdn/route-bindings.png
categories: [Laravel]
---

I've discussed about Route Model Bindings of Laravel in length in [this article previously](/laravel-route-model-bindings/). If you're not aware about the feature, I'd recommend you check that article first and come back here again.

So basically, using route model bindings, you can validate model IDs that have been injected into the route by injecting model instances directly at route level. Meaning, you don't have to explicitly validate if the `id` passed through the route is a valid model ID or not. Here's an example of how you can do it.

```php
Route::get('api/users/{user}', function (App\User $user) {
   return $user->email;
});
```

Here, Laravel will automatically resolves Eloquent models defined in routes or controller actions whose type-hinted variable names match a route segment name. So you don't have to explicitly write business logic like so.

```php
Route::get('api/users/{id}', function ($id) {
   $user = User::find($id);

   if ($user) {   
      return $user->email;
   }
});
```

But this approach was limited to use only the `id` field of the associated model. What if you want to use fields other than `id` in order to validate the model bindings? Well, the good news is starting from Laravel 7, you can do just that.

{:.you-may-like}
> You may also like: [Laravel Route Model Bindings - Implicit Vs. Explicit](/laravel-route-model-bindings/)

## Route model bindings using custom columns

To actually use a different column/field in the binding, you'd just need to pass in the column in the route parameter definition like so.

```php
Route::get('api/posts/{post:slug}', function (App\Post $post) {
    return $post->title;
});

//e.g. => http://awesomelaravelblog.com/api/posts/my-first-blog
```

Now, you can just pass in the slug for the post instead of an `id` like **http://awesomelaravelblog.com/api/posts/my-first-blog** and laravel will fetch the record based on the slug that is provided in the route.

## Useing two model binding in the route

Apart from using a single route model binding, you can also use multiple eloquent models in the route definition. You can use it for the scenarios where you need to fetch the record based the parent-child relationship. For instance, take the following example.

```php
use App\Post;
use App\User;

Route::get('api/users/{user}/posts/{post:slug}', function (User $user, Post $post) {
    return $post;
});
```

Here, the `Post` model belongs to `User` model and we're using custom key for the `Post` model. Here, Laravel will automatically scope the query to retrieve the nested model by its parent using conventions to guess the relationship name on the parent. In this case, it will be assumed that the `User` model has a relationship named `posts` which can be used to retrieve the `Post` model. i.e. Scoping has been done automatically by Laravel as you don't have mention in explicitly.
