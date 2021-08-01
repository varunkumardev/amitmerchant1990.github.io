---
layout: post
title: The new @class Blade directive in Laravel 8.x
image: /cdn/the-new-class-blade-directive-in-laravel-8x.png
categories: [Laravel]
---

Sometimes, the biggest sign that shows that a framework is maturing is when it has multiple ways of doing the same thing. Laravel, being one of these frameworks, is no exception.

For instance, in [Blade](https://laravel.com/docs/8.x/blade) templates, if you want to add HTML classes conditionally, you can do this by using the `class` method of the component's *"attribute bag"*. The attribute bag is available through the `$attributes` variable inside the Blade component. So, if you want to add, for instance, an error class `bg-red` conditionally, you can do it like so.

```php
<div {% raw %}{{ $attributes->class([
    'p-4', 
    'bg-red' => $hasError
]) }}{% endraw %}>
    Welp! something gone wrong.
</div>
```

As you can tell, the `bg-red` class in here is driven by the value of `$hasError`. Meaning, the `class()` would only include the `bg-red` class when the `$hasError` is `true`.

This is fine and you wouldn't mind keep on using it. But it's kind of verbose and doesn't look tidy.

And that is when a new `@class` Blade directive comes into the picture.

## The `@class` directive

In the [recent release](https://github.com/laravel/framework/releases/tag/v8.51.0) of Laravel, [this PR](https://github.com/laravel/framework/pull/38016) tries to add a `@class` Blade directive which does essentially the same thing which I mentioned previously but in a less verbose manner. So, here's how the previous example would look like using the `@class` directive like so.

```php
<div @class([
    'p-4', 
    'bg-red' => $hasError
])>
    Welp! something gone wrong.
</div>
```

As you can see, the `@class` directive does exactly the same job as the `$attributes->class()` method but in a compact manner. And since, it's a Blade directive, it gets to blend in into the Blade ecosystem pretty nicely.