---
layout: post
title: Custom validation rules and messages in Laravel form requests
image: /cdn/laravel-form-requests.png
categories: [Laravel]
---

If you want to validate request fields in Laravel, you could use `Illuminate\Http\Request`'s validate method where you can specify all the fields that you would want to get validated inside controller's action. You can do it like so.

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Store a new blog post.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
            'author.name' => 'required',
        ]);

        // The blog post is valid...
    }
}
```

As you can see, we've specified validation rules on `title` and `body` fields and until these validation rules are matched, the request won't get processed further. 

But problem here is the controller action can quickly get bloated if there are many fields that you want to get validated. How can you make it a little cleaner and nicer?

## Using `FormRequest` class

Well, you can do this with using [Illuminate\Foundation\Http\FormRequest](https://laravel.com/api/5.5/Illuminate/Foundation/Http/FormRequest.html) which is basically a custom request class that contain validation logic upon extended.

First off, you'll need to create a form request class. In order to do so, you'll need to run following artisan command.

```bash
$ php artisan make:request PostRequest
```

Upon running above command, a `PostRequest` will get generated in `app/Http/Requests` which extends `Illuminate\Foundation\Http\FormRequest`. This is how the `PostRequest` would look like.

```php
<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
```

In order to add validation rules, you'd need to override `rules()` method like so.

```php
<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
            'author.name' => 'required',
        ];
    }
}
```

Now, you can replace the `Request` with `PostRequest` in the controller, in the first example of the article like so.

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\PostRequest;

class PostController extends Controller
{
    /**
     * Store a new blog post.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store(PostRequest $request)
    {
        // The blog post is valid...
    }
}
```

As you can see, we've removed the custom validation from the controller's action as we're using the `PostRequest` in order to build the `$request` object, which will ultimately take care of the validation of request fields that we've setup. The action is now much more cleaner and less bloated!

## Customizing Validation Messages

Apart from setting up validation rules, you can also customize validation messages in the form request classes. For this, you'll need to override `messages()` method like so.

```php
<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
{
    public function rules()
    {
        return [
            'title' => 'required|unique:posts|max:255',
            'body' => 'required',
            'author.name' => 'required',
        ];
    }

    public function messages()
    {
        return [
            'title.reuired' => 'A nice title is required for the post.',
            'body.required' => 'Please add content for the post.',
        ];
    }
}
```

And upon validating `title` and `body` fields, the messages specified in the `messages()` will get displayed instead of the Laravel's default validation messages.
