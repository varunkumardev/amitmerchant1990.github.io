---
layout: post
title: Identifying even and odd iterations in Laravel Blade
image: /cdn/even-odd-iterations-blade-laravel.png
categories: [Laravel]
---

When designing UI elements such as zebra strips in the tables, you'd need to identify if the loop iteration is even or odd and based on that you'd set the backgroud color of the row.

In [Blade](https://laravel.com/docs/6.x/blade) templates of Laravel, one way to achieve this would be to use something like following, 

```php
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->iteration % 2 == 0)
            This is an even iteration
        @else 
            This is an odd iteration
        @endif
    @endforeach
@endforeach
```

The syntax, as you can see, is pretty dense looking. But, Laravel has something tidy and better way to do it.

## Using `even` and `odd` flags

There exists two convenience properties in the Blade's `$loop` varible through which you can directly check the even and odd iterations like so.

```php
@foreach ($users as $user)
    @foreach ($user->posts as $post)
        @if ($loop->even)
            This is an even iteration
        @elseif ($loop->odd)
            This is an odd iteration
        @endif
    @endforeach
@endforeach
```

Here, `even` will check whether current iteration is an even iteration through the loop. And `odd` will check whether current iteration is an odd iteration through the loop.

You can learn more about such convenience properties of `$loop` in the official documents [here](https://laravel.com/docs/6.x/blade#the-loop-variable).

