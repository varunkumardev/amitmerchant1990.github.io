---
layout: post
title: Returning dynamic attributes for models on-the-fly in Laravel
categories: [Laravel]
---

There exist this neat feature in [Laravel](https://laravel.com) using which you can add attributes in the models that do not have a respective column in your database. 

You can achieve this by first creating an [accessor](https://www.amitmerchant.com/Laravel-Accessors-And-Mutators/) for the attribute you want to returned when casting models to an array or JSON. You can create an accessor like below.

```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['is_admin'];

    /**
     * Get the administrator flag for the user.
     *
     * @return bool
     */
    public function getIsEditable()
    {
        return $this->attributes['admin'] == 'yes';
    }
}
```

Notice here that, you need to add the attribute name to the `appends` proprty on the model. Also note that, attribute names are typically referenced in `snake case`, even though the accessor is defined using `camel case`.

Once the attribute has been added to the appends list, it will be included in both the model's array and JSON representations. 

## Fetching dynamic attributes on run time

You can use the `append` method on model instance to append attributes on-the-fly.

```php
return $post->append('is_editable')->toArray();
```

Or if you can use `setAppends` method, if you want to append multiple attributes like so.

```php
return $post->setAppends(['is_editable', 'is_expired'])->toJson();
```

