---
layout: post
title: 10 Packages to make your Laravel development experience awesome.
---

## [laravel-backup](https://github.com/spatie/laravel-backup)

This Laravel package [creates a backup of your application](creates a backup of your application). The backup is a zip file that contains all files in the directories you specify along with a dump of your database. The backup can be stored on [any of the filesystems you have configured in Laravel 5].

Once installed taking a backup of your files and databases is very easy. Just issue this artisan command:

```bash
php artisan backup:run
```

## [laravel-mailbox](https://github.com/beyondcode/laravel-mailbox)

The package is useful in handling incoming emails in your Laravel application. It features a fluent API that allows you to define custom mailboxes to catch incoming emails.

Here's an example on how you can do the same:

```php
Mailbox::from('{username}@gmail.com', function (InboundEmail $email, $username) {
    // Access email attributes and content
    $subject = $email->subject();
    
    $email->reply(new ReplyMailable);
});
```

You can install the package via composer:

```bash
composer require beyondcode/laravel-mailbox
```

## [laravel-sitemap](https://github.com/spatie/laravel-sitemap)

This package can generate a sitemap without you having to add urls to it manually. This works by crawling your entire site.

```php
use Spatie\Sitemap\SitemapGenerator;

SitemapGenerator::create('https://example.com')->writeToFile($path);
```

You can also create your sitemap manually:

```php
use Carbon\Carbon;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

Sitemap::create()

    ->add(Url::create('/home')
        ->setLastModificationDate(Carbon::yesterday())
        ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
        ->setPriority(0.1))

   ->add(...)

   ->writeToFile($path);
```

For more advanced usage, check out the documentation [here](https://github.com/spatie/laravel-sitemap/blob/master/README.md).

You can install the package via composer:

```bash
composer require spatie/laravel-sitemap
```

## [laravel-confirm-email](https://github.com/beyondcode/laravel-confirm-email)

This package adds a `confirmed_at` and `confirmation_code` field to your users table. Publish the migration and the configuration file using.

```bash
php artisan vendor:publish --provider=BeyondCode\EmailConfirmation\EmailConfirmationServiceProvider
```

And run the migrations:

```bash
php artisan migrate
```

## [https://github.com/plank/laravel-mediable](laravel-mediable)

Laravel-Mediable is a package for easily uploading and attaching media files to models with Laravel 5. 

It has following features:

- Filesystem-driven approach is easily configurable to allow any number of upload directories with different accessibility.
- Many-to-many polymorphic relationships allow any number of media to be assigned to any number of other models without any need to modify the schema.
- Attach media to models with tags, to set and retrieve media for specific purposes, such as 'thumbnail', 'featured image', 'gallery' or 'download'.
- Easily query media and restrict uploads by MIME type, extension and/or aggregate type (e.g. image for jpeg, png or gif).

Using this package is simple. Upload a file to the server, and place it in a directory on the filesystem disk named "uploads". This will create a Media record that can be used to refer to the file.

```php
$media = MediaUploader::fromSource($request->file('thumb'))
	->toDestination('uploads', 'blog/thumbnails')
	->upload();
```

Attach the Media to another eloquent model with one or more tags defining their relationship.

```php
$post = Post::create($this->request->input());
$post->attachMedia($media, ['thumbnail']);
```

Retrieve the media from the model by its tag(s).

```php
$post->getMedia('thumbnail')->first()->getUrl();
```

Install the package using Composer:

```bash
composer require plank/laravel-mediable
```

## [laravel-menu](https://github.com/spatie/laravel-menu)

This package provides a fluent interface to build menus of any size in your Laravel application.

