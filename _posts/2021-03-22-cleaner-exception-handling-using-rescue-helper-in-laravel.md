---
layout: post
title: Cleaner exception handling using rescue() helper in Laravel
image: /cdn/cleaner-exception-handling-using-rescue-helper-in-laravel.png
categories: [Laravel]
---

If you want to make your web application robust, you get to handle those quirky and unpredictable exceptions. And the way you do that in PHP is by using [try-catch blocks](https://www.php.net/manual/en/language.exceptions.php) in your code. The same applies in the case of Laravel as well.

## The traditional way

So, for instance, if you want to handle the exception when something goes wrong when saving/updating the model record, you can handle exceptions like so.

```php
public function store(Request $request)
{  
    try   
    {  
        $comment = new BlogComment();  
        $comment->content = $request['comment'];  
        $comment->user_id = Auth::user()->id;  
        $comment->blog_id = $request['ticketId'];  
        $comment->save(); 
    } catch(Exception $e) { 
        if (!($e instanceof SQLException)) {
            app()->make(\App\Exceptions\Handler::class)->report($e); 
            // Report the exception if you don't know what actually caused it
        }
        request()->session()->flash('unsuccessMessage', 'Failed to add comment.');  
        return redirect()->back();
    }
}
```

As you can tell, we're using Laravel's in-built [error handling](https://laravel.com/docs/8.x/errors) in the catch block to report the exception if it occurs. 

Now, this is perfectly fine but do you know there's a slicker and a cleaner way in Laravel that you can use to make this even shorter. Enter the `rescue()` helper.

## The `rescue()` helper

Laravel provided this `rescue()` helper in which you can pass in the piece of code as a [closure](https://www.php.net/manual/en/class.closure.php) for which you want to handle exceptions. The helper will execute the given closure and catches any exceptions that occur during its execution. All exceptions that are caught will be sent to the [exception handler](https://laravel.com/docs/8.x/errors#the-exception-handler).

So, if we want to rewrite the previous example using the `rescue()` helper, we can do it like so.

```php
public function store(Request $request)
{
    rescue(function () {
        $comment = new BlogComment();  
        $comment->content = $request['comment'];  
        $comment->user_id = Auth::user()->id;  
        $comment->blog_id = $request['ticketId'];  
        $comment->save();
    }, function() {
        request()->session()->flash('unsuccessMessage', 'Failed to add comment.');  
        return redirect()->back();
    }, true);
}
```

As you can tell, the `rescue()` helper can accept three arguments.

- The first argument as I discussed is the closure that holds the code that you want exception handled.
- The second argument *(optional)* is the closure that will get run if an exception occurs or you can also pass in the default value here which will be returned when an exception occurs.
- The third argument *(optional)* accepts a `boolean` value which will determine if you want to report the exception or not.
  - If it's `true`, the `rescue()` helper will report the exception to the configured error handler.
  - If it's `false`, the `rescue()` helper won't report the exception.

Pretty neat, right?

If you're curious, here's how the function definition of `rescue()` helper looks like.

```php
/**
 * Catch a potential exception and return a default value.
 *
 * @param  callable  $callback
 * @param  mixed  $rescue
 * @param  bool  $report
 * @return mixed
 */
function rescue(callable $callback, $rescue = null, $report = true)
{
    try {
        return $callback();
    } catch (Throwable $e) {
        if ($report) {
            report($e);
        }

        return $rescue instanceof Closure ? $rescue($e) : $rescue;
    }
}
```