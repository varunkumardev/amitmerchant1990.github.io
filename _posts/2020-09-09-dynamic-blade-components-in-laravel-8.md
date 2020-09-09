---
layout: post
title: Dynamic blade components in Laravel 8
image: /cdn/dynamic-blade-components-in-laravel-8.png
categories: [Laravel]
---

With the [release of Laravel 8](https://laravel.com/docs/8.x/releases), you can now render Blade components dynamically using a built-in component called `dynamic-component`.

Essentially, you can use dynamic components in scenarios where you'd want to render components based on the value of a variable. i.e in scenarios where it's not known which component to render until runtime.

## Using `dynamic-component` component

For instance, a situation where you show a certain message to the user in the `user/edit.blade.php` component based on a certain action. Let's say `success`, `error`, or `warning` on user creation. And there are three different components for these messages called `success.blade.php`, `error.blade.php`, and `warning.blade.php` respectively. 

Now, when the user creation is successful, for example, you can set a variable called `$messageComponent` from the controller like so.

```php
return view('user.edit', ['messageComponent' => 'success']);
```

And `success.blade.php` component can be rendered *"dynamically"* in `user/edit.blade.php` like so.

```php
<x-dynamic-component :component="$messageComponent" />
```

This is equivalent to using the following.

```php
<x-success />
```

As you can see, the components can be now rendered dynamically. So, if for some reason, the user creation is not successful, all you'll need to do is just set the `messageComponent` to `error` and you're done. You don't need to touch the Blade template in this case.

## Passing down the attributes

You can, of course, pass down various attributes to the underlying Blade components in `dynamic-component` like so.

```php
<x-dynamic-component :component="$messageComponent" class="text-red-900" />
```

And these attributes are available to the component's "attribute bag" like so.

```php
// error.blade.php

<div {{ $attributes }}>
    User can not be created
</div>
```

This will ultimately get rendered to the following.

```html
<div class="text-red-900">
    User can not be created
</div>
```
