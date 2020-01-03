---
layout: post
title: Conditional attributes and relationships in Laravel Resources
categories: [Laravel]
---

When you're building an Laravel application which uses APIs at some point, it's no brainer to use Laravel's [resource classes](https://laravel.com/docs/5.8/eloquent-resources) as it provides the transformation layer that sits between your Eloquent models and the JSON responses that are actually returned to your application's users. 

{% include affiliates.html %}

In this article, I'm specifically going to talk about conditional attributes that can be used only include an attribute in a resource response if a given condition is met. 

So, as you may know each resource contains a `toArray` method which translates your model's attributes into an API friendly array that can be returned to your users like below:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```

Now, if we want to only include an attribute in a resource response if a given condition is met, then there are helper methods in Laravel which can be used to accomplish this operation. One of them being `when` method which can be used to conditionally add an attribute to a resource response. So, let's change the above example:

```php
<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Post extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'content' => $this->when($this->is_published === 1, $this->content),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
```

In this example, the `content` key will only be returned in the final resource response if the post is published. If it's not yet published, the `content` key will be removed from the resource response entirely before it is sent back to the client. 

The `when` method allows you to expressively define your resources without resorting to conditional statements when building the array.

The `when` method also accepts a Closure as its second argument, allowing you to calculate the resulting value only if the given condition is true. For instance, if you want to alter the content before sending it to the client, you can do so as following:

```php
'content' => $this->when($this->is_published === 1, function () {
    return htmlspecialchars($this->content)
})
```

## Merging multiple attributes

There is a `mergeWhen` method which can be used to include multiple conditional attributes in the resource response. Here's how you can do it:

```php

public function toArray($request)
{
    return [
        'id' => $this->id,
        'title' => $this->title,
        'description' => $this->description,
        $this->mergeWhen($this->is_published === 1, [
            'content' => $this->content,
            'tags' => $this->tags
        ]),
        'created_at' => $this->created_at,
        'updated_at' => $this->updated_at,
    ];
}
```

As you can see `mergeWhen` is similar to `when`, except you can provide multiple conditional attributes as an array in the second argument of the method. If the given condition is `false`, both the above attributes will not be added to the response.

## Conditional Relationships

Laravel makes it easier to also include relationship conditionally on the resource responses if the relationship has already been loaded on the model. `whenLoaded` method has been provided to accomplish this.

```php
public function toArray($request)
{
    return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
}
```

Here in the above example, if the `comments` relationship is not loaded then entire `comments` key will be removed from the response. Also note here that the `whenLoaded` method accepts the name of the relationship instead of the relationship itself. This is to avoid the unnecessarily loading of relationships.



