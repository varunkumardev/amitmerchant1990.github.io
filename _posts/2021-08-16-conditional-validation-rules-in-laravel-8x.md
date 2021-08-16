---
layout: post
title: Conditional validation rules in Laravel 8.x
image: /cdn/conditional-validation-rules-in-laravel-8x.png
categories: [Laravel]
---

Sometimes, you might end up in a situation where you would want to add certain validation rules for fields. 

Now, Laravel already has a [somtimes](https://www.amitmerchant.com/conditionally-validate-request-fields-laravel/) method in the `Illuminate\Support\Facades\Validator` facade that can be used to only add certain validation rules if the Closure passed to it returns `true`. But that's quite verbose if you ask me.

There was a need for something simple and that's where a when method is added to the `Illuminate\Validation\Rule` class.

## The `Rule::when()` method

As I said, Laravel 8.x now [comes](https://github.com/laravel/framework/pull/38361) with a handy `Rule::when()` method that can be used to conditionally add certain validation rules on the specified fields.

Here's how it works.

```php
use Illuminate\Validation\Rule;

request()->validate([
    'name' => 'required|string|min:6',
    'password' => ['required', 'string', Rule::when(true, ['min:5', 'confirmed'])],
]);
```

As you can tell, the `Rule::when()` method accepts two parameters. The parameter is where pass in the conditional based on which you want to include the validation rules if it's truthy.

The second parameter is an array of all the validation rules that need to be added based on the conditional.

In my opinion, this is quite concise and elegant than using the `sometimes()` method I mentioned previously.