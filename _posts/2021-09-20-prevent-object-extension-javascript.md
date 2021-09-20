---
layout: post
title: Prevent object extension — Object.freeze() vs Object.seal() vs Object.preventExtensions()
image: /cdn/prevent-object-extension-javascript.png
categories: [JavaScript]
---

When it comes to prevention of modification/updation of an object in [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript), there are few things that you can do.

- **Prevent the extension entirely.**
  - Not having the ability to add new properties or update existing properties or delete existing properties.
- **Partial extension**
  - Having the ability to add new properties but prevent updation of the existing properties. Allow deleting existing properties.
  - Having the ability to add new properties but prevent updation of the existing properties. Don't allow deleting existing properties.

JavaScript provides the following three object methods to satisfy all these scenarios respectively.

> `Object.freeze()`, `Object.preventExtension()`, and `Obejct.seal()`

We'll go over these over these methods and how these works in this order.

* TOC*
{:toc}

## The `Object.freeze()` method

The `Object.freeze()` method freezes an object. As I mentioned previously, it provides the ability to prevent object extension entirely. i.e. new properties can not be added to the object nor it's possible to update the existing properties.

Take the following for example.

```js
const user = {
  name: 'Jemini Merchant',
  sex: 'female',
  school: {
    name: 'SCET'
  }
};

Object.freeze(user);

user.name = 'Jemu';
// TypeError: Cannot assign to read only property 'name' of object 

user.age = 30;
// TypeError: Cannot add property age, object is not extensible
```

As you can tell, when the `user` object is wrapped with the `Object.freeze()` method, adding/updating properties result in different `TypeError`. One states that *"Cannot assign to read-only property 'name' of object"* and the other states *"TypeError: Cannot add property age, object is not extensible"*.

One thing to note here is the `Object.freeze()` method can only "freeze" the top-level properties of an object. Nested objects are still bound to extension.

So, for instance, in the previous example, the `school` object inside `user` is extensible like so.

```js
user.school.name = 'Kadiwala'; // Works fine
user.school.address = 'Surat'; // Works fine
```

it's necessary to wrap the nested object using `Object.freeze()` if you want to freeze them as well like so.

```js
Object.freeze(user.school);

user.school.name = 'Kadiwala';
user.school.address = 'Surat';
// Both will throw a TypeError
```

## The `Object.preventExtension()` method

The `Object.preventExtensions()` method prevents new properties from ever being added to an object but it's still possible to update the existing properties.

Take the following for example.

```js
const user = {
  name: 'Jemini Merchant',
  sex: 'female',
  school: {
    name: 'SCET'
  }
};

Object.preventExtensions(user);

user.name = 'Jemu';
// Works fine

user.age = 30;
// TypeError: Cannot add property age, object is not extensible
```

As you can tell, when the `user` object is wrapped with the `Object.preventExtensions()` method, it's allowed to update the `name` property of the `user` object but when a new property called `age` is added, it would throw a `TypeError`.

Also, when using the `Object.preventExtensions()` method, it's allowed to delete the existing property like so.

```js
delete user.name; // Works fine
```

Similarly to `Object.freeze()`, the `Object.preventExtensions()` method also can not prevent the extension of the nested objects. So, if this is the case, it's necessary to wrap the nested object as well like so.

```js
Object.preventExtensions(user.school);
```

## The `Object.seal()` method

Lastly, The `Object.seal()` method seals an object. The method works the same way as the `Object.preventExtensions()` except when using the `Object.seal()` method, it's not possible to delete the existing properties.

Take the following for example.

```js
const user = {
  name: 'Jemini Merchant',
  sex: 'female',
  school: {
    name: 'SCET'
  }
};

Object.seal(user);

user.name = 'Jemu';
// Works fine

user.age = 30;
// TypeError: Cannot add property age, object is not extensible
```

But this deleting the existing property is not allowed.

```js
delete user.name;
// TypeError: Cannot delete property 'name'
```

Similarly to `Object.freeze()` and the `Object.preventExtensions()` method, the `Object.seal()` method also can not prevent the extension of the nested objects. So, if this is the case, it's necessary to wrap the nested object as well like so.

```js
Object.seal(user.school);
```