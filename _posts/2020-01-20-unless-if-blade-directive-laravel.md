---
layout: post
title: Check unless condition in custom if blade directive in Laravel
image: /cdn/unless-if-blade-directive-laravel.png
categories: [Laravel]
---

Laravel's `Blade::if()` method already comes with the following directives in order to check various conditions in blade template files.

- `@custom` - Checks positive if condition
- `@elsecustom` - Checks elseif condition
- `@endcustom` - endif condition

So, for instance, if you want to check conditions on the `env` variables in the blade file, you could do like so.

```
@env('local')
    // The application is in the local environment...
@elseenv('testing')
    // The application is in the testing environment...
@else
    // The application is not in the local or testing environment...
@endenv
```

Now, if you want to check if something should render only when the application in the "production" mode, you couuld do like so.

```
@env('production')
@else
    // The application is not in the production environment...
@endenv
```

As you can see, here in this case, we're using an empty `if` condition which is quite an overkill.

## The `unless` condition

This PR, [#30492](https://github.com/laravel/framework/pull/30492), registers an additional `@unlesscustom` directive (a negative if condition) to deal with such kind of a situation.

So, using this, the previous example would simplified to the following.

```
@unlessenv('production')
    // The application is not in the production environment...
@endenv
```

This looks much cleaner than the previous approach. isn't it? 

You can start using this feature starting from Laravel version 6.x.