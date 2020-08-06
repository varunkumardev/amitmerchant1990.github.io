---
layout: post
title: TypeScript's private modifiers Vs. ECMAScript's hash(#) private fields
image: /cdn/typescript-private-modifier-vs-ecmascript-hash-private-fields.png
categories: [Typescript]
---

With the release of TypeScript 3.8, the team has introduced support for the ECMAScript Private Fields into the TypeScript itself. Meaning, you can now declare private fields in the class using `#` like so.

```ts
class Person {
  #name: string;

  constructor(name: string) {
    this.#name = name;
  }

  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}
```

By declaring the fields using `#` makes the field "entirely" private. Meaning, these fields can’t be accessed or even detected outside of the containing class - even by JS users.

So, if we try to access the `name` property outside of the class like so...

```ts
let person = new Person("Jon Doe");
  
person.#name;
```

...it will throw the following error.

**Property '#name' is not accessible outside class 'Person' because it has a private identifier.**

On the contrary, if the field is declared using TypeScript's `private` modifier, it will still throw an error at compile-time, but when TypeScript outputs .js files, it will work fine and will allow access to the private field. Take the following for instance.

```ts
class Bar {
  private foo = 10;
}
```

When we'll try to access the `foo` outside the class `Bar` like so...

```ts
console.log(new Bar().foo); // prints '10'
```

...It will give a compile-time error that "Property 'foo' is private and only accessible within class 'Bar'." but when TypeScript outputs .js files, it'll run fine and print `10`.

That's the main difference between Typescript's private modifiers and ECMAScript's hash(#) private fields.

That is, the ECMAScript's hash(#) private fields provide hard privacy is really useful for strictly ensuring that nobody can make use of any of your internals. 

Apart from this, another advantage the ECMAScript's private fields provide is, these fields can't be overwritten in the subclass. Take the following for example.

```ts
class C {
  #foo = 10;

  cHelper() {
    return this.#foo;
  }
}

class D extends C {
  #foo = 20;

  dHelper() {
    return this.#foo;
  }
}

let instance = new D();
// 'this.#foo' refers to a different field within each class.
console.log(instance.cHelper()); // prints '10'
console.log(instance.dHelper()); // prints '20'
```

As you can see, even if the subclass `D` has a similarly named field `foo` like that of the parent class `C`, it hadn't been overridden in `D`. This wouldn't be possible if we had declared those with the regular `private` keyword.

This comes in handy if you’re a library author, removing or renaming a private field should never cause a breaking change.

## In closing

So, the bottom line is, if you only want to enforce the privacy at the compile-time/design-time, go with TypeScript's `private` modifier. For all the other cases, ECMAScript's hash(`#`) private fields can turn out to be a great fit for you.