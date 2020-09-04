---
layout: post
title: Named function arguments in JavaScript
image: /cdn/named-function-arguments-in-javascript.png
categories: [JavaScript]
---

A function in JavaScript is a set of statements that performs a task or calculates a value and return it based on the input which is been given to it.

For instance, let's say I have this `User` function which accepts different arguments and logs those details into the console.

```js
const User = (name, age) => {
    console.log(name, age)    
};
```

And you can call it like so.

```js
User('Amit', '30'); // 'Amit' '30'
```

Simple, no? But there is a problem over here and that is by looking at the function call, you can't know what argument is intended for. For that, you'll need to navigate to the definition of the function.

This can get complex if your function has more than two arguments and you just can't wrap your head around all these arguments. How can you solve this? Well, it's turn out you can use JavaScript's [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make this more readable.

## Named arguments

What you'll need to do is to use JavaScript objects to name the arguments. So, our previous example can be re-written like so.

```js
const User = ({name, age}) => {
    console.log(name, age)    
};
```

And this is how we can call the function which will use JavaScrip's [destructing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to resolve the arguments into the function.

```js
User({
  name: 'Amit',
  age: '30'
});

// 'Amit' '30'
```

Looks more readable, right? Now you can easily identify which argument is intended for what without even navigating to the function definition.

## Default argument values

Now, if you want to assign default values to arguments, you can do it like so.

```js
const User = ({name, age, occupation = 'Tester'}) => {
    console.log(name, age, occupation)    
};
```

Here, the `occupation` has the default value `Tester`, so if you don't pass in the `occupation` while calling the function, it's default value will be `Tester`.

```js
User({
  name: 'Amit',
  age: '30',
});

// 'Amit' '30' 'Tester'
```

And when you pass in the `occupation`, it will override the default value like so.

```js
User({
  name: 'Amit',
  age: '30',
  occupation: 'Engineer'
});

// 'Amit' '30' 'Engineer'
```