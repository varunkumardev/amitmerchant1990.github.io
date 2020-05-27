---
layout: post
title: Strictly check for null and undefined values in TypeScript
image: /cdn/strictly-check-null-undefined-values.png
categories: [TypeScript]
---

In TypeScript, you assign types to variables and function parameters to catch type related errors early, even before you run the code. But TypeScript doesn't warn you when you assign `null` and `undefined` to the variables of common types. 

For instance, take the following example.

```ts
function appendDomain(url: string) {
    return url.concat('.com');
}

console.log(appendDomain('amitmerchant'));
```

I've written this simple function in TypeScript that accepts its only parameter `url` which is of type `string`. Now, this will work fine if you compile it down to the JavaScript file providing I have the following `tsconfig.json` file setup.

```json
{
    "compilerOptions": {
        "target": "esnext"
    }
}
```

Now, if I change provide `null` instead of a valid string, compile and run the generated JS code, I would get the following error.

![](/images/js-type-error.png)

That's because we passed an argument (`null`) for which JavaScript can not find `concat` method on it as it's not a valid string. But TypeScript didn't gave any type error because in TypeScript, `null` and `undefined` can be assigned to any type. So, the following is also perfectly fine as per TypeScript's type checker.

```ts
let title: string;
title = 'Foo Bar';
title = null;
```

This can cause some serious issues if not handled properly. 

*This behavior can be fixed by adding a compiler option called `strictNullChecks` and set it to `true` in `tsconfig.json` like so.*

```json
{
    "compilerOptions": {
        "target": "esnext",
        "strictNullChecks": true
    }
}
```

Upon adding this option, TypeScript's compiler will start showing typing errors because **`null` and `undefined` are no longer valid values for any type**. So, for the above example, it will show the following error.

```
Type 'null' is not assignable to type 'string'.
```

To fix our `appendDomain` function, we can add more types to the arguments to include `null` and `undefined` like so and checking if the provided value in the function is of type `string` explicitly like so.

```ts
function appendDomain(url: string | null | undefined) {
    if (typeof url === 'string') {
        return url.concat('.com');
    }

    return url;
}

console.log(appendDomain('amitmerchant'));
console.log(appendDomain(null));
console.log(appendDomain(undefined));
```

The function can now gracefully accepts `null` and `undefined` and returns values accordingly.
