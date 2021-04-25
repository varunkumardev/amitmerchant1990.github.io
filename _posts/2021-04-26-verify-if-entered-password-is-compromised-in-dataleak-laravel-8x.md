---
layout: post
title: Verify if entered password is compromised in data leak or not in Laravel 8.x
image: /cdn/verify-if-entered-password-is-compromised-in-dataleak-laravel-8x.png
categories: [Laravel]
fluidbox: true
---

In my [previous articles](/the-new-custom-password-rule-object-in-laravel-8x/), I talked about the new custom password rule object which brings in the ability to easily add various validation rules to the password field.

There are a lot of interesting rules that this object is introducing but the one that really caught my eyes is *the password rule that validates if the entered password is exposed in a data leak in the past or not*.

* TOC
{:toc}

## Using the `uncompromised()` rule

First, check how you can add this password rule to your password field.

```php
use Illuminate\Validation\Rules\Password;

$request->validate([
    // Ensures the password has not been compromised in data leaks.
    'password' =>  ['required', 'confirmed', Password::uncompromised()],
]);
```

As you can tell, you'd need to use the `uncompromised()` method of the `Illuminate\Validation\Rules\Password` object which will determine if the entered password is leaked in one of the data leaks in past or not.

If the password has been leaked somewhere, it will give you the following validation message.

[![](/images/laravel-password-data-leak-validation.jpeg)](/images/laravel-password-data-leak-validation.jpeg)

That's pretty neat, right?

## Behind the scenes

I tried to dig this feature to know how it all works and found that it is using [have i been pwned? API](https://haveibeenpwned.com/API/v3) under the hood in [Illuminate\Validation\NotPwnedVerifier](https://github.com/laravel/framework/blob/c5d57a7dbad9e3495e2e569d1aad17bb797ee969/src/Illuminate/Validation/NotPwnedVerifier.php) which checks if the password is previously leaked or not like so.

```php
/**
 * Search by the given hash prefix and returns all occurrences of leaked passwords.
 *
 * @param  string  $hashPrefix
 * @return \Illuminate\Support\Collection
 */
protected function search($hashPrefix)
{
    try {
        $response = $this->factory->withHeaders([
            'Add-Padding' => true,
        ])->get(
            'https://api.pwnedpasswords.com/range/'.$hashPrefix
        );
    } catch (Exception $e) {
        report($e);
    }

    $body = (isset($response) && $response->successful())
        ? $response->body()
        : '';

    return Str::of($body)->trim()->explode("\n")->filter(function ($line) {
        return Str::contains($line, ':');
    });
}
```