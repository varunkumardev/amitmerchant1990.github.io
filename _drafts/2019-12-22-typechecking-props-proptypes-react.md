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

In React, _props_ are the way to "inject" something into the component. So, it's rather a good idea to validate things for the same. This is where `PropTypes` comes into picture.

[`PropTypes`](https://github.com/facebook/prop-types) is a class which encompasses a range of validators that can be used to make sure the data you receive on your component is valid. In order to use `PropTypes` on the component, you can assign the special `propTypes` property on the component. For instance, take this example.

```jsx
class Button extends React.Component {
  render() {
    return (
      <button id={this.props.id}>{this.props.name}</button>
    );
  }
}

ReactDOM.render(
  <Button name={'Submit!'} id={10} />,
  document.getElementById('example')
);
```

Here, the `Button` component accepts two props: the one is `name` which is a string and the second one is `id` which is the `id` of the button. Now, if we want to enforce types on this props we could do using `propTypes` like so.

```jsx
class Button extends React.Component {
  render() {
    return (
      <button id={this.props.id}>{this.props.name}</button>
    );
  }
}

Button.propTypes = {
  id: React.PropTypes.number,  
  name: React.PropTypes.string
};

ReactDOM.render(
  <Button name={'Submit!'} id={10} />,
  document.getElementById('example')
);
```

[Try this on CodePen](https://codepen.io/amit_merchant/pen/MWYmJNj)

> **Note**
>
> From React v15.5, `PropTypes` comes as a separate [node library](https://www.npmjs.com/package/prop-types) which you can install in your project by `npm install --save prop-types`
> Which can be consumed like so: 
> ```js
> import PropTypes from 'prop-types';
> ```

The `PropTypes` class exports a range of validators that can be used to make sure the data you receive is valid. Here, we've assigned `PropTypes.string` to `name` and `PropTypes.number` to `id` prop. 

When an invalid value is provided for either of props, a warning will be shown in the JavaScript console like so. For instance, if I provide a string to the `id` prop,

```jsx
<Button name={'Submit!'} id={'myBtn'} />
```

It will throw the warning like so.

```
Warning: Failed prop type: Invalid prop `id` of type `string` supplied to `Button`, expected `number`.
in Button
```

We can also modify certain `propTypes` to be required by adding `isRequired` to the type like so.

```jsx
Button.propTypes = {
  id: React.PropTypes.number.isRequired,  
  name: React.PropTypes.string.isRequired
};
```

## Default prop values using `defaultProps`

In case if you want to assign default values to the component's props, React provides this provision as well. You can do this by assigning `defaultProps` property on the component like so.

```jsx
// Code commented for brevity

Button.defaultProps = {
  id: 10,  
  name: 'Submit!'
};

ReactDOM.render(
  <Button />,
  document.getElementById('example')
);
```

Notice how you can skip providing props on the component when using `defaultProps`.

## List of all the validation rules

Here's the list of all the different kind of validation rules included in `PropTypes`.

```js
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // You can declare that a prop is a specific JS type. By default, these
  // are all optional.
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // Anything that can be rendered: numbers, strings, elements or an array
  // (or fragment) containing these types.
  optionalNode: PropTypes.node,

  // A React element.
  optionalElement: PropTypes.element,

  // A React element type (ie. MyComponent).
  optionalElementType: PropTypes.elementType,
  
  // You can also declare that a prop is an instance of a class. This uses
  // JS's instanceof operator.
  optionalMessage: PropTypes.instanceOf(Message),

  // You can ensure that your prop is limited to specific values by treating
  // it as an enum.
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // An object that could be one of many types
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // An array of a certain type
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // An object with property values of a certain type
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // An object taking on a particular shape
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),
  
  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),   

  // You can chain any of the above with `isRequired` to make sure a warning
  // is shown if the prop isn't provided.
  requiredFunc: PropTypes.func.isRequired,

  // A value of any data type
  requiredAny: PropTypes.any.isRequired
};

```
