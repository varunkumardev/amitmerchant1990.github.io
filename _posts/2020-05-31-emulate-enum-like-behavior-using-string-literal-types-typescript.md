---
layout: post
title: Emulate enum-like behavior using string literal types in TypeScript
image: /cdn/string-literal-types-typescript.png
categories: [TypeScript]
---

Sometimes, all you want to do is a custom type populated with a set of predefined strings which can be used to restrict a variable to only have values from this set of strings.

In [TypeScript](https://www.typescriptlang.org/), this can be done by using "string literal types" which allow you to specify the exact value a string must have. In other words, string literal types can be used to create [enum-like](https://www.typescriptlang.org/docs/handbook/enums.html) behavior without adding many complexities.

So, for instance, if you want to make a string literal type of the post status, here's how you can do so.

```ts
type PostStatus = "draft" | "published" | "archived";
```

As you can see, the type is composed using nothing but a unionization of certain string values. In this case, different statuses of a post.

Now, you can apply this type to a variable like so.

```ts
class Post {
    setStatus(status: PostStatus): void
    {
        if (status === "draft") {
            // ...
        } else if (easing === "published") {
        } else if (easing === "archived") {
        } else {
            // error! should not pass null or undefined.
        }
    }
}

let post = new Post();
post.setStatus("published");
post.setStatus("canceled"); // error: "canceled" is not allowed here
```

Here, the method can take in any of the three allowed strings (`draft`, `published`, `archived`) but any string other than these will give the following error.

```
Argument of type '"canceled"' is not assignable to parameter of type '"draft" | "published" | "archived"'
```





