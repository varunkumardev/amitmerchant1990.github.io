---
layout: post
title: Understanding Constructor and Method dependency injection in Laravel
image: /cdn/constructor-method-injection-laravel.png
categories: Laravel
---

To understand, how dependency injection works in Laravel, let's just get to know what dependency injection actually is, in software engineering.

From the Wikipedia [definition](https://en.wikipedia.org/wiki/Dependency_injection) of dependency injection,

> In software engineering, dependency injection is a technique whereby one object supplies the dependencies of another object.

In simple words, dependency injection is a way of separating the creation of a client's dependencies from the client's behavior, which allows program designs to be loosely coupled. Let's take an exmple to understand this.

```php
<?php

namespace App;

class Client {
    // Internal reference to the service used by this client
    private $service;

    // Constructor
    public function _construct() {
        $this->service = new UserService();
    }

    // Method within this client that uses the services
    public function greet() {
        return "Hello " + $this->service->getName();
    }
}
```

In above example, the class `Client` wants to use another service called `UserService` by instantiating a class property `$service` into constructor and assigning the `UserService`'s instance into it, which then can be accessed by other methods of the class `Client`. Here as you can see, the client(class `Client`) controls which implementation of service(class `UserService`) is used and controls its construction. Here, the class `Client` has a hard-coded implicit dependency upon `UserService`.

But the thing is, your business logic may change over the period of time and you might want to use some other service other than `UserService` let's say `UserRepository` in this particular class. What will you do in this case? Replace `UserService`'s instance with `UserRepository`'s instance? Nah, that will make harder to test the class and it's purely baseless to interchange the dependency like this. This where the concept of dependency comes into play.

{:.you-may-like}
> You may also like: [Dependency Injection vs. Dependency Injection Container in PHP](https://www.amitmerchant.com/dependency-injection-container-php/)

## Constructor dependency injection

The first type of dependency injection that we're going to learn is "Constructor dependency injection". Let's understand it by tweaking the above example.

```php
<?php

namespace App;

class Client {
    // Internal reference to the service used by this client
    private $service;

    // Constructor
    public function _construct(UserService $service) {
        $this->service = $service;
    }

    // Method within this client that uses the services
    public function greet() {
        return "Hello " + $this->service->getName();
    }
}
```

As you can see, we are now "injecting" dependency explicitly into the class by type-hinting the `UserService` into the constructor. The `Client` class now does not need to worry about how the service is connected with it. All it expects is `UserService` instance. We no more need to edit `Client` class for it's dependency, we have just provided it with what it needed.

Now, let's understand how Laravel is using dependency injection in its own framework. 

```php
<?php

namespace App\Http\Controllers;

use App\User;
use App\Repositories\UserRepository;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $users;

    /**
     * Create a new controller instance.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function show($id)
    {
        $user = $this->users->find($id);

        return view('user.profile', ['user' => $user]);
    }
}
```

In this example, the `UserController` needs to retrieve users from a data source. So, we will inject a service that is able to retrieve users. In this context, our `UserRepository` most likely uses Eloquent to retrieve user information from the database. However, since the repository is injected, we are able to easily swap it out with another implementation. We're also able to easily "mock", or create a dummy implementation of the `UserRepository` when testing our application.

Laravel uses this special feature of PHP called [Reflection](https://www.php.net/manual/en/class.reflectionclass.php) and [service container](https://laravel.com/docs/5.4/container) to accomplish dependency injection. What Laravel does in above example is it will check what dependency has been passed to the constructor using Reflection and will automagically resolved the required dependencies for that class.

The above method resolves automatically. But there's an alternative way of doing this in Laravel. i.e using service container bindings. So, we can bind `UserRepository` class into the `UserController` class like this into the service provider.

```php
$this->app->bind('App\Http\Controllers\UserController', function ($app) {
    return new HelpSpot\API($app->make('UserRepository'));
});
```

## Method dependency injection

There maybe a case when you only want to inject the dependency into the certain method. In such scenarios, you can use method dependency injection whereby you inject the object to your class through a setter method instead of the constructor.

```php
<?php

namespace App\Http\Controllers;

use App\User;
use App\Repositories\UserRepository;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    /**
     * The user repository implementation.
     *
     * @var UserRepository
     */
    protected $users;

    /**
     * Create a new controller instance.
     *
     * @param  UserRepository  $users
     * @return void
     */
    public function __construct(UserRepository $users)
    {
        $this->users = $users;
    }

    /**
     * Show the profile for the given user.
     *
     * @param  int  $id
     * @return Response
     */
    public function getSettings(UserSettings $settings)
    {
        return $settings->get();
    }
}
```

As you can see, in this case if we know that the method `getSettings` is the only method that is going to use `UserSettings`, it'd be shame to inject it into the constructor. So, instead we've injected it right into the method itself which Laravel supports out-of-the-box.

## In closing

That's all about how dependency injection works in Laravel. It's a really powerful design pattern and it's essential to understand it better in order to building powerful and large applications using Laravel.
