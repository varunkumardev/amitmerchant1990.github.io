---
layout: post
title: Auto discovery of events in Laravel
image: /cdn/event-discovery.png
categories: [Laravel]
---

In [this article](/event-subscribers-laravel/), I've written about how to use event subscribers or [observer pattern](https://en.wikipedia.org/wiki/Observer_pattern) in Laravel. 

So basically, one can write the Events and register them along with their listeners in `app/Providers/EventServiceProvider` class, under $listen like so.

```php
/**
 * The event listener mappings for the application.
 *
 * @var array
 */
protected $listen = [
    'App\Events\OrderCanceled' => [
        'App\Listeners\SendOrderCancelEmail',
        'App\Listeners\InitiateOrderRefund',
    ],
];
```

As the Events grows so as this `$listen` property. And there would be a good chance, you might forget to register the event.

## Auto Discovering Events

To overcome the above issue, Laravel comes with the *auto discovery* of the events and respective listeners of those events. But the feature is not enabled by default.

This can be enabled by overriding the `shouldDiscoverEvents` method of your application's `app/Providers/EventServiceProvider` by returning `true` from it like so.

```php
/**
 * Determine if events and listeners should be automatically discovered.
 *
 * @return bool
 */
public function shouldDiscoverEvents()
{
    return true;
}
```

Once done, Laravel will automatically find and register your events and listeners by scanning your application's `Listeners` directory. In addition, any explicitly defined events listed in the `EventServiceProvider` will still be registered.

Behind the scenes, Laravel identfies events and listeners by scanning `Event` and `Listener` directories using PHP's [Reflection](https://www.php.net/manual/en/book.reflection.php).

### Auto-discovery with custom directories

By default, all listeners within your application's Listeners directory will be scanned. If you would like to define additional directories to scan, you may override the `discoverEventsWithin` method in your `EventServiceProvider` like so.

```php
/**
 * Get the listener directories that should be used to discover events.
 *
 * @return array
 */
protected function discoverEventsWithin()
{
    return [
        $this->app->path('Listeners'),
    ];
}
```

