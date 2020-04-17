---
layout: post
title: Post data using streams in PHP
image: /cdn/post-data-streams.png
categories: [PHP]
---

I recently stumbled upon this ghost feature of PHP using which you can actually use [streams](https://www.php.net/manual/en/intro.stream.php) in order to post data using a HTTP POST request.

Basically,

> Streams are the way of generalizing file, network, data compression, and other operations which share a common set of functions and uses. In its simplest definition, a stream is a resource object which exhibits streamable behavior. That is, it can be read from or written to in a linear fashion, and may be able to `fseek()` to an arbitrary location within the stream.

PHP comes with streams functions out-of-the-box as they are part of PHP core. Here are [all the stream functions](https://www.php.net/manual/en/ref.stream.php) that comes with PHP.

We're specifically going to talk about one of these function called [stream_context_create](https://www.php.net/manual/en/function.stream-context-create.php) which can be used in combination with [file_get_contents](https://www.php.net/manual/en/function.file-get-contents.php) to send data using HTTP POST method.

## `file_get_contents` with Streams

To actually send a HTTP POST request using [file_get_contents](https://www.php.net/manual/en/function.file-get-contents.php), you'll need to pass in a third parameter (which is a `$context`) to the `file_get_contents` function like so.

```php
<?php

$postdata = [
    'var1' => 'some content',
    'var2' => 'doh'
];

$opts = [
    'http' => [
        'method'  => 'POST',
        'header'  => 'Content-type: application/json',
        'content' => $postdata
    ]
];

$context = stream_context_create($opts);

$result = file_get_contents('http://example.com/submit.php', false, $context);
```

So, as you can see in the example, you can create a "stream context" using [stream_context_create](https://www.php.net/manual/en/function.stream-context-create.php) by passing various HTTP options as an array such as `method`, `header`, `content` etc. And now passing `$context` to `file_get_contents` will create a stream through which data can be sent over a HTTP POST request.

The same can be achieved for a FTP and SSL connection as well by replacing `http` with `ftp` and `ssl` in the context option respectively.