---
layout: post
title: Convert request parameters to boolean in Laravel
image: /cdn/convert-request-parameters-boolean-laravel.png
categories: [Laravel]
---

Sometimes, you might want to convert some of the request parameters to boolean. For instance, take a checkbox field. Unless and until, it hasn't been checked it won't be passed through to the request. In such a case, it would be beneficial to convert such inputs to boolean.

Laravel 6.x has such a helper utility method in `Illuminate\Http\Request` called `boolean($key)` which takes the input name as a `$key` and returns an equivalent boolean value for the same. It does so by taking input using the `input()` method and filters it through [filter_var](https://www.php.net/manual/en/function.filter-var.php) and FILTER_VALIDATE_BOOLEAN`.

Here's an example on how you can use this.

```php
// checkbox
$availableForHire = Request::boolean('available_for_hire'); // true or false

// string - Yes/No
$isActive = Request::boolean('is_active');
```

Here, `available_for_hire` might be an checkbox field or a string input, passing it through the `boolean()` will return a boolean value based on the `FILTER_VALIDATE_BOOLEAN` varible filter.

The method set the default to be `false` so then an undefined variable (eg unchecked checkbox) would act as false. i.e If the key is not found in the request input, `false` is returned.

