---
layout: post
title: Add additional attributes in request in Laravel
image: /cdn/add-additional-attributes-request.png
categories: [Laravel]
---

Sometimes you might want to attach additional attributes to the original request that has made to the Laravel application. For instance, you want to put your own check in the middleware to see if the user is permitted to access the page or not, and pass that "check" by attaching it as an additional attribute to the request.

This way you can also prevent duplicating code, where you would repeat the same code (or query) in the middleware and in the controller. For instance take following. If I want to only allow users which has `is_active` set to "1", I would write the following query twice like so.

- **SomeUserMiddleware.php**

```php
public function handle($request, Closure $next)
{
    //get the user Id
    $userId = $request->route('id');

    //find the user
    $user = User::where('is_active', 1)->where('id', $userId)->first();

    //check if the logged in user exists
    if (!$user->exists()) {
        //redirect them if they don't exist
        return redirect()->route('redirectRoute');
    }

    return $next($request);
}
```

- **UserController.php**

```php
public function view($id)
{
    $user = User::where('is_active', 1)->where('id', $userId)->first();
    return view('users.view', ['page' => $user]);
}
```

As you can see, the query to fetch the user has been written twice. This is simply the waste of rsources, right?

## The `merge` method

You can re-factor the above code by calling `merge` method on the request and passing the `$user` from the middleware like so.

- **SomeUserMiddleware.php**

```php
public function handle($request, Closure $next)
{
    //get the user Id
    $userId = $request->route('id');

    //find the user
    $user = User::where('is_active', 1)->where('id', $userId)->first();

    //check if the logged in user exists
    if (!$user->exists()) {
        //redirect them if they don't exist
        return redirect()->route('redirectRoute');
    }

    //pass the attribute onto the request
    $request->merge(['user' => $user]);

    return $next($request);
}
```

And retrieve, let's say, in a controller like so.

- **UserController.php**

```php
public function view($id)
{
    return view('users.view', ['user' => $request->user]);
}
```

The benefit of above is now we only need to execute the single query and pass it onto the request which can be re-utilized elsewhere (in our case a controller). And apart from this, this will also make controllers "thin" as an added bonus!