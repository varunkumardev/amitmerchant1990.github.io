---
layout: post
title: Getting subsets of validated data in Laravel 8.x
image: /cdn/getting-subset-of-validated-data-in-laravel-8x.png
categories: [Laravel]
---

Laravel offers mainly two ways to validate the request data inside of the controller methods. Either you can directly call the `validate` method on the `Illuminate\Http\Request` object and set the validation rules or you can create a [form request](https://laravel.com/docs/8.x/validation#form-request-validation) and type-hint the controller method with this form request class.

Here's how you can validate request data using the first method.

```php
public function store(Request $request)
{
    $validated = $request->validate([
        'title' => 'required|unique:posts',
        'body' => 'required',
    ]);

    // The book data is valid...
}
```

Now, if you want to retrieve the incoming request data that underwent validation, you can do so by calling the `validated` method on the request object like so.

```php
$validatedData = $request->validated();
```

This method returns an array of the data that was validated.

So, what if you want to only retrieve a certain set of validated data? How would you do that?

Well, a [recent PR](https://github.com/laravel/framework/pull/38366) by [Taylor Otwell](https://github.com/taylorotwell) for Laravel 8.x tries to fix this.

## Subsets of validated data

Laravel 8.x now comes with a `safe` method which you can call on a form request or validator instance. This method returns an instance of `Illuminate\Support\ValidatedInput`.

This object comprises of mainly three methods: `only`, `except`, and `all`.

- **The `only` method**

You can call this method to only retrieve certain validated fields like so.

```php
$validated = $request->safe()->only(['title', 'body']);
```

In this case, only `title` and `body` fields will be retrieved.

- **The `except` method**

```php
$validated = $request->safe()->except(['title', 'body']);
```

In this case, every validated field except the `title` and `body` fields will be retrieved.

- **The `all` method**

```php
$validated = $request->safe()->all();
```

As its name suggests, this method will retrieve all the validated fields the same way the `validated` method does.

You can call the `safe` and all these methods on form requests the same way as the validator instance as well.