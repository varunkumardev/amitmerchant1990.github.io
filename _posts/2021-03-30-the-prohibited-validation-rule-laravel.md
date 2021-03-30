---
layout: post
title: The prohibited validation rule in Laravel 8.x
image: /cdn/the-prohibited-validation-rule-laravel.png
categories: [Laravel]
---

Sometimes, all you would need is to forcefully prevent some of the fields in the request. Essentially, to *"prohibit"* or ban the fields to be mandatorily empty or not present in the request at all.

The [recent release](https://github.com/laravel/framework/releases/tag/v8.34.0) of Laravel 8.x has just got that. In comes the `prohibited` validation rule.

## The `prohibited` validation rule

The `prohibited` rule checks if the field under validation must be empty or not present or throw an error otherwise.

Quoting the PR example here, if you working on an API that involves the `license_key` field and if you're expecting this field not to be in the request, you can register the `prohibited` validation rule like so.

```php
// PUT /api/licenses/123-456
// {"name":"hello-world", "license_key":"random-key"}

$validated = $request->validate([
    'name' => 'required|max:255',
    'license_key' => 'prohibited',
]);

// Response: 422
// The license_key field is prohibited
```

As you can tell, if the `license_key` field is present in the request, it will terminate the request with the [422 HTTP response code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/422) and throw the error with the message `The license_key field is prohibited`.