---
layout: post
title: Check if the specific service provider is loaded or not in Laravel
image: /cdn/check-service-provider-loaded.png
categories: [Laravel]
---

Sometimes, you want to load some stuff based on the fact that the certain service provider is loaded in the `providers` array of `config/app.php` or not. 

```php
'providers' => [
    // Other Service Providers

    App\Providers\ComposerServiceProvider::class,
],
```

For instance, if you're using some third-party package and want to display certain things if and only if the service provider of that package is loaded.

Fortunately, there's a helper method available in Laravel that lets you do just that. [This PR](https://github.com/laravel/framework/pull/33286) adds a method `isProviderLoaded()` in `src/Illuminate/Foundation/Application.php` which lets you check if the given service provider is loaded or not like so.

```php
if ($app->isProviderLoaded(OptionalServiceProvider::class)) {
    // Do something
}

if (! $app->isProviderLoaded(RequiredServiceProvider::class)) {
    // Throw exception
}
```

Really handy for the aforementioned reasons! The same method is available there in [Lumen](https://lumen.laravel.com/) as well.
