---
layout: post
title: Refactor conditions to a method for better readability in PHP
image: /cdn/refactor-condition-method-php.png
categories: [PHP]
---

Refactoring is important in programming things. It is a process of restructuring existing computer code—changing the factoring—without changing its external behavior. It makes code more readable, structured and easy to process. 

There are a lot of ways to refactor the code but I want to talk about this little technique which doesn't take lot of your thinking and makes your code look readable instantly.

So, take this for example function.

```php
class Order 
{
    public function placeOrder()
    {
        if ($this->customer->allowed && $this->customer->hasPayment() && $this->product->inStock) {
            // Process the order
        }
    }
}
```

While this code looks absolutely fine, there's a room for improvement in it in terms of refactoring. If you check the condition in the `placeOrder` method, it checks for number of things in order to process the order further. Now, this looks already cluttered and doesn't give a clue of what all these conditionals are actually doing.

So, what we can do in such case is, refactor the conditional to a separate method whose sole purpose would be to return `boolean` as result of these conditional. Here's we can do it.

```php
class Order 
{
    public function placeOrder()
    {
        if ($this->canProcessOrder()) {
            // Process the order
        }
    }

    private function canProcessOrder()
    {
        return $this->customer->allowed && $this->customer->hasPayment() && $this->product->inStock;
    }
}
```

We now have refctored all the conditions to a method named `canProcessOrder` and used that in the `if` statement. What this change immediately bring in is, whoever reads the code, would immediately get what is the purpose of the condition by just looking at the thoughtfully selected name of the method. 

Now, the `placeOrder` method looks more cleaner to look at and has a single responsibility. And when there's another condition to add in the future, you can always add that to `canProcessOrder` method whithout messing the `placeOrder` method.

You can take it further by simplifying the `canProcessOrder` method using early return method like so.

```php
private function canProcessOrder()
{
    if (!$this->customer->allowed) {
        return false;
    }

    if (!$this->customer->hasPayment()) {
        return false;
    }

    if (!$this->product->inStock) {
        return false;
    }

    return true;
}
```

Looks even more pleasing to the eyes, right?