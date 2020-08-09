---
layout: post
title: Set default value for attributes in components using @props directive in Laravel
image: /cdn/how-to-set-default-value-for-attributes-anonymous-components-laravel.png
categories: [Laravel]
---

As I described [in this article](/merge-attributes-blade-components-laravel7/) on how you can create anonymous components in Laravel, we can create an `<x-alert>` component with the following content.

```php
<!-- /resources/views/components/alert.blade.php -->

<div class="alert">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

Which can be rendered in another Blade view using the component’s tag like so.

```php
<x-alert>
    Default slot content...
</x-alert>
```

Now, we can pass additional attributes to the component which will be available to the component template. For instance, if we pass in a `type` attribute to the component like so.

```php
<x-alert type="success">
    Default slot content...
</x-alert>
```

This `type` attribute can be utilized in the component template like so.

```php
<div class="{% raw %}{{ $type == 'success' ? 'class-green' : 'class-red' }}{% endraw %}">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

But sometimes, you just want to keep a default value for the attribute irrespective of passing it down from the component. So, if we don't provide any `type` attribute like so, in the previous example...

```php
<x-alert>
    Default slot content...
</x-alert>
```

It should still work. Luckily, Laravel has a solution for this as well. Enter `@props` directive.

## The `@props` directive

The `@props` directive can be used to specify a default value for the attributes at the top of the component's Blade template. So, if we want to set the `type` attribute's default value to `success`, we can do it like so.

```php
@props([
    'type' => 'success'
])

<div class="{% raw %}{{ $type == 'success' ? 'class-green' : 'class-red' }}{% endraw %}">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

Now, when we don't pass the `type` attribute to the `<x-alert>` component, it will use the default value of it which we've set in the `@props` directive and overrides its default value when we pass it down from the component. For instance, `type="error"` in our case like so.

```php
<x-alert type="error">
    Default slot content...
</x-alert>
```

The value of `$type` will be `error` in this case.