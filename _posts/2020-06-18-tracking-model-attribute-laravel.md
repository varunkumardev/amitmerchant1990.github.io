---
layout: post
title: Tracking model attribute changes in Laravel
image: /cdn/tracking-model-attribute-laravel.png
categories: [Laravel]
---

Sometimes, it's useful to know if somethig has been changed in the model since it's been loaded. For instance, you would want to check if the `is_published` attribute of the `Post` model is set or not before publishing the post further.

Laravel has some handy methods which can be used for such purposes. These methods tracks the model attributes for any changes on them for a particular request cycle. Following are those methods.

- `isDirty` - The method determines if any attributes have been changed since the model was loaded and before it's been saved. 
- `isClean` - The method determines if any attributes have not been changed since the model was loaded and before it's been saved. Basically the opposite of the `isDirty` method.
- `wasChanged` - The method determines if any attributes were changed when the model was last saved within the current request cycle.

## The `isDirty` method

As specified previously, it checks for any attributes that have been changed since the model was loaded. Here's how you can use it.

```php
$post = Post::create([
    'title' => 'My title',
    'description' => 'Awesome description',
    'is_published' => false
]);

$post->isDirty(); 
// return `false` as any model attribute hasn't been changed yet

$post->is_published = true;

$post->isDirty(); 
// return `true` as `is_published` is changed.

$post->isDirty('title'); 
// returns `false` as `title` attirbute hasn't been changed yet

$post->isDirty('is_published'); 
// returns `true` as `is_published` is changed.

$post->save();
```

## The `isClean` method

The `isClean` method is the opposite of `isDirty` methos which checks if attributes of the model is "clean" or not. So, using `isClean` in the previous example will return the opposite of what `isDirty` would return.

```php
$post = Post::create([
    'title' => 'My title',
    'description' => 'Awesome description',
    'is_published' => false
]);

$post->isClean();
// return `true` as any model attribute hasn't been changed yet

$post->is_published = true;

$post->isClean();
// return `false` as `is_published` is changed.

$post->isClean('title');
// returns `true` as `title` attirbute hasn't been changed yet

$post->isClean('is_published');
// returns `false` as `is_published` is changed.

$post->save();
```

> One thing to note here is, once the model is saved, both `isDirty` and `isClean` will mark the model instance "not dirty" and "clean" respectively. So, `isDirty` will return `false` and `isClean` will return `true`.

## The `wasChanged` method

So, when you want to know if the an attribute was changed *"before saving"* the model, you can use `wasChanged` method. Here's how it works.

```php
$post = Post::create([
    'title' => 'My title',
    'description' => 'Awesome description',
    'is_published' => false
]);

$post->is_published = true;
$post->save();

$post->wasChanged();
// return `true` as `is_published` is changed.

$post->wasChanged('title');
// returns `false` as `title` attirbute hasn't been changed yet

$post->wasChanged('is_published');
// returns `true` as `is_published` is changed.
```