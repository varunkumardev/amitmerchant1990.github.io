---
layout: post
title: How to do type-casting in TypeScript
image: /cdn/typecasting-typescript.png
categories: [TypeScript]
---

The main advantage of using [TypeScript](https://www.typescriptlang.org/) over JavaScript is because the former is a typed language which helps in speeding up the development experience by catching errors and providing fixes before you even run your code. 

So, you'd be assigning types, such as `numbers`, `strings`, `structures`, `boolean` and so forth, to the variables like so.

```ts
let color: string = "blue";
let decimal: number = 6;
let isSent: boolean = false;
```

But take the following scenario. You may need to assign the length of a string stored in a variable declared as `any` to a variable declared as `number`, how would you do that?

```ts
let someValue: any = "this is a string";

let strLength: number = ??;
```

One way is to explicitly "type-cast" the variable to the `string` type and then calculate its length. In TypeScript, you can do typecast by prepending the variable with type enclosed with angle brackets. So, the previous code would be like so.

```ts
let helloWorld: any = "Hello world!";

let strLength: number = (<string>helloWorld).length;
```

This way, we let TypeScript know that we're explicitly "type-casting" the variable for a certain operation and the type to which we are casting it to could be more specific than its current type.

The other way you could do this is by using the `as`-syntax like so:

```ts
let helloWorld: any = "Hello world!";

let strLength: number = (helloWorld as string).length;
```

Both the syntax are equivalent to each other but when you use TypeScript with React, you can only use the as-style type-casting.

Now, there's a typical situation where certain types can not be type-casted to other types. Such as `number` to `string`. Take the following example.

```ts
let someValue: number = 46;

let strLength: string = (someValue as string);
```

When you tried to do the above, TypeScript's compiler will throw the following error as `string` type can not overlap to `number`.

> Conversion of type 'number' to type 'string' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

So, to fix the above code snippet, we'll need to type-cast `someValue` to `unknown` first and then to `string` like so.

```ts
let someValue: number = 46;

let strLength: string = (someValue as unknown) as string;
```
