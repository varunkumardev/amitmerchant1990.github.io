---
layout: post
title: Things to consider before using arrow functions in JavaScript
image: /cdn/things-to-consider-before-using-arrow-functions-javascript.png
categories: [JavaScript]
---

Although the Arrow functions in JavaScript are a great way to make your code concise and more readable than the regular functions, there are some important things that you should consider before using arrow functions which can even break your application if you're not aware of this.

### Arrow functions don't have their own `this`

A regular function in JavaScript has its own [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) value. So, running the following code in strict mode for instance...

```js
function Person() {
  this.age = 0;

  setInterval(function growUp() {
    console.log(this.age++);
  }, 1000);
}

var p = new Person();
```

...will print `NaN` every second as the functions `Person` and `growUp`, both have their respective `this`. So, the function `growUp` couldn't find `this.age` in its scope and hence the result `NaN`.

On the other hand, an arrow function does not have its own `this`. The `this` value of the enclosing lexical scope is used instead. So, if we use the arrow function instead of `growUp` in the above example...

```js
function Person() {
  this.age = 0;

  setInterval(() => {
    console.log(this.age++);
  }, 1000);
}

var p = new Person();
// 0
// 1
// 2
// and so on..
```

...it will increment the `age` and print it as the enclosing scope for this arrow function is function `Person` and hence it will pick up the `this` of function `Person`.

### Arrow functions can't be used as generators

As the `yield` keyword can not be used within arrow functions, arrow functions can not be used as generators. So, the following would throw in an error.

```js
generateSequence = () => {
  yield 1; // SyntaxError: Unexpected number
  yield 2;
}

let generator = generateSequence();

for(let value of generator) {
  console.log(value); 
}
```

### The `new` keyword can't be used with arrow functions

If you've defined a function using an arrow function, you wouldn't be able to use the `new` keyword to instantiate it as an object as opposed to the regular function objects.

```js
var Book = (type, author) => {
    this.type = type;
    this.author = author;
    this.getDetails = function () {
        return this.type + " written by " + this.author;
    }
}
var book = new Book("Fiction", "Ruskin Bond");
console.log(book.getDetails());
```

So, running the above code will throw the error: `TypeError: Book is not a constructor`.

### Arrow functions shouldn't be used as object functions

As the JavaScript objects don't create their own scope, you need to be careful when using arrow functions as object methods.

Take the following for example.

```js
var Person = {
  firstName: "John",
  lastName : "Doe",
  fullName : () => {
    return this.firstName + " " + this.lastName;
  }
};

console.log(Person.fullName()); // undefined undefined
```

As the `fullName` is an arrow function, it will try to get the enclosing block's `this`. But in this case, the object doesn't have its own scope and hence it's printing `undefined undefined`.

## In closing

As I've mentioned at the beginning of the article, even though arrow functions are great, you need to take care of the aforementioned characteristics of them to decide what is preferable for you according to your use case.