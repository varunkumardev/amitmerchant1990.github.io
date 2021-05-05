---
layout: post
title: Estimated reading time macro in Laravel
image: /cdn/estimated-reading-time-macro-in-laravel.png
categories: [Laravel]
---

When you want to [extend some of the classes' functionality](/extending-class-using-macros-laravel/) in Laravel, Macros are your best bet. Your imagination is the only limit to what you can do with macros.

For instance, I have recently come across a [handly little macro](https://twitter.com/marcelpociot/status/1389881758267625473) shared by [Marcel Pociot](https://twitter.com/marcelpociot) that gives you the estimated reading time for the given text(s).

Here's how the macro looks like.

```php
use Illuminate\Support\Str;

Str::macro('readDuration', function(...$text) {
    $totalWords = str_word_count(implode(" ", $text));
    $minutesToRead = round($totalWords / 200);

    return (int)max(1, $minutesToRead);
});

echo Str::readDuration($post->text). ' min read';
```

As you can tell, the macro essentially tries to calculate the average reading time, keeping in mind that an average human can read about *200* words per minute. 

If the text comprises less than 200 words, it will return 1 minute.

Interestingly, as the macro callable spreads the `$text`, you can also pass multiple strings in the macro like so.

```php
echo Str::readDuration($post->title, $post->text). ' min read';
```

Here's the tweet by Marcel.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Here&#39;s a nice little string helper macro for <a href="https://twitter.com/laravelphp?ref_src=twsrc%5Etfw">@laravelphp</a> , that gives you the estimated reading time for the given text(s).<br><br>200 is the (pessimistic) avg. reading amount of words that an adult reads per minute. <a href="https://t.co/QKypiT5tnT">pic.twitter.com/QKypiT5tnT</a></p>&mdash; Marcel Pociot 🧪 (@marcelpociot) <a href="https://twitter.com/marcelpociot/status/1389881758267625473?ref_src=twsrc%5Etfw">May 5, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>