---
layout: post
title: Generate temporary URLs of AWS S3 files in Laravel
image: /cdn/generate-temporary-urls-of-aws-s3-files-in-laravel.png
categories: [Laravel]
---

Sometimes, all you want to do is generate temporary URLs for files that you have stored on your [AWS S3](https://aws.amazon.com/free/storage/s3/) bucket. For instance, you would want to use this to prevent [hotlinking](https://simple.wikipedia.org/wiki/Hotlinking) of images.

# The `temporaryUrl` method

Laravel provides an easy way to do so. To create temporary URLs of files, all you need to do is use the `temporaryUrl` on the `Illuminate\Support\Facades\Storage` facade like so.

```php
use Illuminate\Support\Facades\Storage;

$url = Storage::temporaryUrl(
    'secret.pdf', now()->addMinutes(5)
);
```

As you can tell, the `temporaryUrl` method accepts two mandatory parameters. 

- The path of the file.
- A DateTime instance specifying when the URL should expire.

The above code will generate a temporary URL of the file which will get expired in 5 minutes.

Under the hood, Laravel uses the AWS SDK to create [pre-signed URLs](https://docs.aws.amazon.com/sdk-for-php/v3/developer-guide/s3-presigned-url.html) which are nothing but temporary URLs in the AWS world.

## Add more request parameters

You can also pass additional [S3 request parameters](https://docs.aws.amazon.com/AmazonS3/latest/API/API_GetObject.html#RESTObjectGET-requests) in form of an array as the third (optional) argument to the `temporaryUrl` method to add more control on file requests like so.

```php
use Illuminate\Support\Facades\Storage;

$url = Storage::temporaryUrl(
    'secret.pdf', 
    now()->addMinutes(5),
    [
        'ResponseContentType' => 'application/octet-stream',
        'ResponseContentDisposition' => 'attachment; filename=file2.jpg',
    ]
);
```