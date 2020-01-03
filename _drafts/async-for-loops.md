---
layout: post
title: Aynchronous for loops in JavaScript
categories: [JavaScript]
---

There are several ways to iterate over things in JavaScript. Most notable way is to use loops. Loop constructs includes `for`, `forEach`, `do...while`, `while`, `for...in` and `for...of`. All these constructs loops over synchronous iterables such as arrays, objects, strings etc.

What if you want to iterate over asynchronous iterables such as reading files, generators or any object that implements [async iterable protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator)? There's a special loop construct exists in JavaScript just for this purpose. Enter `for...await...of`.

## What is `for...await...of`?

The for await...of statement creates a loop iterating over async iterable objects as well as on sync iterables such as arrays, objects, strings which I've mentioned previously. Here's how to write such a loop.

```js
for await (variable of iterable) {
  //some logic
}
```
