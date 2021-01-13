---
layout: post
title: Deep copying objects using JSON.stringify and JSON.parse
image: /cdn/deep-copy-objects-using-json-stringify-json-parse.png
categories: [JavaScript]
---

There are a lot of reasons where you would want to "deep copy" objects in your application. For instance, when working with React.js, you might have used the `shouldComponentUpdate` life-cycle method. In this method, you would determine if the component has the same props and state as it had previously by shallow or deep copying objects.

But what is a deep copy? To understand deep copy, let's first understand what is a shallow copy.

* TOC
{:toc}

## A word on shallow copying

You are shallow copying objects when some part of the object is still connected to the original variable. Let's understand this by an example. 

For instance, let's say, we have the following object.

```js
let user1 = {
  name: 'Amit',
  age: 30,
};
```

Now, if we want to copy `user1` to another variable say `user2`, we can do this using two ways.

- Using [object spreading](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- Using [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method

For instance, you can copy the object `user1` to `user2` using object spreading or `Object.assign` like so.

```js
let user2 = {...user1};

// or 

let user2 = Object.assign({}, user1);
```

Now, if we change something in the `user2` object, let's say the `name` property, it won't affect `user1`.

```js
user2.name = 'Jemini';

console.log(user2);
// { name: 'Jemini', age: 30 }

console.log(user1);
// { name: 'Amit', age: 30 }
```

As you can see, we were successful in altering the `user2` object without affecting the `user1` object.

This is all fine but things get tricky when you introduce another level in your object. i.e a nested object. For instance, let's add the `school` object in the previous example and copy that object to `user2` using the same technique, and let's see what happens.

```js
let user1 = {
  name: 'Amit',
  age: 30,
  school: {
    name: 'SCET'
  }
};

let user2 = {...user1};

user2.name = 'Jemini';
user2.school.name = 'Kadiwala';

console.log(user2);
// { name: 'Jemini', age: 30, school: { name: 'Kadiwala' } }

console.log(user1);
// { name: 'Amit', age: 30, school: { name: 'Kadiwala' } }
```

As you can tell, when changing the `school.name` in the `user2` object, it also gets reflected back to the `user1` object. This is called **shallow copying**. Which is some part of the object is still connected to the original variable since they are only pointers/references.

So, what would you do if you deep copy this object? i.e to also copy the objects inside the object?

Well, a simple solution is to use `JSON.stringify` and `JSON.parse`.

## Simple way of deep copying objects

So, if you simply want to deep copy the object to another object, all you will need to do is `JSON.stringify` the object and parse it using `JSON.parse` afterward. This will essentially perform deep copying of the object. 

So, our previous example would look like so.

```js
let user1 = {
  name: 'Amit',
  age: 30,
  school: {
    name: 'SCET'
  }
};

let user2 = JSON.parse(JSON.stringify(user1));

user2.name = 'Jemini';
user2.school.name = 'Kadiwala'

console.log(user2);
// { name: 'Jemini', age: 30, school: { name: 'Kadiwala' } }

console.log(user1);
// { name: 'Amit', age: 30, school: { name: 'SCET' } }
```

As you can tell, this time around, when changing `school.name` of `user2`, it doesn't get reflected to `user1`. This is the simplest way of deep copying any level of nested objects without applying manual work such as manually spreading the nested object.

## The caveat

There's the only caveat with this approach is, you can't really able to copy custom class instances. This can only be used when your object has native JavaScript values such as Number, String, Boolean, etc.
