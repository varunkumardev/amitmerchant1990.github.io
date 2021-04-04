---
layout: post
title: Delay dispatching actions in Redux using Thunk middleware
image: /cdn/delay-dispatching-actions-in-redux-using-redux-thunk-middleware.png
categories: [Redux]
---

Managing the [application state](https://reactjs.org/docs/state-and-lifecycle.html) in a modern frontend application is hard. But it's tools like [Redux](https://redux.js.org/) which makes it all breeze for us.

But everything has limitations and so does Redux. To understand the limitation of Redux, let's first understand how Redux works in a nutshell.

* TOC
{:toc}

## The Redux genesis

Redux essentially tries to solve the basic issue with state management. i.e it makes the store available centrally throughout the application. Redux does this by mainly using three concepts.

- **Store** - The object which holds the application state.
- **Action creators** - These are the functions that return objects that can be used to change the state by emitting actions for certain tasks.
- **Reducer** - This is a pure function that transforms the state based on the actions dispatched to it.

First and foremost, you would need to create a central store for your application. So, if we were to make a *Todo app*, you can do it by using `createStore()` like so.

```jsx
// index.js

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

As you can tell, you can then wrap your entire app with the `<Provider />` component of Redux. This makes the Redux store available to the rest of the app.

Next, we need a reducer. The reducer for this app same would look like so.

```js
// ./reducers/index.js

function (state = [], action) => {
    switch (action.type) {
        case 'CREATE_TODO':
            return state.concat([action.text])
        case 'DELETE_TODO':
            return state.filter(function (val, key) {
                return key !== action.id
            })
        default:
            return state;
    }
}
```

As you can tell, the reducer is a pure function and it essentially accepts two parameters:

- **The application state**
- **Dispatched action**

You can perform various operations based on the type of action. For instance, if you want to create a new Todo list item, you can dispatch an action of type `CREATE_TODO`.

And how do you dispatch actions?

To dispatch actions, you would first need to create actions. Here's how different actions for our Todo app would look like.

```js
// actions/todos.js

export function createTodo(text) {
    return {
        type: 'CREATE_TODO',
        text
    }
};

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        id
    }
};
```

As you can see, actions are nothing but functions that returns an object with an action type and a payload. So, in our example, if we want to create a Todo list item, we can dispatch the `createTodo()` action with the Todo text. 

But before that, we would need to [connect](https://gist.github.com/gaearon/1d19088790e70ac32ea636c025ba424e) our React component with the Redux store which will enable the component to use the global state as well as dispatching various actions.

Here's how we can connect the component with Redux.

```jsx
import React from 'react';
import { connect } from 'react-redux';
import { createTodo, deleteTodo } from './actions/todos';

function App() {
    render() {
        return (
            //
        )
    }
}

export default connect(state => ({
    todos: state.todos
}), { createTodo, deleteTodo })(App);
```

As you can tell, the `connect` function from `react-redux` can be used to inject Redux-related props into your component with the first argument being formally called `mapStateToProps` which as its name suggests "maps the global state to the component's props". Meaning, the global state would be available in the component through props.

Similarly, the second argument is an object, formally called `mapDispatchToProps` which as its name suggests "maps the actions to the component's props". Meaning, you can specify all the action which you would need in your component. And those would be available through component's props.

So, back to where we were. If we want to create a Todo list item, we can do it by dispatching the `createTodo()` action from within the component like so.

```jsx
function App(props) {
    submitTodo = () => {
        props.createTodo('Buy groceries');
    }

    render() {
        //
    }
}
```

## The problem

This is all fine until you're doing all these operations on the client-side only. But imagine, one day you want to synchronize all the todos on the server. Meaning, you would create the todo on the server first and then alter the application state based on the response. This is when the asynchronous nature of the application comes into play and only using Redux would no longer work. Why? Because all Redux does is dispatching an action to the reducer synchronously to alter the store. And that's the problem. 

We need something which can enable redux to handle asynchronous operations besides having synchronous ones. And that is where `redux-thunk` comes into the picture.

## Enter `redux-thunk`

[Redux Thunk](https://github.com/reduxjs/redux-thunk) is a [middleware](https://en.wikipedia.org/wiki/Middleware) for Redux which, as I mentioned, can enable redux to handle asynchronous operations. It allows you to write action creators that return a function instead of an action. 

The thunk can be used to delay the dispatch of an action or to dispatch only if a certain condition is met. The inner function receives the store methods `dispatch` and `getState` as parameters. I'll explain how this works in the coming sections.

## Installing `redux-thunk`

Before using `redux-thunk`, you would need to first install it in your application using `npm` or `yarn` like so.

```bash
$ npm install redux-thunk

$ yarn add redux-thunk
```

## Using `redux-thunk`

Once installed, you can start using it by using [applyMiddleware()](https://redux.js.org/api/applymiddleware) when creating the store.

```jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

// Note: this API requires redux@>=3.1.0
const store = createStore(rootReducer, applyMiddleware(thunk));
```

This is all you'll need to start using `redux-thunk` in your application!

## Async action creators

Now, back to our example. The action creator that we are using to create the Todo list item currently looks like this.

```js
export function createTodo(text) {
    return {
        type: 'CREATE_TODO',
        text
    }
};
```

As I mentioned, our goal is to save the Todo to the server first and alter the application state based on the response. To do that, we will create a new action creator which will use `redux-thunk`. Here's how it will look like.

```js
function syncTodo(text) {
    return function(dispatch) {
        return fetch('https://fancyserver.org/createtodo', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ todo: text })
        }).then((response) => {
            if (response.ok) {
                dispatch(createTodo(text));
            }
        }).catch((error) => {
            dispatch(errorCreatingTodo(error))
        });
    };
}
```

As you can see, the action creator here is not a regular redux one. Instead of returning an object, this action creator returns a function. Inside of which you can perform any sort of async operations (calling an API) and on the successful response from the API, you can dispatch the regular `createTodo()` action using the `dispatch` method.

You can now dispatch this action just like how you would dispatch a regular redux action.

```js
store.dispatch(syncTodo('Learn React.'));
```

And that is it! This is all `redux-thunk` basically allows you to do.

## Conditionally dispatching actions

Since the thunk action creator just returns a function, you can also do conditional dispatching of redux actions besides calling APIs. Here's how it works.

```js
function syncTodo(text) {
    return function(dispatch) {
        if (someCondition) {
            return dispatch(createTodo(text));
        } else {
            return dispatch(createTodo('Can not create todo.'));
        }
    };
}
```