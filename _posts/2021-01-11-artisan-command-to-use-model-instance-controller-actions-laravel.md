---
layout: post
title: Artisan command to use model instance in controller actions in Laravel
image: /cdn/artisan-command-to-use-model-instance-controller-actions-laravel.png
categories: [Laravel]
---

Here's a little tip about the artisan command that generates the controller. So, if you've used the `make:controller` command with the `--resource` option, it will generate controllers with create, read, update, and delete ("CRUD") actions in them. 

But here's a thing. When you generate controllers using this command, the actions such as `show`, `edit`, `update`, and `destroy` will use the `id` of the resource for updating purposes.

For instance, if you generate `UserController` using this command, it will generate the controller with the following actions like so.

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show($id)
    {
        //
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
```

As you can see, some of the methods here are using `$id` to identify the resource. 

But you might want to use a model instance instead of an `id` when using [route model binding](https://www.amitmerchant.com/laravel-route-model-bindings/). What would you do in that case?

## Using model instance in `make:controller`

If you want to use model instance instead of `id` when generating the controller, you can use the `--model` option with the `make:controller` by passing in the model name.

So, for instance, if we were to use the `User` model's instance in the previous example, we can use the following command like so.

```bash
$ php artisan make:controller UserController --resource --model User
```

This will generate the `UserController` with the following content like so.

```php
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(User $user)
    {
        //
    }

    public function edit(User $user)
    {
        //
    }

    public function update(Request $request, User $user)
    {
        //
    }

    public function destroy(User $user)
    {
        //
    }
}
```

As you can tell, the `show`, `edit`, `update`, and `destroy` methods are now being injecting with the `App\Models\User` model's instance instead of an `id`. 