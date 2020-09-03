---
layout: post
title: Re-usable Blade components for Laravel projects using Blade UI Kit
image: /cdn/re-usable-blade-components-for-laravel-project-using-blade-ui-kit.png
categories: [Laravel]
---

Recently, a prominent member of [Laravel](https://laravel.com/) community, [Dries Vints](https://twitter.com/driesvints), has pre-released a pretty exciting open-source project called [Blade UI Kit](https://blade-ui-kit.com/).

Quoting from its [official GitHub reposirtory](https://github.com/blade-ui-kit/blade-ui-kit),

> Blade UI Kit is a set of renderless components to utilize in your Laravel Blade views. 

In a nutshell, Blade UI Kit provides you a set of re-usable Blade components that you might be using across your Laravel projects repeatedly.

For instance, let's say, you want to add a password input in your project. In that case, all you'll need to do is add the following component from Blade UI Kit in your Blade view like so.

```html
<x-password />
```

This will output the following HTML:

```html
<input name="password" type="password" id="password" />
```

You can even customize some of the attributes such as `name` and `class` like so.

```html
<x-password name="my_password" class="p-4" />
```

This will output the following HTML:

```html
<input name="my_password" type="password" id="my_password" class="p-4" />
```

There are currently 26 components in the library that are ready to use including components such as [Form](https://blade-ui-kit.com/docs/0.x/form), [Color Picker](https://blade-ui-kit.com/docs/0.x/color-picker), [Markdown](https://blade-ui-kit.com/docs/0.x/markdown), [Avatar](https://blade-ui-kit.com/docs/0.x/avatar), [Mapbox](https://blade-ui-kit.com/docs/0.x/mapbox) to name a few. 

You can check all of them [in its documentation](https://blade-ui-kit.com/docs).

## Features

Here are some of the features of Blade UI Kit:

- **Plug-and-play** - You can immediately start using these components once installing the package.
- **Extensible** - All these components are extensible meaning these can be easily extended and all of the component views can be published, allowing you to go pretty far in terms of customizing them.
- **Renderless** - These components are renderless meaning they ship without any styling applied to them. This puts you in full control of how they look and feel.

## Installation

You can get started with this package by [installing](https://blade-ui-kit.com/docs/0.x/installation) it using the following command before clearing the config cache.

```bash
$ php artisan config:clear

$ composer require blade-ui-kit/blade-ui-kit
```

And that's it! You can start using all the goodies that this package offers.

Of course, there are some of the things that you can customize. Such as changing the prefix of the Blade UI Kit component or changing their name entirely according to your need. All the instructions to do so has been beautifully explained on [this page](https://blade-ui-kit.com/docs/0.x/installation).