---
layout: post
title: Define relationships outside of Eloquent models in Laravel
image: /cdn/define-relationships-outside-of-eloquent-models-laravel.png
categories: [Laravel]
---

You might be aware of the typical way of defining model relationships in Laravel [Eloquent](https://laravel.com/docs/7.x/eloquent). i.e inside of the models itself.

For instance, if we want to define a *"one-to-one"* relationship between `Order` and `Customer` model where the `Order` belongs to the `User`, you can define it like so.

```php
namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    /**
     * Get the customer that owns the order.
     */
    public function user()
    {
        return $this->belongsTo('App\Customer');
    }
}
```

Here, the Eloquent will try to match the `customer_id` from the `Order` model to an `id` on the `Customer` model and based on that will fetch the records.

This is one way to define relationships. But there's another way in Eloquent using which you can define relationships on-the-fly outside of the models. Enter `resolveRelationUsing` method.

## The `resolveRelationUsing` method

> Laravel provides this handy method called `resolveRelationUsing` which can be used to define relations between Eloquent models outside of model like so.

So, if we were to define the previous relationship using `resolveRelationUsing`, we can do it like so.

```php
use App\Order;
use App\Customer;

Order::resolveRelationUsing('customer', function ($orderModel) {
    return $orderModel->belongsTo(Customer::class, 'customer_id');
});
```

As you can see, the method accepts two parameters. The first parameter is the name of the relationship that we want to define and second, is a [Closure](https://www.php.net/manual/en/class.closure.php) which receives an instance of the model on which we want to define the relationship.

Inside the Closure, you can define relationships as you'd normally do but with an exception where you'll need to provide explicit key name arguments to the Eloquent relationship methods. In our case, we have passed `customer_id` explicitly.

## Where to define these relationships

Now, a question might be arriving in your mind that where should you define these "on-the-fly" relationships? Well, the answer is, you can define these relationships in the `boot` method of one of your service providers and you'll good to go.

## In closing

Although, this is a handy way of defining model relationships, it's not very much recommended. It would be useful only in scenarios where you're developing an Eloquent package and you want to define/extend relationships without touching model code.