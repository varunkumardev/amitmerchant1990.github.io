---
layout: post
title: Check for the application environment in Laravel views
image: /cdn/check-application-environment-laravel-view-templates.png
categories: [Laravel]
---

Often you'd come across a scenario where you'd like to check the application environment and based on that you'd like to render things.

For instance, you'd like to check if the environment application currently running in is "production", you can verify it in the view like so.

```php
@if(App::environment('production'))
    {% raw %}{{-- in "production" environment --}}{% endraw %}
@endif
```

Now, this is alright that we're leveraging the `App::environment` method to identify the environment of the application and it even works fine but it's kind of verbose as you can see.

To fix this, Laravel provided some in-built Blade directives to check for the environment. Here's how the previous code would translate to if we use Laravel's in-built Blade directive.

```php
@production
    {% raw %}{{-- in "production" environment --}}{% endraw %}
@endproduction
```

As you can see, it's pretty straight-forward now. All you need to do is mention the environment name like `@environment` and end it like `@endenvironment` so.

If you want to check for multiple environments in a single conditional, you can do it like so.

```php
@env('local', 'staging')
    {% raw %}{{-- in "local" or "staging" environment --}}{% endraw %}
@endenv
```