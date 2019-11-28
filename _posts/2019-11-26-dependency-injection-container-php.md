---
layout: post
title: Dependency Injection vs. Dependency Injection Container in PHP
categories: [PHP]
image: /cdn/dependency-injection-container.jpeg
excerpt: In this article, I'll talk about Dependency Injection and Dependency Injection Container and why one should use DI Containers.
---

If you've worked with some of the modern framework such as [Laravel](https://laravel.com) or [Symfony](https://symfony.com), I'm sure you've come across this term called ["Dependency Injection"](https://en.wikipedia.org/wiki/Dependency_injection). So, what is dependency injection anyway?

> Dependency Injection (DI) is a design pattern used to implement IoC(Inversion of Control). It is rather a technique using which one object supplies the dependencies of another object.

In other words, a dependent class would receive its dependencies from outside the class, maybe while creating its object or some other ways.

For instance, let's say we have two classes called `PaypalApi` and `StripeApi` as follows:

```php
class PaypalApi
{
    public function getPaymentDetails($customerId) 
    {
        // calls Paypal webservice
    }
}

class StripeApi
{
    public function getPaymentDetails($customerId) 
    {
        // calls Stripe webservice
    }
}
```

And if you want to use one of these in your custom class, you can achieve it like this without using Dependency Injection

```php
class CustomerPayments
{
    public function getCustomerPaymentDetails($customer) 
    {
        $paypalService = new PaypalApi();

        return $paypalService->getPaymentDetails($customer->getId());
    }
}
```

As you can see above, we want to use the `PaypalApi` in our class `CustomerPayments`. So, we instantiated the `PaypalApi` and consumed it likewise. But there's a problem here. The `CustomerPayments` is now tightly coupled to its dependency `PaypalApi` and if we want to use something else, say `StripeApi`, we'll need to rewrite the `getCustomerPaymentDetails` method, which is not a good practice and makes the `CustomerPayments` class unusable for reuse. This is where dependency injection comes into play. The above example can be rewritten using dependency injection as following.

```php
class CustomerPayments
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService) 
    {
        $this->paymentService = $paymentService;
    }

    public function getCustomerPaymentDetails($customer) 
    {

        return $this->paymentService->getPaymentDetails($customer->getId());
    }
}
```

Here, we can now define services using an interface called `PaymentService` like so.

```php
interface PaymentService 
{
    public function getPaymentDetails($address);
}

class PaypalApi implements PaymentService 
{ 
    public function getPaymentDetails($customerId);
    {
        // calls Paypal webservice
    }
}

class StripeApi implements PaymentService 
{ 
    public function getPaymentDetails($customerId);
    {
        // calls Stripe webservice
    }
}
```

Now, it is for the user of the `CustomerPayments` to decide which implementation to use. And it can be changed anytime, without having to rewrite the `CustomerPayments`.

> The `CustomerPayments` is no longer tightly coupled to its dependency.

## What's a DI Container then?

> DI containers are often software libraries that provides Dependency Injection functionality and allows automating many of the tasks involved in **Object Composition**, **Interception**, and **Lifetime Management**. DI Containers are also known as Inversion of Control (IoC) Containers.

If you've noticed in the example above that, we were responsible in handling injecting dependencies to classes. A DI container as it's definition suggests helps in reducing this overhead by analyzing a type's constructor, without the need to having to specify each constructor argument manually.

[PHP-DI](http://php-di.org) is one such library which helps in achieving DI in your PHP projects by providing a DI container. 

Instead of writing following:

```php
$paymentService = new PaypalApi();
$customerPaymentsService = new CustomerPayments($paymentService);
```

Using PHP-DI, you can rewrite like so:

```php
$container = new DI\Container();
$customerPaymentsService = $container->get('PaymentService');
```

And configure which PaymentService PHP-DI should automatically inject in `CustomerPayments` through configuration:

```php
$container->set('PaymentService', \DI\create('PaypalApi'));
```

If you change your mind, there's just one line of configuration to change now.

Behind the scenes, the container uses a technique called **autowiring**. Basically, it will scan the code using PHP's reflection and see what are the parameters needed in the constructors and injects them accordingly.


