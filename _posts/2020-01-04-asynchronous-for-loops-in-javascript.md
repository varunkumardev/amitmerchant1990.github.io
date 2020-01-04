---
layout: post
title: Aynchronous for loops in JavaScript
image: /cdn/asynchronous-for-loops-in-javascript.png
categories: [JavaScript]
---

There are several ways to [iterate over things](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) in JavaScript. Most notable way is to use loops. Loop constructs includes `for`, `forEach`, `do...while`, `while`, `for...in` and `for...of`. All these constructs loops over synchronous iterables such as arrays, objects, strings etc.

However, what if you want to iterate over asynchronous iterables such as reading files, generators or any object that implements [async iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)? There's a special loop construct exists in ECMAScript 2015 just for this purpose. Enter `for...await...of`.

## What is `for...await...of`?

The _for...await...of_ statement creates a loop iterating over async iterable objects as well as on sync iterables such as arrays, objects, strings which I've mentioned previously. Here's how to write such a loop.

```js
var asyncIterable = {
  [Symbol.asyncIterator]: asyncIterator
};

(async function() {
  for await (variable of asyncIterable) {
    //some logic
  }
})();
```

> 
> `variable` - On each iteration a value of a different property is assigned to variable. variable may be declared with `const`, `let`, or `var`.
> `iterable` - Object whose iterable properties are to be iterated over.
>

The `for...wait...of` loop starts by creating the data source through `[Symbol.asyncIterator]()`. For each time `next()` is called, the loop implicitly await for the promise to resolve. This promise is returned by the iterator method. Notice here, since this uses `await`, you must always use it in an `async` function like normal `await`.

Now, for instance if you want to read a file which is an async operation, you can do it like so.

```js
(async function() {
  for await (const line of readLines(filePath)) {
    console.log(line)
  }
})();
```

Let's take a more realistic example using JavaScript Generators.

```js
async function* asyncGenerator() {
    var array = ['Hello', 'World'];

    while (array.length) {
      yield await array.shift();
    }
}

(async function() {
  for await (const item of asyncGenerator()) {
    console.log(item);
    // 'Hello'
    // 'World'
  }
})();
```

Here, `asyncGenerator` is an async generator which returns array items asynchronously. Here, the generator is async because it return all values asynchronously unlike a synchronous generator. The `for...wait...of` loop waits for each item to resolve before moving to the `next()`. Here, the `next()` is also asynchronous which returns promises. And hence, it's loop-able using _for await... of_ loop.



