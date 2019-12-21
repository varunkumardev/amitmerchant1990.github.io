---
layout: post
title: Automatically bind ES6 class functions in callbacks in React
image: /cdn/automatically-bind-class-function-react.png
categories: [React]
---

When using React component using [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes), you must have encountered this phenomenon where you have to explicitly bind the class function and then pass it to the even such as `onClick`. For instance, take the following example.

```jsx
import React from 'react';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {clicked: false};
        
        this.btnClick = this.btnClick.bind(this);
    }

    btnClick() {
        this.setState({
            clicked: true
        })
    }

    render() {
        return(
            <div>
                <ul>
                    <li onClick={this.btnClick}>Hello World</li>
                </ul>
            </div>
        );
    }
}
```

As you can see in the example above, in order to get the `btnClick` working, we need to "bind" the method in constructor explicitly. If we failed to do so, JavaScript will be failed to recognize `this` in the `btnClick` method. This is because in JavaScript, class methods are not [bound](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Function/bind) by default. So, upon binding the method using `bind()`, it will create a new **bound** function, which is an exotic function object (a term from ECMAScript 2015) that wraps the original function object. This will give access to `this` in the callback function. In our case, it's `btnClick`.

So, what's next? What if you don't want to bind the functions explicitly? Well, there are two ways do so. Let's check them out.

## Using public class field syntax

Basically public class field syntax is [an experimental feature](https://babeljs.io/docs/plugins/transform-class-properties/) provided by [Babel](https://babeljs.io). Here, you can use class fields to correctly bind callbacks. Here's how the above example would look like with this syntax.

```jsx
import React from 'react';

class MyComponent extends React.Component {
    state = {
        clicked: false
    }

    btnClick = () => {
        this.setState({
            clicked: true
        })
    }

    render() {
        return(
            <div>
                <ul>
                    <li onClick={this.btnClick}>Hello World</li>
                </ul>
            </div>
        );
    }
}
```

As you can see above, we no longer need to define the constructor of the class as the class field will instantiate the property value to the class' instance. Apart from this, as we're now using the array function syntax of JavaScript, we no longer need to explicitly bind the function because `this` scope inside an arrow function points to the parent scope. 

## Using an arrow function in the callback

In this method, you would use arrow function syntax right into the callback itself. Take a look below.

```jsx
import React from 'react';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {clicked: false};
    }

    btnClick() {
        this.setState({
            clicked: true
        })
    }

    render() {
        return(
            <div>
                <ul>
                    <li onClick={(e) => this.btnClick(e)}>Hello World</li>
                </ul>
            </div>
        );
    }
}
```

However, there's a drawback to this method. So basically, this will create a different callback each time `MyComponent` is rendered. This can be problematic if this callback is passed as a prop to lower components, those components might do an extra re-rendering which can reduce the performance while rendering the components.

That is why the React team recommends using the `bind` or class fields syntax instead of using arrow functions in the callbacks.

