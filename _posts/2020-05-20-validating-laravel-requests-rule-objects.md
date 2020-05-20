---
layout: post
title: Validating Laravel requests using rule objects
image: /cdn/laravel-rule-objects.png
categories: [Laravel]
---

Laravel comes with a multitude of ways to validate request parameters. For instance, you could use `Illuminate\Http\Request`’s validate method where you can specify all the fields that you would want to get validated inside controller’s action. You can do it like so.

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Store a new blog post.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required' | 'unique:posts' | 'max:255'],
            'body' => ['required'],
            'author.name' => ['required'],
        ]);

        // The blog post is valid...
    }
}
```

As shown above, you could specify predefined validation rules (separated by pipes [`|`]) on request parameters. Apart from these predefined validation rules, you can also define you own rules using "rule objects".

## Custome Rule Objects

Rule objects are essentially classes that implements `Illuminate\Contracts\Validation\Rule` interface. A rule object contains two methods: `passes` and `message`. The `passes` method receives the attribute value and name, and should return `true` or `false` depending on whether the attribute value is valid or not. The `message` method should return the validation error message that should be used when validation fails.

Rule objects can be generated using `make:rule` Artisan command like so.

```bash
$ php artisan make:rule Titlecase
```

This will generate a `Titlecase` rule object in `app/Rules` directory.

Here's how a typical rule object looks like.

```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Titlecase implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return ucwords($value) === $value;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Each word in :attribute must begin with a capital letter';
    }
}
```

Once the rule has been defined, you may attach it to a validator by passing an instance of the rule object with your other validation rules like so.

```php
use App\Rules\Titlecase;

$request->validate([
    'name' => ['required', 'string', new Titlecase],
]);
```

And that's how you can implement your own custom rule objects that validates requests according to your needs.

## Bonus

There are libraries such as [axiom](https://github.com/mattkingshott/axiom) that provides a set of reusable and useful Laravel validation rule objects such as `StrongPassword`, `TelephoneNumber`, `MaxWords` and so on. So, you don't need to re-invent the wheel for common validation rules!