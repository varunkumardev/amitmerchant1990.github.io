---
layout: post
title: Attribute casting in Laravel Eloquent
categories: [Laravel]
---

Laravel's Eloquent is without a doubt a great ORM exists right now. It has some of the features which makes it ahead of its competitions. One such feature the ORM provides is called "Attribute casting".

Type casting according to Wikipedia,

> In computer science, type conversion, type casting, type coercion, and type juggling are different ways of changing an expression from one data type to another. 

Simply put, _type casting_ is a method of changing an entity from one data type to another. 

While working with [Laravel Eloquent](https://laravel.com/docs/5.8/eloquent), there may come a scenario where you'd want to change the datatype of certain model attribute. Before Laravel 5, the usual way of achieving the casting in Eloquent models would be to define an [accessor](/Laravel-Accessors-And-Mutators) for certain attribute. For instance, if you want to change the datatype of `tax` attribute to `string`, you'd do it like this.

```php
public function getTax($value)
{
    return (string) $value;
}
```

But starting with Laravel 5, there's a more simpler way of doing the same. Eloquent provides a `$casts` property on your model using which you can convert attributes to common data types. You can achieve the above example like below.

```php
<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Checkout extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'tax' => 'string',
    ];
}
```

Now, whenever you access the tax attribute, it'll be converted to a string by Eloquent.

```php
$checkout = App\Checkout::find(1);

dd($checkout->tax) // string("100.85")
```

As you can see, here the `$casts` property is an array where the key is the name of the attribute being cast and the value is the type you wish to cast the column to. The supported cast types are: `integer`, `real`, `float`, `double`, `decimal`:`<digits>`, `string`, `boolean`, `object`, `array`, `collection`, `date`, `datetime`, and `timestamp`.

## Array & JSON Casting

Addionally, if your table consist a column which stores serialized JSON string and you want that particular column to be automatically deserialize the attribute to a PHP array when you access it on your Eloquent model, you should use `array` cast. You can do it like this.

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'options' => 'array',
    ];
}
```

Once the cast is defined, you may access the `options` attribute and it will automatically be deserialized from JSON into a PHP array. When you set the value of the `options` attribute, the given array will automatically be serialized back into JSON for storage:

```php
$admin = App\Admin::find(1);

$options = $admin->options;

$options['key'] = 'value';

$admin->options = $options;

$admin->save();
```