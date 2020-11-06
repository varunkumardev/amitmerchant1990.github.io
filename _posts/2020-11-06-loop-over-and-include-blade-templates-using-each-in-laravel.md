---
layout: post
title: Loop over and include Blade views simultaneously using @each in Laravel
image: /cdn/loop-over-and-include-blade-templates-using-each-in-laravel.png
categories: [Laravel]
---

Sometimes, there comes a scenario where you want to loop over a collection or array and include Blade views based on the iteration of that collection/array. You can use `@foreach` and `@include` for this purpose but there's a handy way using which you can simplify this process.

## The `@each` directive

Laravel provides an `@each` directives in which you can pass in a Blade view and a collection/array and it will handle including the view on each iteration automagically.

So, for instance, let's say, you have an array called `$books` like so.

```php
$books = [
    'Angry River',
    'Harry Potter',
    'Deep Work'
];
```

And you want to loop over this array and simultaneously render a view called `resources/views/books.blade.php` with the following content...

```php
// This will be called on each iteration of `$books`

<li>{% raw %}{{ $key }} - {{$book}}{% endraw %}</li>
```

...inside another view on each iteration, you can do it using `@each` directive like so.

```php
<ul class="list-disc">
    @each('books', $books, 'book')
</ul>
```

As you can tell, the `@each` directive accepts three arguments.

- The first argument is the view partial (`resources/views/books.blade.php`) to render for each element in the array or collection.
- The second argument is the array (`$books`) or collection you wish to iterate over.
- The third argument is the variable name (`$book` in `books.blade.php`) that will be assigned to the current iteration within the view.

The iteration key is available in the form of the `$key` variable.

The example above will render the HTML something like this.

```html
<ul class="list-disc">
    <li>0 - Angry River</li>
    <li>1 - Harry Potter</li>
    <li>2 - Deep Work</li>            
</ul>
```

> Note: Views rendered via `@each` do not inherit the variables from the parent view. If the child view requires these variables, you should use `@foreach` and `@include` instead.

## Default view

The `@each` accepts an optional fourth argument which is a default view if in any case the collection/array is empty like so.

```php
@each('books', $books, 'book', 'nobooks')
```

Here, `nobooks` is the `resources/views/nobooks.blade.php` Blade view which will be rendered when `$books` is empty.

You can play around with this example live at [Laravel Playground](https://laravelplayground.com) below.

<div class="laravel-playground" data-theme="dark" data-filename="playground.blade.php" data-hide-result="true" ><pre data-filename="index.php">&lt;?php

/*
|-------------------------------------------
| Welcome to Laravel Playground
|-------------------------------------------
|
| Laravel Playground allows you to try out PHP and Laravel all from your browser.
| You have access to all Laravel classes and an extensive list of included
| Laravel packages (like Laravel DebugBar).
|
| You can also load your own Gists! 
| Simply append /gist/{YOUR-GIST-ID} to the URL.
|
| Do you want to see some examples?
|
| Multiple views: https://laravelplayground.com/#/gist/d990a2c5f23b50564561b9266252f501
| Form request validation: https://laravelplayground.com/#/gist/e5a0d029f6433e31672e55dd90429d3f
| Livewire: https://laravelplayground.com/#/gist/286de510bfc0a88e697284e90ed1d7da
|
*/

Route::get(&#39;/&#39;, function (){
  return view(&#39;playground&#39;, [
    &#39;title&#39; =&gt; &#39;Laravel Playground&#39;
  ]);
});
</pre>
<pre data-filename="playground.blade.php">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;meta charset=&quot;utf-8&quot;&gt;
    &lt;title&gt;Laravel Playground&lt;/title&gt;
    &lt;link rel=&quot;stylesheet&quot;  href=&quot;https://beyondco.de/css/default.css&quot;&gt;
&lt;/head&gt;
&lt;body
    style=&quot;background: url(&#39;https://beyondco.de/img/monotone_software.png&#39;) top right no-repeat;
    background-size: 100% 1200px;
    background-position-x: calc(100% + 0px);
    background-position-y: -140px;
&quot;&gt;
    &lt;div class=&quot;container px-4 md:px-8 mx-auto pt-4 flex flex-col&quot;&gt;
        &lt;div class=&quot;text-dark-blue-800 text-xl pt-4 mx-8&quot;&gt;
            @php
            $books = [
                &#39;Angry River&#39;,
                &#39;Harry Potter&#39;,
                &#39;Deep Work&#39;
            ];
            @endphp
            &lt;ul class=&quot;list-disc&quot;&gt;
                @each(&#39;books&#39;, $books, &#39;book&#39;, &#39;nobook&#39;)
            &lt;/ul&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;

</pre>
<pre data-filename="books.blade.php">&lt;li&gt;{% raw %}{{ $key }} - {{$book}}{% endraw %}&lt;/li&gt;
</pre>
<pre data-filename="nobook.blade.php">&lt;li&gt;No books available.&lt;/li&gt;</pre>
</div>

<script type="text/javascript" src="https://embed.laravelplayground.com"></script>
