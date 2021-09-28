---
layout: post
title: Always destructure your component props in React.js
image: /cdn/always-destructure-your-component-props-in-react.png
categories: [React]
---

While working with [React.js](https://reactjs.org/) components, there are two ways using which you can retrieve/access the component props.

- By using a single *"props"* object in the function definition.
- By destructuring that *"props"* object in the function definition.

* TOC*
{:toc}

Here's how the single *"props"* object approach would work.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
```

As you can tell, here, the `props` object will hold all the props passed down to the `<Welcome>` component and these can be accessed through the dot notation like so.

## The object destructuring way

The other way to access props is by using ES6’s [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) the *"props"* object in the function definition.

So, for example, if the `<UserDetail>` will have three props, you can specify in the component's function signature like so.

```jsx
function UserDetail({
    name,
    age,
    email
}) {
  return (
    <div>
        <p>Name: {name}</p>
        <p>Age: {age}</p>
        <p>Email: {email}</p>
    </div> 
  )
}
```

## Advantages

My personal favorite is accessing props using this approach because it has some obvious benefits.

- Since, all the props are being destructured right into the function definition, it's easy to comprehend what all props are being used in the component by taking a high-level look over it.

- Also, the code becomes much more readable since you don't have to prepend `props.` every time you want to use a prop.

- The third and most important benefit of this approach is, it is relatively easy to specify a default value for the prop. So, you can do something like this with it.

```jsx
function UserPreference({
    canEdit = false
}) {
  if (canEdit) {  
    return (
        <div>
            <p>Update User Preferences here</p>
        </div>
    );
  }

  return (
    <div>
        <p>You are not allowed.</p>
    </div> 
  )
}
```

As you can tell, in this example, you can set the default value (`false`) for the `canEdit` prop which will be overridden by prop value when given to the component.

So, if the component is called without any prop like so...

```jsx
<UserPreference/>
```

...The value of `canEdit` will be `false`.

This is not really feasible with the first approach.

I have gone through in detail about it in [this post](/specifying-default-value-for-props-in-reactjs/) if you're interested to learn.

And these are the exact reason why I think this should be the recommended convention when it comes to playing with props!