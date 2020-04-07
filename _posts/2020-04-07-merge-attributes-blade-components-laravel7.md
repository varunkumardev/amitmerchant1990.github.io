---
layout: post
title: Merge attributes in blade components in Laravel 7.x
image: /cdn/merge-attribute-blade.png
categories: [Laravel]
---

Blade component tags are a useful additions to the latest version of Laravel i.e. version 7. In Laravel 7, [Blade components](https://laravel.com/docs/7.x/blade#components) have been overhauled to allow tag based rendering, attribute management, component classes, inline view components, and more. 

So, for instance, if you've following blade component for instance,

```php
<!-- /resources/views/components/alert.blade.php -->

<div class="alert">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

Then the component can be rendered in another Blade view using the component's tag like so.

```php
<x-alert>
    Default slot content...
</x-alert>
```

Here, everything between `<x-alert>` tag gets _slotted in_ as `$slot` varible in the `alert.blade.php`.

Now, let's take the following case where you also pass in a class `class="mb-4"` to the component tag as well.

```php
<x-alert class="mb-4">
    Default slot content...
</x-alert>
```

You'd expect that the class "mb-4" will get merged with the "alert" and the result would be something like so.

```php
<div class="alert mb-4">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

But that's not the expected output you'd get. That's where `$attributes` property for Blade component comes into play.


## `$attributes` property

At its heart, `$attributes` carry all the attributes passed into the component tags. So, let's take the above example for instance by taking `$attributes` into it.

```php
<!-- /resources/views/components/alert.blade.php -->

<div class="alert" {% raw %}{{ $attributes }}{% endraw %}>
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

So, if pass in an another class into the tag like so.

```php
<x-alert class="mb-4">
    Default slot content...
</x-alert>
```

The result will be,

```php
<!-- /resources/views/components/alert.blade.php -->

<div class="alert" class="mb-4">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

As you can see, the classed didn't merge. Instead, Laravel tried to create it's own class attribute. So, in order to **merge the additional values to the attributes, you'd use `merge()` method on `$attributes` like so**.

```php
<!-- /resources/views/components/alert.blade.php -->

<div {% raw %}{{ $attributes->merge(['class' => 'alert']) }}{% endraw %}>
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

You'll now get the desired result. i.e. a blade component having both the `alert` and `mb-4` values merged together in class attribute.
