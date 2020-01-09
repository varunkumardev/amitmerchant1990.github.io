---
layout: post
title: Validating dependent attributes in Laravel request
image: /cdn/validating-dependent-attributes-laravel request.png
categories: [Laravel]
---

There comes a scenario in your app where there are some fields in your form that are dependent on an another field's state. 

For instance, imagine a form with an `has_doctor_appointment` checkbox, that when checked, toggles an `appointment_date` and `doctor_name` input. A user can check the checkbox, fill in a date, and then uncheck the checkbox. The date input is no longer visible, but still contains a value. So when you submit the form, even when the input is not visible, the value still gets posted.

This PR [#30835](https://github.com/laravel/framework/pull/30835) for Laravel 6.x tries to solve this issue. Quoting from the PR itself

> The goal of this PR is to make it easy to exclude attributes from a request based on the value of other attributes. This is useful when having to validate data from a form where certain checkboxes hide or show other inputs.

For this, you need to use `exclude_if` or `exclude_unless` validation rules on the dependent fields.

## `exclude_if` & `exclude_unless` rules

The `exclude_if` validation rule checks if the field under validation will be excluded from the request data returned by the `validate` and `validated` methods if the _anotherfield_ field is equal to value.

This is how you'd write the validation rule.

```php
'appointment_date' => 'exclude_if:has_appointment,false|required|date'
```

And here's full example from the PR.

For post data like below:

```
// Post data:
{"has_appointment": false, "appointment_date": "2019-12-13"}
```

The `exclude_if` will be applied like so.

```php
public function post(Request $request)
{
    $data = $request->validate([
        'has_doctor_appointment' => 'required|bool',
        'appointment_date' => 'exclude_if:has_appointment,false|required|date',
        'doctor_name' => 'exclude_if:has_appointment,false|required|string',
    ]);

    // $data === ['has_appointment' => false]

    SomeModel::create($data);
}
```

Here, in this examples, `appointment_date` and `doctor_name` will get ignored if the value of `has_doctor_appointment` is set to `false`. 

Similarly, The `exclude_unless` validation rule checks if field under validation will be excluded from the request data returned by the `validate` and `validated` methods unless `anotherfield`'s field is equal to value.
