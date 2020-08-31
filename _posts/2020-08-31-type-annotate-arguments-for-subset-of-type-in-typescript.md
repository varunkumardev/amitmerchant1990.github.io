---
layout: post
title: Type annotate arguments for subset of a given type in TypeScript
image: /cdn/type-annotate-arguments-for-subset-of-type-in-typescript.png
categories: [TypeScript]
---

Often, there comes a scenario when you want to type annotate (or type hint) some of the variables or arguments for a subset of a given type.

For instance, let's say, we have the following interface...

```js
interface User {
    id: number;
    name: string;
    email: string;
}
```

And we want to type annotate one of the arguments of the following function using `User`, we can do it like so.

```js
function updateDetail(user: User) {
    return {...user}
}
```

But let's say, you want to add another argument which will be a subset of `User` type which only includes property `email`, how would do it? Well, there are [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html) in TypeScript that come to rescue in such situations.

## The `Partial<Type>` utility type

So, if we want to type annotate using the subset of `User` we can use `Partial<User>` as a type annotation, which will type check for any subset of `User`. So, if we want to add another argument in the previous function, we can do it like so.

```js
function updateDetail(user: User, details: Partial<User>) {
    // logic to update user detail

    return {...user, ...details}
}
```

And this is how we can call it.

```js
const user = {
    id: 1,
    name: 'Harry Potter',
    email: 'harry@hogwartz.com'
}

const details = {
    email: 'harrypotter@hogwartz.com'
}

const updateUser = updateDetail(user, details);
```

Notice, the `detail` object is the subset of `user`, so this won't throw any type error as long as `detail` is the subset of `user`. But as soon as, `detail` is not a subset of `user`, let's say,

```js
const details = {
    username: 'harrypotter@hogwartz.com'
}
```

...it will throw the following error.

```
Type '{ username: string; }' has no properties 
in common with type 'Partial<User>'
```