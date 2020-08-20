---
layout: post
title: The difference between for...in & for...of in JavaScript
image: /cdn/difference-between-for-in-for-of-javascript.png
categories: [JavaScript]
---

There are two ways of many using which you can loop over the iterables in JavaScript.

- A `for...in` statement
- A `for...of` statement

While both of the statements can loop over the iterables such as enumerable properties, there are key differences in both which I'll discuss here.

## The #1 Difference

First, the `for...in` can loop through both [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) and [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) while the `for...of` can only loop through Arrays, [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), arguments object. 

For instance, let's say we have the following object.

```js
const car = {
  brakes: '2',
  tires: '4'
}
```

Now, if we can loop over this object using `for...in` like so.

```js
for (let i in car) {
   console.log(car[i]); // "2", "4"
}
```

As you can observe, the `for...in` statement can successfully iterate over the object. But this won't be possible using `for...of` statement.

Upon iterating using the same object using `for...of` statement will result in a [TypeError](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) error like so.

```js
for (let i of car) {
   console.log(i); // TypeError: car is not iterable
}
```

## The #2 Difference

The second and the biggest difference between both of these statements are, by default, the `for...in` iterates over property names and the `for...of` iterates over property values.

For instance, let's say we have the following array.

```js
const rgb = ['red', 'green', 'blue']
```

Let's first iterate it using `for...in`.

```js
for (let key in rgb) {
   console.log(key); // logs "0", "1", "2"
}
```

As you may observe, the `for...in` is iterating over the keys of the array and hence the output is `"0", "1", "2"`.

On the other hand, let's iterate the same array using `for...of`.

```js
for (let value of rgb) {
   console.log(value); // logs "red", "green", "blue"
}
```

As you can see, the `for...of` can only iterate over array values, and hence the output would be `"red", "green", "blue"`.

## In closing

So, by looking at the differences both of these `for` statements, it would be safe to tell that the `for...in` can be used in most of the cases as you'd be using it with both Objects and Arrays and also you can get values of the properties using their keys. However, when you're only working with Arrays and only cares about property values, you'd be better off with the `for...of`. 

If you're a visual learner, there's a video form as well which you can checkout below.

<div class="videowrapper">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/OLSEHF6iFFQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>