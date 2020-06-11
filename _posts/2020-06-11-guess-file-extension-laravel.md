---
layout: post
title: Find the extension of files without extension in Laravel
image: /cdn/guess-file-extension-laravel.png
categories: [Laravel]
---

It's helpful sometimes when you have a file and it doesn't have extension attached to it but you want to know the extension of the file regardless.

For instance, If I've [png](https://en.wikipedia.org/wiki/Portable_Network_Graphics) file named `foo.png` and if I want to get the extension of this file, Laravel has got `extension` method on [File](https://laravel.com/api/5.8/Illuminate/Support/Facades/File.html) facade which can be used to get the extension when the file has got the extension attached like so.

```php
File::extension(public_path('foo.png'))
// "png"
```

But, as I mentioned earlier, if the file has no extension, say the png file with name `foo` only, how would you get the extension for the same?

Well, according to [this PR](https://github.com/laravel/framework/pull/33001), there will be a `guessedExtension` method on the [File](https://laravel.com/api/5.8/Illuminate/Support/Facades/File.html) facade, which will try to *"guess"* the extension of the file like so.

```php
File::guessedExtension(public_path('foo'))
// "png"

File::guessedExtension(public_path('desktop'))
// "jpg"
```

Behind scenes, the method tries to guess the extension by the mime-type of the file using Symfony's [MimeType](https://symfony.com/doc/current/components/mime.html) extension.

Quite a little thing but it's worth knowing about!