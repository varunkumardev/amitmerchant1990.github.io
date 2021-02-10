---
layout: post
title: Limit the number of returned segments in PHP's explode()
image: /cdn/limit-the-number-of-returned-segments-in-php-explode.png
categories: [PHP]
---

PHP's documentation is a goldmine of little but helpful things which is when explored can help improve your code. But this kind of thing tends to get overlooked easily.

One such thing that I came across recently through [Tim MacDonald's tweet](https://twitter.com/timacdonald87/status/1358246259467800579) is the ability of PHP's [explode()](https://www.php.net/manual/en/function.explode.php) function to limit the number of segments returned by it based on the separator.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🍭 Realised this little tasty nugget existed today.<br><br>explode()&#39;s 3rd parameter allows you to limit the number of returned segments. The last segment then contains the remainder of the string as is without further splitting, even if it contains the separator you are exploding on. <a href="https://t.co/Sxle711SDI">pic.twitter.com/Sxle711SDI</a></p>&mdash; Tim MacDonald (@timacdonald87) <a href="https://twitter.com/timacdonald87/status/1358246259467800579?ref_src=twsrc%5Etfw">February 7, 2021</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Essentially, there's a third parameter in `explode()` where you can specify how many segments you'd want to be returned irrespective of the fact that there may be more segments than the specified.

Check the following example.

```php
$str = 'one|two|three|four';

print_r(explode('|', $str, 2));

/*
Array
(
    [0] => one
    [1] => two|three|four
)
*/
```

As you can see, when you specify the third parameter, the returned `array` will contain a maximum of limit (in our example it's 2) elements with the last element containing the rest of `string` (`two|three|four`).