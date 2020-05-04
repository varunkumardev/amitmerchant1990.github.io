---
layout: post
title: Supercharge array operations using Set in JavaScript
image: /cdn/array-operations-set.png
categories: [JavaScript]
---

Working with [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) in JavaScript is sometimes painful as there aren't a lot of native functions/methods available to carry out common operations on arrays. For instance, an operation as simple as removing an element from an array takes a lot of amount of code. Check this.

```js
const array = [1, 6, 7];

const index = array.indexOf(6);

if (index > -1) {
  array.splice(index, 1);
}

console.log(array); // Array [1, 7]
```

As you can see, there's a lot of code for this simple operation. But fortunately, with ES6/EcmaScript 2015 we've a nicer way to do things with Array. Enter [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set).

## What is `Set`?

> `Set` is a standard built-in object that lets you store unique values of any type, whether primitive values or object references. 

`Set` objects are collections of values. This includes arrays as well. You can iterate through the elements of a set in insertion order.

Here's how you can create a `Set` object.

```js
new Set([iterable]);
```

- _Parameter_ : `iterable` - if passed, all of its elements will be added to the new Set. If you don't specify this parameter, or its value is null, the new Set is empty.
- _Returns_ : A new `Set` object.

Let's now understand how we can take advantage of `Set` to perform array operations.

### Check if element exists in array

We can pass array to the `Set` object as it's only argument to check if we want to check if the given element exists in the array or not using `has` method.

```js
const arr = [1, 2, 2, 3, 3, 4, 5];
const set = new Set(arr);

console.log(set.has(1)); // true

console.log(set.has(9)); // false
```

### Retrieve the array back from `Set`

You can retrieve the array from `Set` using two different ways. First using an `Array` object, with `Array.from`

```js
const arr = ['foo', 'bar'];
const set = new Set(arr);

let array = Array.from(set)

console.log(array); // Array [ 'foo', 'bar' ]
```

Second, usig [array spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).

```js
const arr = ['foo', 'bar'];
const set = new Set(arr);

console.log([...set]); // Array [ 'foo', 'bar' ]
```

### Add an element in array

To add an element in the array, you can user `add` method by passing the given value as an argument.

```js
const arr = ['foo', 'bar'];
const set = new Set(arr);

set.add('baz');

console.log(set); // Set {'foo', 'bar', 'baz'}
```

### Delete an element from array

To delete an element in the array, you can user `delete` method by passing the given value as an argument.

```js
const arr = ['foo', 'bar', 'baz'];
const set = new Set(arr);

set.delete('baz');

console.log(set); // Set {'foo', 'bar'}
```

### Remove duplicate elements from the array

Because `Set`'s property to store only unique values, this can come in handy to filter out duplicate values from an array.

```js
const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5];

console.log([...new Set(numbers)]); // [2, 3, 4, 5, 6, 7, 32]
```

### Difference between two arrays

This how you can achive difference between two arrays

```js
const arr1 = ['foo', 'bar'];
const arr2 = ['foo'];
const set1 = new Set(arr1);
const set2 = new Set(arr2);

var difference = new Set([...set1].filter(x => !set2.has(x)));

console.log(difference); // Set { 'bar' }
```

## In closing

As we've seen, using `Set` with arrays can be really helpful to accomplish common array operation natively and with an ease without adding any kind of complexity.
