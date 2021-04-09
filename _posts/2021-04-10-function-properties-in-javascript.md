---
layout: post
title: Function properties in JavaScript
image: /cdn/function-properties-in-javascript.png
categories: [JavaScript]
---

Today I learned something new about JavaScript. i.e JavaScript [functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) can have properties which can be accessed from within the function scope.

This is because,

> In JavaScript, functions are *first-class objects*, because they can have properties and methods just like any other object.

You can add properties to a function using the dot notation like so.

```js
function fn() {
    console.log(fn.prop)
    // This is function property
}

fn.prop = 'This is function property';
fn();
```

As you can tell, you can set a property to the function before calling it. The property can later be accessed within the function when you call it.

This can be useful in scenarios where you want to inject some dependency without changing the function definition.

Check this example.

```js
function updateUser(name, age) {
    if (updateUser.isAllowed) {
        console.log('User updated successfully');
        return;
    }

    console.log('Not allowed');
}

updateUser.isAllowed = true;
updateUser('Jemini', 89)
```

As you can see, we needed a way to check whether the user is allowed to do this update operation and using function properties, it becomes pretty easy to set the property called `isAllowed` on the function without even changing the function definition!