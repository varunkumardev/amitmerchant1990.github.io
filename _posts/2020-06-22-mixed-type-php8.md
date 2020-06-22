---
layout: post
title: The mixed type of PHP 8
image: /cdn/mixed-type-php8.png
categories: [PHP]
---

Up until now, or precisely before PHP 8, whenever you were unsure about which type to use for the propperty or return type, you'd leave it without assigning any type. And if you're using an IDE such as [PhpStorm](https://www.jetbrains.com/phpstorm/), the [docBlock](https://en.wikipedia.org/wiki/PHPDoc) would mark those properties as `mixed` type like so.

```php
/**
* Handle an incoming request.
*
* @param  mixed  $request
* @return mixed
*/
public function handle($request)
{
    // processing request

    return $next($request);
}
```

This is fine as long as you want to give some context as to what would be the type of that property but it essentially does not really do type check by the PHP compiler.

So, to mitigate this issue, PHP 8 has [introduced](https://wiki.php.net/rfc/mixed_type_v2) a dedicated `mixed` type that can be used to assign a `mixed` type to the class properties and return type of class methods.

Essentially, A type of `mixed` would be equivalent to `array` or `bool` or `callable` or `int` or `float` or `null` or `object` or `resource` or `string`. So, whenever you would be unsure about the type of the property, you would use `mixed` for the same. The same goes for the return type as well.

Now, the above example could be rewritten with `mixed` type like so.

```php
/**
* Handle an incoming request.
*
* @param  mixed  $request
* @return mixed
*/
public function handle(mixed $request): mixed
{
    // processing request

    return $next($request);
}
```

As you can see, it's now more explicit and now PHP's compiler know what to do with these properties.

The introduction of `mixed` types comes with a certain set of rules that one needs to conform to.

### Mixed types can't be nullable

As the `mixed` type also include `null` type, it would be ridiculous to make it nullable as it would only add duplication of information as `?mixed` would be always be equivalent to be `mixed`. A fatal error would be thrown if `mixed` is used as a nullable.

```php 
function foo(?mixed $arg) {}
// Fatal error: Mixed types cannot be nullable, null is already part of the mixed type.
 
function bar(): ?mixed {}
// Fatal error: Mixed types cannot be nullable, null is already part of the mixed type.
```

### Explicit return for `mixed` type

When using `mixed` as a return type, a value must be explicitly returned from the function, otherwise a `TypeError` will be thrown. 

```php
function foo(): mixed {}
 
foo();
 
// Uncaught TypeError: Return value of foo() must be of 
// the type mixed, none returned
```

### Property types can be "widen" in inheritance

This essentially means if a type of the property is anything from `array` or `bool` or `callable` or `int` or `float` or `null` or `object` or `resource` or `string` in base class, it can be widen by using `mixed` type in the child class. So, the following is valid.

```php
class A
{
    public function foo(int $value) {}
}
 
class B extends A
{
    // Parameter type was widened from int to mixed, this is allowed
    public function foo(mixed $value) {}
}
```

But the vice-versa would be invalid. That is one can not "narrow down" the property type in the child class. So, following would be invalid.

```php
class A
{
    public function foo(mixed $value) {}
}
 
class B extends A
{
    // Parameter type cannot be narrowed from mixed to int
    // Fatal error thrown
    public function foo(int $value) {}
}
```

### Return types can be "narrowed" in inheritance

he mixed return type could be narrowed in a subclass as this is covariant. So, the following would be valid.

```php
class A
{
    public function bar(): mixed {}
}
 
class B extends A
{
    // return type was narrowed from mixed to int, this is allowed
    public function bar(): int {}
}
```

But the vice-versa, i.e. a return type can not be "widen" in the child class. So, the following would be invalid.

```php
class C
{
    public function bar(): int {}
}
 
class D extends C
{
    // return type cannot be widened from int to mixed
    // Fatal error thrown
    public function bar(): mixed {}
}
```

### Assume mixed type when no type is specified

When no type is present for a function parameter, the signature checks for inheritance are done as if the parameter had a `mixed` type. So, you can use `mixed` type for the property in inheritance or leave it without any type whatsoever.

```php
class A
{
    // no type is specified, mixed type is assumed
    public function foo($value) {}
}
 
class B extends A
{
    // mixed type is explicitly specified, and is invariant to
    // type in parent class
    public function foo(mixed $value) {}
}
 
class C extends B
{
    // no type is specified, mixed type is assumed which is
    // invariant to type in parent class
    public function foo($value) {}
}
 
class D extends B
{
    public function foo(mixed $value = null) {}
}
```

### Signature checking of function when no return type present

When no type is present for a function return, the signature checks for inheritance are done as if the parameter had a `mixed` or `void` type. So, the following is valid.

```php 
class A
{
    // no return type is specified, mixed|void is assumed
    public function foo() {}
}
 
class B extends A
{
    // mixed type is explicitly specified. The type 'mixed' is
    // covariant to 'mixed|void' and so is allowed to be declared
    // for this function.
    public function foo(): mixed {}
}
 
class C extends B
{
    // INVALID - no type is specified, mixed|void is assumed.
    // 'mixed|void' is not covariant to 'mixed' and so this breaks LSP.
    // Fatal error is thrown
    public function foo() {}
}
```

But `void` can't be used if `mixed` used as a return type in base class. So, the following would be invalid.

```php
class A
{
    public function foo(): mixed {}
}
 
class B extends A
{
    // INVALID - as void is not subtype of mixed, Fatal error is thrown
    public function foo(): void {}
}
```

> **More in PHP 8**
> - [New String Function](/new-string-functions-php8/)
> - [Non-capturing exception catches](/non-capturing-exception-catches-php8/)
> - [Constructor Property Promotion](/constructor-property-promotion-php8/)
> - [Nullsafe operator](/nullsafe-operator-php/)
> - [Union types](/union-types-php/)
