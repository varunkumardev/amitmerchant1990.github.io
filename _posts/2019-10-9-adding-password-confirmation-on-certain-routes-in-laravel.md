---
layout: post
title: Adding password confirmation on certain routes in Laravel
categories: [Laravel]
---

If you've used some well creafted web application, such as [GitHub](https://github.com) for instance, you might've noticed that upon saving sensitive information such as settings or payment details, it asks for the password confirmation before performing the action. This adds the extra layer of security layer and certainly a nice-to-have feature.

In Laravel v6.2.0, the very feature has been shipping [in-built](https://github.com/laravel/laravel/pull/5129). You can add password confirmation on any route by attaching a `password.confirm` middleware to it and it will take care of rest of the things. i.e navigating the user to re-confirm their password. You locate the middleware over here: `src/Illuminate/Auth/Middleware/RequirePassword.php`

Below is how you can do this.

```php
Route::get('/payment-details', 'PaymentsController@save')->middleware('password.confirm');
```

Now, If you attempt to access the route, you will be prompted to confirm your password.

The middleware also take care of the fact that user don't have to re-confirm their password for the certain period of time by storing a timestamp in the user's session that lasts for three hours by default when he/she reconfirms first time. You can also customize this duration using a new `password_timeout` configuration option in the in the `auth.php` config file like below. 

```php
return [
    //... code commented for brevity

    /*
    |--------------------------------------------------------------------------
    | Password Confirmation Timeout
    |--------------------------------------------------------------------------
    |
    | Here you may specify the amount of seconds before a password confirmation
    | is timed out and the user's prompted to give their password again on the
    | confirmation screen. By default the timeout lasts for three hours.
    |
    */
    'password_timeout' => 10800,
];
```

All this can go on to work because Laravel has added a new `password` [validation rule](https://github.com/laravel/framework/pull/30214) which can be used to validate the given password with the user's actual password. You can also pass a guard name as a parameter.


