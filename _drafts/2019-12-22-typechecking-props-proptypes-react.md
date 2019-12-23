---
layout: post
title: Type checking props using PropTypes in React
image: /cdn/type-checking-prop-proptypes.png
categories: [React]
---

JavaScript is not a statically typed language. A language is a statically typed if the type of a variable is known at compile-time instead of at run-time. Common examples of statically-typed languages include Java, C, C++, Swift, Kotlin and Scala. 

JavaScript, in a sense, is a [weakly typed](http://en.wikipedia.org/wiki/Programming_language#Weak_and_strong_typing) language. This nature of JavaScript allows for a lot of flexibility in terms of implicit conversions. 

So, if given:

```js
let a = "5";
```

Here, you can say that `a` is a _string_. However, if you then write:

```js
let b = a + 10;
```

Here, `b` is an int equal to 15, so `a` acted just like an _int_. Of course, you can then write:

```js
let c = a + "Foo";
```

And `c` will equal "5Foo", so `a` is again acting like a string.

Now, coming back to the point of this article. If you want to some add static type checking while working with [React.js](), you can accomplish this using [`PropTypes`](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) which comes in-built in React.

In React, props are the way to "inject" something into the component. So, it's rather a good idea to validate thing for the same. This is where `PropTypes` comes into picture.

`PropTypes` is a class which encompasses a range of validators that can be used to make sure the data you receive on your component is valid. In order to use `PropTypes` on the component, you can assign the special `propTypes` property on the component. For instance, take this example.

```jsx
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: React.PropTypes.string
};

ReactDOM.render(
  <Greeting name={"Amit"} />,
  document.getElementById('example')
);
```