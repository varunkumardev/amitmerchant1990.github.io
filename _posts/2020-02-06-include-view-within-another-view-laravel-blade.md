---
layout: post
title: Add view within another view in Blade Laravel
image: /cdn/include-blade.png
categories: [Laravel]
---

Sometimes, all you need to do is to add a [Blade](https://laravel.com/docs/5.6/blade) view into an another view. For instance, when you want to add JavaScript and CSS files as a separate Blade files which will contain the related content respectively. So, maybe you've a JavaScript blade file called `view-js.blade.php` which wraps the JS code within `<script>` tag and a CSS blade file called `view-css.blade.php` which wraps the CSS code within `<style>` tag. And all you want to do is add these to an another blade file called `view-show.blade.php`.

This is where Blade's `@include` directive can come to your rescue.

## The `@include` directive

What `@include` directive do is allow you to include a Blade view from within another view. So, for our example if we want to achieve the above mentioned scenario, we could do like so.

We would just need to add the following into `view-show.blade.php`,

```php
@include('view-css')
@include('view-js')

<!-- Some more html -->
```

It's as easy as that! Notice here that all the variables that are available to the parent view will be made available to the included view as well.

Apart from this, you can also pass additional data (in form of an array) to these views altogether like so.

```php
@include('view-js', ['path' => '/'])
```

## The `@includeIf` directive

In order to prevent Laravel from throwing error if the related Blade view is not found, you could use `@includeIf` which will onlu include the view if it actually exist.

```php
@includeIf('view-js')
```

## The `@includeWhen` directive

When you only want to add the Blade view when a certain boolean condition matched, you could use `@includeWhen` directive like so.

```php
@includeWhen($someBooleanCondition, 'view-css')
```

