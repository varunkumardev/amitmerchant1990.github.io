---
layout: post
title: Re-using query constraints in Laravel Eloquent - Global vs. Local scopes
categories: [Laravel]
---

Laravel's Eloquent ORM comes with this unique set of features called ["Scopes"](https://laravel.com/docs/5.8/eloquent#query-scopes) which can be used to re-use some of the query constraints onto all the queries of a certain model. This can be useful to minimize the code while writing the query and is an easy way to make sure every query for a given model receives certain constraints.

There are basically two types of scopes available in Laravel: **"Global Scopes"** and **"Local Scopes"**. Let's now understand what are these scopes and how to use them.

## Global Scopes

Global Scopes are useful when you're certain about the set of query constriants that you think would be applicable to all the queries on which these scopes will be assigned. 

To define a global scope, all you need to do is to define a class that implements the `Illuminate\Database\Eloquent\Scope` interface.This interface requires you to implement one method: `apply`. Inside this `apply` method, you can add `where` constraint which will be applied to the query. You can define all your scopes under namespace `App\Scopes` like this.

```php

<?php

namespace App\Scopes;

use Illuminate\Database\Eloquent\Scope;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class PublishedScope implements Scope
{
    /**
     * Apply the scope to a given Eloquent query builder.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $builder
     * @param  \Illuminate\Database\Eloquent\Model  $model
     * @return void
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where('published', 1);
    }
}
```

### Applying Global Scopes to models

In order to assign a certain global scope to a model, you need to override the `boot` method of the particular model and then use the `addGlobalScope` method.

```php
<?php

namespace App;

use App\Scopes\PublishedScope;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope(new PublishedScope);
    }
}
```

Now, as the `PublishedScope` scope is assigned to the `Post` model, whenever a query will be issued for this model, it will be attached with the constraint assigned in the scope. For instance `Post::all()` will generate the following query:

```sql
select * from `posts` where `published` = 1
```

## Anonymous Global Scopes

You can also utilize the global scopes by assigning them in form of Closures/[Anonymous functions](https://www.php.net/manual/en/class.closure.php). This is particularly useful for simple scopes that do not require a separate class. Here's how you can do that.

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Post extends Model
{
    /**
     * The "booting" method of the model.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('published', function (Builder $builder) {
            $builder->where('published', 1);
        });
    }
}
```

Here in this case, the first parameter of the `addGlobalScope` method is the name of the Closure which we've passed in the second parameter which can be used to remove the scope while issuing the query. I'll discuss this in the next section.

## Removing Global Scopes

If you would like to remove a global scope for a given query, you may use the `withoutGlobalScope` method. The method accepts the class name of the global scope as its only argument:

```php
Post::withoutGlobalScope(PublishedScope::class)->get();
```

If you want to remove all of the global scopes, you can just use the `withoutGlobalScope` without any parameter

```php
Post::withoutGlobalScope()->get();
```

Or if there are multiple global scopes and you want to remove some of the scopes you can do this by assining the array of the selected global scopes.

```php
// Remove some of the global scopes...
User::withoutGlobalScopes([
    FirstScope::class, SecondScope::class
])->get();
```

## Local Scopes

The other type of scopes that are available in Eloquent is "Local Scopes". These are especially useful when you want to utilize certain contraints as smaller chunks which can be utilized on the model queries. 

For instance, for the earlier example of `Post` model, if you want to fetch all the posts that have been "starred" extensively, you can do this by defining a local scope. To define a local scope, prefix an Eloquent model method with `scope`. Scopes should always return a query builder instance:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Scope a query to only include most starred posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeStarred($query)
    {
        return $query->where('starred', '>', 30);
    }

    /**
     * Scope a query to only include published posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('published', 1);
    }
}
```

If you want to pass the dynamic parameter to scopes in order to make the local scopes dynamic, you can do this by just adding your additional parameters to your scope. Scope parameters should be defined after the $query parameter:

```php
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    /**
     * Scope a query to only include most starred posts.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}
```

Now, you may pass the parameters when calling the scope:

```php
$posts = App\Post::ofCategory('php')->get();
```


## Utilizing A Local Scope

To use the defined local scope on the model query, all you need to do is to call the scope methods on the querying model without using the prefix `scope`.

```php
$posts = App\Post::starred()->get();
```

You can also chain the scope methods in order to aggregate different constraints like this.

```php
$posts = App\Post::starred()->published()->get();
```

If you want to use `or` query on model using scopes, you can do this by using a "higher order" `orWhere` method that allows you to fluently chain the scopes.

```php
$posts = App\Post::starred()->orWhere->published()->get();
```

## Conclusion

So the bottomline here is, use "Global Scopes" when you want to apply a monolith of query constraints on the model queries and if you want to utilize smaller chunks of query constraints which can do a specific operation, use "Local Scopes" in that case.
