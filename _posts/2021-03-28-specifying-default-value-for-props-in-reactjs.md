---
layout: post
title: How to specify default value for props in React.js
image: /cdn/specifying-default-value-for-props-in-reactjs.png
categories: [React]
---

While working on an application which is built using [React.js](https://reactjs.org/), I stumbled upon a use-case where I needed to set a default value for a specific component [prop](https://reactjs.org/docs/components-and-props.html). Let's check the following example to understand how I approached this problem.

* TOC
{:toc}

## The example

So, there is a React component called `<UserPreference>` which can be used for processing various preferences for users. Here's how the component looks like.

```js
function UserPreference(props) {
  return (
    <div>
        <p>Update User Preferences here</p>
    </div>
  );
}
```

Now, the use-case was to pass in a prop to this component which is if `true` should allow the user to edit the preference otherwise it shouldn't allow. So, I passed in a `canEdit` prop to the component which allows user to edit preferences like so.

```jsx
<UserPreference 
    canEdit={true}
/>
```

And here's how I can utilize this prop in the component.

```jsx
function UserPreference(props) {
  if (props.canEdit) {  
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

Now, the problem here is the component is being utilized at many places throughout the application and I didn't want to pass in the `canEdit` prop everywhere. So, I needed to specify a default value for this prop (which is `false`) in case if it doesn't get passed in to the component at all. How can you do it?

## Object destructuring to the rescue

Well, you can use ES6's [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring) to specify a default value for the prop. So, previous example can be changed to use object destructuring like so.

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

As you can tell, you can set the default value for a prop which will be overridden by prop value when given to the component. 
