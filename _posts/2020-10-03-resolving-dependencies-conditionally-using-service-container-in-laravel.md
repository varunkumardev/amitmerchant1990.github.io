---
layout: post
title: Resolving dependencies conditionally using service container in Laravel
image: /cdn/resolving-dependencies-conditionally-using-service-container-in-laravel.png
categories: [Laravel]
---

One of the standard ways to resolve dependencies in Laravel is by using [service container](https://laravel.com/docs/8.x/container). Essentially, if you want to inject something which can be swappable anytime, you can do this by "biding" that into the service container.

* TOC
{:toc}

For instance, let's say we're using payment gateways into our application. So, what we can do is define an interface that contains certain methods called `payment` and `discount` like so.

```php
namespace App\Payment\Contract;

interface PaymentInterface
{
    public function payment();

    public function discount();
}
```

And now if we want to use a payment method in our application, we can create a class for that payment method which will implement the `App\Payment\Contract\PaymentInterface`. So, if we're using a credit card payment method, we can create it like so.

```php
namespace App\Payment;

use App\Payment\Contract\PaymentInterface;

class CreditCard implements PaymentInterface
{
    public function payment()
    {
        // process payment
    }

    public function discount()
    {
        // process discount
    }
}
```

## Binding interface to the class

If we want to inject `App\Payment\Contract\PaymentInterface` into any controller constructor across the application and wish that it should get resolved to `App\Payment\CreditCard` class every time, we'd need to bind it into the service container using the `bind` or `singleton` method like so.

```php
$this->app->bind(
    'App\Payment\Contract\PaymentInterface',
    'App\Payment\CreditCard'
);
```

This will tell the container that it should inject the `App\Payment\CreditCard` when a class needs an implementation of `App\Payment\Contract\PaymentInterface`. Now we can type-hint the `App\Payment\Contract\PaymentInterface` interface in a constructor or any other location where dependencies are injected by the service container and it will get resolved to `App\Payment\CreditCard` like so.

```php
use App\Payment\Contract\PaymentInterface;

public function __construct(PaymentInterface $payment)
{
    $this->payment = $payment;
}
```

## Resolve dependencies conditionally/contextually

Imagine now we have another payment method called `App\Payment\Stripe` which is also implementing the `App\Payment\Contract\PaymentInterface` interface and you want to use both payment methods but in different controllers. For instance, you want to use the `CreditCard` class in the `AccountRenewalController` controller and `Stripe` class in the `PurchaseController` controller, how would you do that?

Well, the answer is, we'll need to bind both of them conditionally based on where they are being invoked. This can be achieved using a simple, fluent interface where we can define how dependencies should be resolved in certain scenarios.

So, if we want to resolve `App\Payment\Contract\PaymentInterface` to `App\Payment\CreditCard` in the `AccountRenewalController` controller, we can define the binding like so.

```php
use App\Http\Controllers\AccountRenewalController;
use App\Payment\Contract\PaymentInterface;
use App\Payment\CreditCard;

$this->app->when(AccountRenewalController::class)
          ->needs(PaymentInterface::class)
          ->give(CreditCard::class);
```

And if we want to resolve `App\Payment\Contract\PaymentInterface` to `App\Payment\Stripe` in the `PurchaseController` controller, we can define the binding like so.

```php
use App\Http\Controllers\PurchaseController;
use App\Payment\Contract\PaymentInterface;
use App\Payment\Stripe;

$this->app->when(PurchaseController::class)
          ->needs(PaymentInterface::class)
          ->give(function () {
              return Stripe('sid', 'token')
          });
```

As you can see, you can create contexts based on where the dependencies are being used and return/resolve classes or class instances accordingly.
