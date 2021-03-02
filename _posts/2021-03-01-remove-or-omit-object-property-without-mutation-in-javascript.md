---
layout: post
title: Remove or omit object properties without mutation in JavaScript
image: /cdn/remove-or-omit-object-property-without-mutation-in-javascript.png
categories: [JavaScript]
---

Since [immutability in JavaScript is important](https://stackoverflow.com/a/34385684/1485183) for predictability and performance of your application, we often find ourselves in situations where we need to achieve some of the operations without mutating the original object/array.

One such operation that I came across while working on a [React.js](https://reactjs.org/) app was to remove/omit a certain object property without any sort of mutation to the original object.

For instance, let's say we have the following object.

```js
const user = {
  name: 'Jemini Merchant',
  sex: 'female',
  age: 23
};
```

And now, if we want to remove the `name` and `sex` properties from the `user` object without altering the `user` object, you can do it like the following.

```js
const { name, sex, ...updatedUser } = user;
// updatedUser = { age: 23 }
```

As you can tell, we are using ES6's [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) and [spread opearator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to create a new object out of the `user` object which doesn't have the `name` and `sex` properties.

So, `updatedUser` now holds the updated object leaving the `user` object as is.

## Using computed properties

In some cases, you may want to use a variable instead of passing the property name itself. You can use [computed properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015) along with the `omit` keyword in this case like so.

```js
const varName = 'name';

const { [varName]:omit, ...updatedUser } = user;
// updatedUser = { sex: 'female', age: 23 }
```