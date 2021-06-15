---
layout: post
title: Constructor assignment of field variables in TypeScript
image: /cdn/constructor-assignment-in-typescript.png
categories: [TypeScript]
---

When you work with [classes](https://www.typescriptlang.org/docs/handbook/2/classes.html) with constructors in TypeScript, the usual way to declare the field variables is like following.

```ts
class Book {
    private name: string;
    private author: string;

    constructor(
        name: string, 
        author: string
    ) {
        this.name = name;
        this.author = author;
    }
}
```

As you can tell, using this approach you will have to declare class field variables at three different places. 

- In the property declaration.
- In the constructor parameters.
- In the property assignment in the constructor body.

This is pretty cumbersome if you ask me. What if I tell you there's a better way to do this?

Enter Constructor Assignment.

## Constructor Assignment

Using constructor assignment, you declare the field variables inline as the constructor parameters. We can rewrite the previous example using constructor assignment like so.

```ts
class Book {
    constructor(
        private name: string, 
        private author: string
    ) {}
}
```

As you can tell, using this approach, you don't have to write a lot of boilerplate code and things look tidy and concise!