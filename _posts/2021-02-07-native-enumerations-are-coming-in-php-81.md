---
layout: post
title: Native enumerations (enums) are coming in PHP 8.1
image: /cdn/native-enumerations-are-coming-in-php-81.png
categories: [PHP]
---

Enums or enumerations or enumerator types are those little data structures that can be used to define a set of named values. More like constants. For instance, a contract status which can be *"permanent"*, *"temp"*, or *"apprentice"*. Or a order status that can be *"ordered"*, *"dispatched"*, *"shipped"* etc.

You can use an Enum to represent a smallish fixed set of constants or an internal class mode while increasing readability.

* TOC
{:toc}

Languages like Java, C, TypeScript has enums for quite some time now. For instance, if you want to define an enum data type in Java, you can do it like so.

```java
enum Cardsuit { CLUBS, DIAMONDS, SPADES, HEARTS };
...
Cardsuit trump;
```

PHP didn't have a true native implementation of enums. There are libraries out there such as Sptie's [enum](https://github.com/spatie/enum) which somewhat fill this gap. These libraries make use of classes and DocBlock to replicate the behavior of enums. 

But as I said earlier, the native implementation was still missing. And that's where PHP 8.1 comes into play which tries to bring in native enums in PHP.

## Enums in PHP 8.1

If you look at the recent RFCs for PHP 8.1, it seems like the native enumerations are coming in the upcoming version of PHP. While the RFC is still in the voting phase, if you check the number of approved votes it has got, it's pretty evident that it will surely make its way into PHP 8.1.

The [RFC](https://wiki.php.net/rfc/enumerations) I'm talking about is proposed for the target version of PHP 8.1.

Essentially, this PR introduces a new language construct called `enum`. There could be two types of enums.

- **Basic/pure enums**
- **Backed enums**

### Basic/pure enums

A basic enum is the enums whose enumerated cases don't have scalar types. They are simply singleton objects. Here's how an example basic/pure `enum` would look like.

```php
enum OrderStatus {
  case Completed;
  case Dispatched;
  case Shipped;
  case Cancelled;
}
```

As you can tell, 

- A basic enum can be declared using the `enum` keyword followed by the enum name that you want to specify. In this example, it's `OrderStatus`.

- Inside the enum, you can specify a fixed set of legal values that an enum can hold using the keyword `case` followed by the value. In this example, `OrderStatus::Completed`, `OrderStatus::Dispatched`, `OrderStatus::Shipped`, and `OrderStatus::Cancelled` are the only fixed set of values that the `OrderStatus` enum holds.

- Enums can be autoloaded the same way classes, interfaces, and traits are autoloaded. So, if we want to declare the previous enum under a namespace, you can do it like so.

```php
namespace App\Enums;

enum OrderStatus {
  case Completed;
  case Dispatched;
  case Shipped;
  case Cancelled;
}
```

And you can import it like so.

```php
use App\Enums\OrderStatus;
```

- An Enumeration may have zero or more case definitions, with no maximum.

- All Cases have a read-only property, `name`, that is the case-sensitive name of the case itself which can be accessed like so.

```php
print OrderStatus::Completed->name;
// prints "Completed"
```

### Backed Enums

Backed enums are those enums where you can assign scalar values of type `int` or `string` to the enumerated cases. Here's an example backed enum.

```php
enum OrderStatus {
  case Completed = 'completed';
  case Dispatched = 'dispatched';
  case Shipped = 'shipped';
  case Cancelled = 'cancelled';
}
```

As you can see, you can "back" enumeration cases using `int` or `string` values. Hence, it's called "Backed enums".

A few things to note here is, when you back enumeration cases, you would need to be consistent. Meaning, if you're backing cases with `int` values, all cases in the enum should be backed by `int` values. You can not mix `int` and `string` in a single backed enumeration.

Second important thing is, when you back enum cases, all the enumeration cases should be backed. You can not have pure and backed enumerated cases altogether.

You can access the case values using a read-only property called `value` like so.

```php
print OrderStatus::Cancelled->value;

// prints "cancelled"
```

## Fetch Enum Cases

You can fetch all the enum cases of Pure and Backed enums by calling a static method on the enum called `cases()` because both these enum types implement an internal interface named `UnitEnum`. 

The method returns a packed array of all defined Cases in the order of declaration like so.

```php
var_dump(OrderStatus::cases());

/*
[
     OrderStatus::Completed, 
     OrderStatus::Dispatched, 
     OrderStatus::Shipped, 
     OrderStatus::Cancelled
]
*/
```

## Advantage of using enums

Enums can be useful on various occasions. For instance, you can type-check a function against an enumerated type, in which case only values of that type may be passed like so.

```php
use App\Enums\OrderStatus;

function setOrderStatus(OrderStatus $status) {...}

setOrderStatus('Shipped'); // TypeError: setOrderStatus(): Argument #1 ($status) must be of type OrderStatus, string given

setOrderStatus(OrderStatus::Shipped); // Passes
```

On top of this, when used properly, enums can drastically improve code correctness and readability.

## In Closing

So, that was a brief introduction to Enums in PHP 8.1. But there is more to it. It was just the tip of the iceberg. There are a few other things that you can do with enums such as use methods (generic and static), constants, traits right within enums which I haven't covered in this article.

You can learn more about Enums [here at the official RFC](https://wiki.php.net/rfc/enumerations).