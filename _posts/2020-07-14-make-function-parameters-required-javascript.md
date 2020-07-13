---
layout: post
title: Make function parameters required in vanilla JavaScript
image: /cdn/make-function-parameters-required-javascript.png
categories: [JavaScript]
---

You might be aware of how to set default values for function parameters in JavaScript. For instance, if you want to set the default value for a parameter, you can do it like so.

```js
function say(message='Hi') {
    console.log(message);
}

say(); // 'Hi'
say(undefined); // 'Hi'
say('Hello'); // 'Hello'
```

This is fine. But do you know there's a trick using which you can make function parameters required?

I came to know about this trick while reading [7 Useful JavaScript Tricks](https://davidwalsh.name/javascript-tricks). So, according to this, there would be a function that would just throw a standard error and you can further assign this function to the function parameter like so.

```js
const isRequired = () => { throw new Error('param is required'); };

const hello = (name = isRequired()) => { console.log(`hello ${name}`) };
```

This makes the parameter `name` required. Meaning, it will throw an error if the parameter is left empty or assigned `undefined` like so.

```js
// This will throw an error because no name is provided
hello();

// This will also throw an error
hello(undefined);

// These are good!
hello(null);
hello('Wordl!');
```

This is pretty useful and comes handy at times!