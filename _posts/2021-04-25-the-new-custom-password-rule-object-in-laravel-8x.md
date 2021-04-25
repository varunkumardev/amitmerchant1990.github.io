---
layout: post
title: The new custom password rule object in Laravel 8.x
image: /cdn/the-new-custom-password-rule-object-in-laravel-8x.png
categories: [Laravel]
---

Passwords are sensitive data and they should be handled with utmost care. The one way to ensure that the user's password remains safe is to make them enter the strong password in the first place.

If you're using Laravel, you can do this by setting up [validation rules](https://laravel.com/docs/8.x/validation) for your fields including passwords. But, there are very limited rules you can apply on a sensitive field like passwords at least for now.

* TOC
{:toc}

## The old way

For instance, if you want to apply a password validation rule which ensures it's required, should be a string, have an additional password confirmation field, and should have a length of at least 8 characters, you can add a validation rule like so.

```php
$request->validate([
    'password' => 'required|string|confirmed|min:8',
    'password_confirmation' => ['required'],
]);
```

As you can tell, these rules are obviously not sufficient to make users enter a strong password. There should be more rules which can match the modern standard and makes password forgeries less efficient.

And that's exactly what [this PR](https://github.com/laravel/framework/pull/36960) for Laravel 8.x tries to solve. Enter custom password rule object.

## The custom password rule object

[Nuno Maduro](https://github.com/nunomaduro), the Laravel ecosystem's prominent member, has added a new custom password rule object (`Illuminate\Validation\Rules\Password`) through [this PR](https://github.com/laravel/framework/pull/36960) which makes it easy to add password rules to the password fields. And on top of this, it also brings in some handy password rules.

So, if you want to tweak the previous example to use the new password rule object, you can do it like so.

```php
use Illuminate\Validation\Rules\Password;

$request->validate([
    'password' => ['required', 'string', 'confirme', Password::min(8)],
    'password_confirmation' => ['required'],
]);
```

As you can tell, there's this method called `min` using which can ensure the password should be a minimum of 8 characters.

There are a few more rules that you can apply on the password fields like so.

```php
use Illuminate\Validation\Rules\Password;

$request->validate([
    // Makes the password require at least one uppercase and one lowercase letter.
    'password' =>  ['required', 'confirmed', Password::min(8)->mixedCase()],

    // Makes the password require at least one letter.
    'password' =>  ['required', 'confirmed', Password::min(8)->letters()],

    // Makes the password require at least one number.
    'password' =>  ['required', 'confirmed', Password::min(8)->numbers()],

    // Makes the password require at least one symbol.
    'password' =>  ['required', 'confirmed', Password::min(8)->symbols()],

    // Ensures the password has not been compromised in data leaks.
    'password' =>  ['required', 'confirmed', Password::min(8)->uncompromised()],
]);
```

## Chain them all together

You can of course chain them all together like so.

```php
use Illuminate\Validation\Rules\Password;

$request->validate([
    'name' => 'required|string|max:255',
    'email' => 'required|string|email|max:255|unique:users',
    'password' => ['required', 'confirmed', Password::min(8)
            ->mixedCase()
            ->letters()
            ->numbers()
            ->symbols()
            ->uncompromised(),
    ],
]);
```