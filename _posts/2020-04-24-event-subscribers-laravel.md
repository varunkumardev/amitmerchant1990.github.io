---
layout: post
title: Listen to multiple events in a single class in Laravel
image: /cdn/event-subscribers.png
categories: [Laravel]
---

The Observer design pattern is one of the twenty-three well-known ["Gang of Four" design patterns](https://en.wikipedia.org/wiki/Design_Patterns) that describe how to solve recurring design problems to design flexible and reusable object-oriented software, that is, objects that are easier to implement, change, test, and reuse.

[![Event-Listener Pattern](/images/event-listener-illustration.png)](/images/event-listener-illustration.png)

Fortunately, Laravel is also using this pattern to provide the user the flexibility of using events in the framework itself. Basically, the pattern is divided in two parts

- Events
- Listeners (Observers)

There would be an "Event" and multiple "Listeners" to listen to that event independently. Now, how this is done in Laravel is you can register all the Events in `app/Providers/EventServiceProvider` class, under `$listen` like so.

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

As you can see, there can have an event, in our case `OrderCanceled` and its listeners, i.e. `SendOrderCancelEmail` and `InitiateOrderRefund` and so on.

Now, once you register them the `EventServiceProvider`, you'll need to use the `php artisan event:generate`. This will generate the related .php files for events and listeners under `app/Events` and `app/Listeners` directories respectively.

So, we now have three files for the Order Cancel event mechanism. Our `App\Events\OrderCanceled` would be defined like so.

```php
<?php

namespace App\Events;

use App\Order;
use Illuminate\Queue\SerializesModels;

class OrderCanceled
{
    use SerializesModels;

    public $order;

    /**
     * Create a new event instance.
     *
     * @param  \App\Order  $order
     * @return void
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
    }
}
```

And the Listener can be defined like so.

```php
<?php

namespace App\Listeners;

use App\Events\OrderShipped;

class SendShipmentNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\OrderShipped  $event
     * @return void
     */
    public function handle(OrderShipped $event)
    {
        // Access the order using $event->order...
    }
}
```

As you can see, the `Order` object that we passed to the Event can be accessed in `handle` method by using `$event->order` which is type-hinted by the event.

Now, the issue here is you can only listen to single event in a listener class. **What if you want to listen to multiple events in a single class?** Well, for that, you can use *"Event Subscribers"*.

## Event Subscribers

Using event subscribers, you can listen to multiple events in a single class. These classes are called as *"subscribers"*. A typical subscriber would looks like so.

```php
<?php

namespace App\Listeners;

class UserEventSubscriber
{
    /**
     * Handle user login events.
     */
    public function handleUserLogin($event) {}

    /**
     * Handle user logout events.
     */
    public function handleUserLogout($event) {}

    /**
     * Register the listeners for the subscriber.
     *
     * @param  \Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            'Illuminate\Auth\Events\Login',
            'App\Listeners\UserEventSubscriber@handleUserLogin'
        );

        $events->listen(
            'Illuminate\Auth\Events\Logout',
            'App\Listeners\UserEventSubscriber@handleUserLogout'
        );
    }
}
```

As you can see, subscribers should define a `subscribe` method, which will be passed an event dispatcher [`Illuminate\Events\Dispatcher`] instance. You may then call the `listen` method on the given dispatcher to register multiple event listeners which accepts two parameters:

- The event to which you want to sucscribe to
- The method of the subscriber which will act as an obeserver for the event in `class@method` notation.

In the example above, we've registered two listeners for two different subscribers.

## Registering Subscribers

After writing the subscriber, all left for you to do is registering this subscriber which you can do by using the `$subscribe` property on the `EventServiceProvider`. For example, let's add the `UserEventSubscriber` to the list:

```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    // code commented for brevity

    /**
     * The subscriber classes to register.
     *
     * @var array
     */
    protected $subscribe = [
        'App\Listeners\UserEventSubscriber',
    ];
}
```

And that is you can use multiple listeners in a single class!