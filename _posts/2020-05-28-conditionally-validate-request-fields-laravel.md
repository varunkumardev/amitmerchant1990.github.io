---
layout: post
title: Conditionally validate request fields in Laravel
image: /cdn/conditional-validation-request.png
categories: [Laravel]
---

The usual way of validating request attributes in Laravel is by making `Illuminate\Support\Facades\Validator` instance with your static rules that never change like so.

```php
<?php

namespace App\Http\Controllers\API\v1\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Entities\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {
        
        // validate incoming request
        
        $validator = Validator::make($request->all(), [
           'email' => 'required|email|unique:users',
           'name' => 'required|string|max:50',
           'password' => 'required',
           'subscription_type' => 'required'
       ]);
        
       if ($validator->fails()) {
            Session::flash('error', $validator->messages()->first());
            return redirect()->back()->withInput();
       }
        
    }
}
```

You pass in all the request attributes along with validation rules that you want to validate, as an array to the second argument of `make` method.

Now, there might be a scenario where you might want to validate some fields only if certain conditions met. Meaning, you want to make validation conditional. How would you do this?

## Using `sometimes` method 

This can be done by using `sometimes` on the validator instance. So, for instance, in the previous example, if you want to validate the `payment_method` attribute only when the `subscription_type` is set to `premium`, you can do it like so.

```php
$validator->sometimes('payment_method', 'required', function ($input) {
    return $input->subscription_type === 'premium';
});
```

Here, the `$input` parameter passed to the [Closure](https://www.php.net/manual/en/class.closure.php) will be an instance of `Illuminate\Support\Fluent` and can be used to access your input and files.

To take it further, you can add conditional validations for several fields at once like so.

```php
$validator->sometimes(['payment_method', 'card_number'], 'required', function ($input) {
    return $input->subscription_type === 'premium';
});
```


