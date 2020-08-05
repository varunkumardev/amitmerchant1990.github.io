---
layout: post
title: Named slots in Blade components in Laravel 7.x
image: /cdn/named-slot-blade.png
categories: [Laravel]
---

The new [Blade components](https://laravel.com/docs/7.x/blade#components) in Laravel 7 are great. They provide an easy way of defining blade components in a Vue-like tag aliases. One of the nice features of Blade components are *slots*.

Basically, what slot allows you to do is inject dynamic content into the blade component. For instance, if we've this sidebar component...

```php
<!-- /resources/views/components/sidebar.blade.php -->

<div class="collapse list-unstyled">
    <!-- want to fill in dynmic content here -->
</div>
```

And we want to inject some dynamic content inside the `<div>`, we can achieve this using *slots* like so.

```php
<!-- /resources/views/components/sidebar.blade.php -->

<div class="collapse list-unstyled">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

And now, we can pass content to the *slot* by injecting content into the component like so.

```php
<x-sidebar>
    <ul>
        <li>Home</li>
        <li>Articles</li>
        <li>About</li>
    </ul>
</x-sidebar>
```

All the content inside the `<x-sidebar>` tags will get *slotted in* the `$slot` variable of the component where it is used.

Now, **what if we want to use multiple slots inside of the component?** Well, we can do this by using "Named" slots. And it seems like the inspiration is taken from [the similar concept](https://vuejs.org/v2/guide/components-slots.html#Named-Slots) in Vue.js.

## Named Slots

At its heart, if you want to use multiple slots inside of a component, you can use a `<x-slot>` tag and pass in a `name` attribute to it. For instance, in our previous example, if we want to insert a user avatar to the component, we can add a `<x-slot>` tag with attribute `name="avatar"` like so.

```php
<x-sidebar>
    <x-slot name="avatar">
        <img src="/image/user-avatar.png" />
    </x-slot>

    <ul>
        <li>Home</li>
        <li>Articles</li>
        <li>About</li>
    </ul>
</x-sidebar>
```

...Which can be further accessible in the component as a `$avatar` variable like so.

```php
<!-- /resources/views/components/sidebar.blade.php -->

<div>
    {% raw %}{{ $avatar }}{% endraw %}
</div>

<div class="collapse list-unstyled">
    {% raw %}{{ $slot }}{% endraw %}
</div>
```

This way you can add multiple slots into your component which can come handy in certain situations like the one I've described above.

## Dynamic Slot Names

Now, apart from declaring slot with fixed names, you can also make the name for the slots dynamic. For this, all you need to do is to prefix `:` before the `name` attribute and passing in the dynamic varibale like so.

```php
<x-slot :name="$avatar">
    <img src="/image/user-avatar.png" />
</x-slot>
```

Here, the `$avatar` would be a variable that contains a string which would act as the name of the slot.
