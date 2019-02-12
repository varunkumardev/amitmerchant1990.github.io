---
layout: post
title: Packages to make your Laravel development experience awesome.
categories: [PHP, Laravel]
---

While developing applications(not necessarily with Laravel), you come across the situation where you need to implement certain functionality. In such cases you shouldn't want to reinvent the wheel if the functionality is been implemented by someone as a package, accepted well by the community and is ready to be consumed. It's a no-brainer. I use to follow the same approach and today in this article, I'm going to list out some of my favorite Laravel packages which have made my experience with development in Laravel delicious.

## [laravel-backup](https://github.com/spatie/laravel-backup)

This Laravel package [creates a backup of your application](https://docs.spatie.be/laravel-backup/v6/taking-backups/overview). The backup is a zip file that contains all files in the directories you specify along with a dump of your database. The backup can be stored on [any of the filesystems you have configured in Laravel 5](http://laravel.com/docs/filesystem).

Once installed, taking a backup of your files and databases is very easy. You just need to issue this artisan command:

```bash
php artisan backup:run
```

This package requires PHP 7 and Laravel 5.7 or higher.

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

## [laravel-opcache](https://github.com/appstract/laravel-opcache)

[PHP OPCache](http://php.net/manual/en/book.opcache.php) can [make your Laravel app Fly](https://medium.com/appstract/make-your-laravel-app-fly-with-php-opcache-9948db2a5f93). This package, by Appstract, contains some useful Artisan commands to work with PHP OPcache. The package requires Laravel 5.5 or newer. For older Laravel versions (5.1 or newer), you can use version 1.3.0 of this package.

To use this package, you need to login to your server/vm and run one of the commands.

Clear OPcache:

```bash
php artisan opcache:clear
```

Show OPcache config:

```bash
php artisan opcache:config
```

Show OPcache status:

```bash
php artisan opcache:status
```

Pre-compile your application code:

```bash
php artisan opcache:optimize
```

Use the pacakge programatically:

```php
use Appstract\Opcache\OpcacheFacade as OPcache;

...

OPcache::clear();
```

You can install the package via Composer:

```bash
composer require appstract/laravel-opcache
```

## [laravel-mediable](https://github.com/plank/laravel-mediable)

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

All classes provide a human readable, fluent interface (no array configuration). Additionally, you can opt for a more verbose and flexible syntax, or for convenience methods that cover most use cases.

```php
Menu::new()
    ->add(Link::to('/', 'Home'))
    ->add(Link::to('/about', 'About'))
    ->add(Link::to('/contact', 'Contact'))
    ->add(Html::empty())
    ->render();

// Or just...
Menu::new()
    ->link('/', 'Home')
    ->link('/about', 'About')
    ->link('/contact', 'Contact')
    ->empty()
```

Above will output following HTML:

```html
<ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
    <li></li>
</ul>
```

You can install the package via composer:

```bash
$ composer require spatie/laravel-menu
```

The in-depth documentation for this package can be found here: https://docs.spatie.be/menu.

## Conclusion

I'm sincerly grateful to developers to come up with such packages and making my life easier and I hope it will be helpful to you as well. I'll add more such awesome pacakges here in this article time-to-time whenever I come across one. Until next time, stay tuned!
