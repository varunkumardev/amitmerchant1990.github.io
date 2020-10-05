---
layout: post
title: Extending Validator facade for custom validation rules in Laravel
image: /cdn/extending-validator-facade-for-custom-validation-rules-in-laravel.png
categories: [Laravel]
---

In one of my articles, I've explained how you can [extend class behavior using macros](https://www.amitmerchant.com/extending-class-using-macros-laravel/) in Laravel. 

* TOC
{:toc}

So for instance, if you want to add an additional method called `makeKebab` to `Illuminate\Support\Collection` class in Laravel, you can use a static `macro` method like so.

```php
//App\Providers\AppServiceProvider

namespace App\Providers;

use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class AppServiceProvider
{
    public function boot()
    {
        Collection::macro('makeKebab', function () {
            return $this->map(function ($value) {
                return Str::kebab($value);
            });
        });
    }
}
```

A similar concept can be used to add custom validation rules to the `Validator` facade by using the `extend` method.

## The `extend` method

Laravel provides an `extend` method which can be used on the `Validator` facade. The `extend` method is used to register custom validation rules which are available through the entire application.

So, if we want to add a validation rule to check if each word in the attribute must begin with a capital letter, we can extend it like so.

```php
//App\Providers\AppServiceProvider

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Validator::extend('titlecase', function ($attribute, $value, $parameters, $validator) {
            return ucwords($value) === $value;
        });
    }
}
```

Here, the first parameter of `extend` is the name of the custom validation rule and the second parameter is the Closure which receives four arguments: the name of the `$attribute` being validated, the `$value` of the attribute, an array of `$parameters` passed to the rule, and the `Validator` instance.

## Using the validation rule

Once defined, the rule can be used while validating request attribute like so.

```php
Validator::make($data, [
    'title' => [
        'required',
        'titlecase',
    ],
]);
```

## Validation message for the rule

You can set a validation message for the custom validation rule using two ways:

- Using an inline custom message array

In this, you would need to define a validation message within a Request inside `messages` like so.

```php
public function messages()
{
    return [
        'titlecase' => 'Each word in :attribute must begin with a capital letter'
    ];
}
```

- By adding an entry globally in the validation language file such as `resources/lang/en/validation.php` like so.

```php
return [
    'titlecase' => 'Each word in :attribute must begin with a capital letter',
    ...
    ...
    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],
];
```