---
layout: post
title: Throttling submission of form in Laravel
image: /cdn/throttling-submission-of-form-in-laravel.png
categories: [Laravel]
---

You might face a scenario where you'd want to restrict a user from submitting a form within a certain time limit. i.e to prevent spamming by users. 

For instance, let's say, you want to restrict a user to submit a form only once in a timeframe of five minutes. This could be a public message board. If he/she tries to submit the form again in the next five minutes, they won't be able to. How would you do that?

Well, Laravel's custom validation rules or [rule objects](https://laravel.com/docs/8.x/validation#using-rule-objects) can be put to use here.

## Create a new rule

For this, we can create a new rule called `ThrottleSubmission` using the following command like so.

```bash
$ php artisan make:rule ThrottleSubmission
```

This will create a new class called `ThrottleSubmission` in the `app/Rules` directory. Here's in the `passes()` method, you can write the logic that will check if the user is submitting the form in 5 minutes multiple times like so.

```php
<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;
use App\User;

class ThrottleSubmission implements Rule
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return $this->user->latestMessage != null ? $this->user->latestMessage->created_at->lt(
            now()->subMinutes(5)
        ): null;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Try submitting after some time.';
    }
}
```

## Applying the rule

Once done, you can attach this rule to a validator by passing an instance of the rule object with your other validation rules on the input field like so.

```php
use App\Rules\ThrottleSubmission;

$request->validate([
    'message' => [
        'required', 
        'string', 
        new ThrottleSubmission
    ],
]);
```

And this will essentially prevent the user from submitting a message multiple times in the span of five minutes!

I learned about this slick trick from [The 6 Stages of Spam Protection](https://laracasts.com/blog/the-6-stages-of-spam) by [Jeffrey Way](https://twitter.com/jeffrey_way). 