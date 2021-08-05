---
layout: post
title: Filter certain values from the output of JSON.parse() method
image: /cdn/filter-certain-values-from-the-output-of-parse-json.png
categories: [JavaScript]
---

If you've ever worked with JSON objects in JavaScript, you most probably have reached the [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) method at some point or another which parses a JSON string and returns the JavaScript value or object described by the string.

For instance, let's say, you have a JSON string like the following...

```js
const User = `{
  "name": "Cherika",
  "age": 5,
  "is_active": false
}`
```

 and if you want to transform it into a JavaScript object, you can do it using the `JSON.parse()` like so.

 ```js
const userObject = JSON.parse(User);

// { name: 'Cherika', age: 5, is_active: false }
 ```

 Now, what if you want to change the value of a certain key before the function returns the object, how can you do that?

 Well, that is where an optional reviver function that you can pass to the `JSON.parse()` comes into play.

## The reviver function

 So, the way you can do this is you need to pass in a *reviver* function as a second argument to the `JSON.parse()` function. 

 Now, let's say, you want to set the value of the `is_active` key to `true` before it returns the output in the previous example, you can do it like so.

 ```js
const User = `{
  "name": "Cherika",
  "age": 5,
  "is_active": false
}`

const userObject = JSON.parse(User, (key, value) => {
  if (key === 'is_active') {
    return true;
  }

  return value;
});

// { name: 'Cherika', age: 5, is_active: true }
 ```

 As you can tell, the reviver function will receive each `key` and `value` pair as the argument, and from there, you can transform the value based on the key.

 Like in the example above, you can return the value as `true` when the key is `is_active`.

 One thing to note here is, since the reviver function would go over each key-value pair, you need to make sure you are returning a value for each key of the object.

 So, something like the following would result in an `undefined` object.

 ```js
const userObject = JSON.parse(User, (key, value) => {
  if (key === 'is_active') {
    return true;
  }
});

// undefined
 ```