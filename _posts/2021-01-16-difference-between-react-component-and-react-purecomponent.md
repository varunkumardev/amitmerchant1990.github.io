---
layout: post
title: Difference between React.Component and React.PureComponent
image: /cdn/difference-between-react-component-and-react-purecomponent.png
categories: [JavaScript]
---

Currently, there are two ways if you want to create ES6 class components in React.

- By inheriting `React.Component`
- By inheriting `React.PureComponent`

Now, there's a fine difference when creating a component using both of these approaches. Let's first understand what is a `React.Component`.

* TOC
{:toc}

## What is `React.Component`?

Essentially, `React.Component` is the base class for React components when they are defined using ES6 classes. So, when you try to create a React component using `React.Component`, it could look like so.

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Now, when you want to control the component's output based on the current change in state and props, you can make use of React's lifecycle methods. Specifically, in this case, there's a lifecycle method called `shouldComponentUpdate` which you can implement in your component for this purpose only. This method is a "predicate" meaning it returns a `boolean` value. The default value for it is `true`. The method is invoked before rendering when new props or state are being received.

This method has two arguments: `nextProps` and `nextState`. You can compare these with `this.props` and `this.state` respectively if you want to determine if you want to re-render your component or not by returning `true` or `false`.

This is where the `React.PureComponent` differs.

## How's `React.PureComponent` different?

As I discussed earlier, if you want to control the rendering of your component based on the current change in state and props, in the case of creating components from `React.Component`, you would need to implement the 
`shouldComponentUpdate` method into your component explicitly and manually implement all the logic yourself.

Whereas, `React.PureComponent` implements the `shouldComponentUpdate` method which shallowly compares props and state. Meaning, when you create a component by extending `React.PureComponent`, you need to implement it explicitly. The base component does that for you out-of-the-box.

## Advantage of using `React.PureComponent`

There is this main advantage of using `React.PureComponent` over `React.Component`. And that is as it shallowly compares props and state, the component wouldn't get re-rendered if the props and state are the same. Hence, it can boost the performance of your application.

## The caveat

The only caveat here is that the `shouldComponentUpdate` implemented by `React.PureComponent` only shallowly compares state and props which means if the component's props and the state has some sort of hierarchy or complex data-structures in them then there would be inconsistencies in the comparison. 

This behavior can lead to bugs. In such a case, you should consider using [immutable objects](https://facebook.github.io/immutable-js/) or use [deep copying techniques](https://www.amitmerchant.com/deep-copy-objects-using-json-stringify-json-parse/) to facilitate fast comparisons of nested data.

Apart from this, for `PureComponent` to work, all the children component should also be "pure" as `React.PureComponent`’s `shouldComponentUpdate()` skips prop updates for the whole component subtree.