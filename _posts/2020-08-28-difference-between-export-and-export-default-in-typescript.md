---
layout: post
title: Difference between Export and Export Default in TypeScript
image: /cdn/difference-between-export-and-export-default-in-typescript.png
categories: [TypeScript]
---

When it comes to exporting modules, there are two primary ways in TypeScript using which you can do this. 

- Using `export`
- Using `export default`

There are key differences when you export modules using both of these keywords. I'll describe those differences in this article. Although the article is intended for TypeScript, the rules should apply to [ES6/ECMAScript 2015](http://www.ecma-international.org/ecma-262/6.0/) as well.

So, let's start with `export`.

* TOC
{:toc}

## The `export` keyword

When you want to export a class(or variable, function, class, type alias, or interface) that can be ready to be consumed by other modules, it can be exported using the `export` keyword.

For instance, If you have a `User` class that you want to export, you can do it from the `Users.ts` file like so.

```js
export class Users {
    fetchUsers() {
        console.log('Users component is loaded...')
    }
}
```

Now, when you want to import it in another module, you can import it at the top of the file like so.

```js
import {Users} from "./Users";
```

Notice, we have used the array destructuring syntax of ES6 over here to retrieve `Users` from `Users.ts`. 

So, whenever we export a module using `export`, it's important to make sure that the class, function, variable or interface that you're exporting has a name. And because, it's important to have a named declaration (such as a variable, function, class, type alias, or interface), you can export multiple declarations from the same file.

So, the following is valid.

```js
// main.ts

class Users {
    fetchUsers() {
        console.log('Users component is loaded...')
    }
}

class Posts {
    fetchPosts() {
        console.log('Posts component is loaded...')
    }
}

export {Users, Posts}
```

This can be imported like so.

```js
import {Users, Posts} from `./main`;
```

## The `export default` statement

On the other hand, if you export a declaration using `export default`, it's not mandatory to use named declarations. So, if you want to export a class, you can do it like so.

```js
// Users.ts

export default class {
    fetchUsers() {
        console.log('Users component is loaded...')
    }
}
```

As you can see, we didn't have the name of the class over here. Classes and function declarations can be authored directly as default exports. Default export class and function declaration names are optional. And if we want to import this in another module, we can do it like so.

```js
import UsersFactory from "./Users";
```

Notice, when the module is exported as default, you don't have to use array destructuring and you can import under whatever name you want. As you can see, I've imported it under the `UsersFactory` name.

>  **Important:** There can only be one default export per module.

Apart from this, `default` exports can also be just values:

```js
// OneTwoThree.ts

export default "123";
```

This can be imported as follows:

```js
import num from "./OneTwoThree";

console.log(num); // "123"
```

## Using `export` & `export default` together

You can even use `export` & `export default` together. The only thing that needs to keep in mind is, you can only use a default export in the entire module once. Here's how you can use it.

```js
// main.ts

class Users {
    fetchUsers() {
        console.log('Users component is loaded...')
    }
}

export default class Posts {
    fetchPosts() {
        console.log('Posts component is loaded...')
    }
}

export {Users};
```

This can be imported as follows:

```js
import {Users}, Posts from "./main.ts";
```