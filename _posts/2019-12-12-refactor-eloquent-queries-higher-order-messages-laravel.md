---
layout: post
title: Refactor eloquent queries using higher order messages in Laravel
image: /cdn/higer-order-messages.png
categories: [Laravel]
---

The best thing about working with Laravel is finding an alternate way to do same old boring stuff every now and then. I came across something called as ["Higher Order Messages"](https://en.wikipedia.org/wiki/Higher_order_message) while working with Eloquent recently. The feature has been in Laravel since its v5.4.

Higher Order Messages is a fancy term given to the mechanism where a computer program allows messages that has other messages as arguments/methods. Sounds confusing? Trust me it's not. Let's understand this using an example.

So, let's say we've a `User` model associated with table `users` which looks something like following:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model 
{
    // nothing here as of now
}
```

Now, let's try to utilize the `User` model into a controller. Let's call it `UserController`.

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\User;

class UserController extends Controller
{
    public function index()
    {
        return User::where('active', 1);
    }
}

```

Nothing fancy going in here. The `index` method of the controller will return all the active users as an array of json. But the problem here is, it will return all the fields of the `users` table. If we want to return specific fields with custom keys, we can do like so.


```php
<?php

class UserController extends Controller
{
    public function index()
    {
        return User::where('active', 1)
            ->map(function($user) {
                return [
                    'user_id' => $user->id,
                    'name' => $user->name
                    'title' => $user->title
                ]
            });
    }
}
```

As you would expect, the above will boils down the response to just return the specified fields for every user. This is where "Higher Order Messages" comes into play if you want to make the above code a little tidier.

Using higher order messages, we can define a method (with logic of the `map`'s closure) right into the model...

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model 
{
    public function transform()
    {
        return [
            'user_id' => $this->id,
            'name' => $this->name,
            'title' => $this->title
        ];
    }
}
```

...And "pass" it to the `map` method in the Eloquent query like below.

```php
<?php

class UserController extends Controller
{
    public function index()
    {
        return User::where('active', 1)
            ->map->transform();
    }
}
```

The above is same as when we use anonymous function in `map`. Now, you can now directly pass the implementing method `transform` of `User` model to `map`. As you can see, this can come handy when you want to refactor a query and helps keep your controllers(or factories) clean.

Here are all the collection methods that supports higher order messages: `average`, `avg`, `contains`, `each`, `every`, `filter`, `first`, `flatMap`, `map`, `partition`, `reject`, `sortBy`, `sortByDesc`, and `sum`.
