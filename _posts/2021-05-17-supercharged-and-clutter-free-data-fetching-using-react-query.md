---
layout: post
title: Supercharged and clutter-free data fetching using React Query
image: /cdn/supercharged-and-clutter-free-data-fetching-using-react-query.png
categories: [React]
---

When working on enterprise applications, it's often the use-case to fetch data from the server from the frontend. This involves fetching data asynchronously and rendering it to the frontend when the data is fetched successfully or render the error message if something goes wrong during this entire process.

* TOC
{:toc}

So, we can essentially divide the process of fetching data from frontend into three atomic steps:

- Calling the API endpoint
- Rendering the fetched data
- Rendering error message (on failure)

Let's see how you can do this in [React](https://reactjs.org/).

## The problem

If you want to perform an XHR request from a React application, you can use either [Axios](https://github.com/axios/axios), [jQuery AJAX](https://api.jquery.com/jQuery.ajax/), and the browser built-in [window.fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API).

We can call web APIs using the Fetch method and the [useEffect](https://reactjs.org/docs/hooks-effect.html) Hook together. Calling a typical GET request using this method looks like so.

```jsx
import React, { useEffect, useState } from 'react';

function App() {
    const [items, setItems] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("https://api.example.com/items")
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoading(true);
                setItems(result);
            },
            (error) => {
                setIsLoading(true);
                setError(error);
            }
        )
    }, [])

    return(
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoading) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                        {item.name} {item.price}
                        </li>
                    ))}
                </ul>
            );
        }
    )
}

export default App;
```

As you can tell, we are using the `fetch` to call an external API endpoint in the `useEffect` hook. 

Notice that we are using the component's internal state (using `useState`) to render different things such as `items`, loading state, and error. But do you see the problem here? 

There's a lot of boilerplate code. We are using three `useState`s just to manage all these already. This makes the code lengthy and unreasonably complex. And on top of that, you're managing the error handling yourself which can be error-prone in some cases.

How can you simplify if you run into such a scenario? The answer to this is [React Query](https://react-query.tanstack.com/).

## Hello, React Query!

[React Query](https://react-query.tanstack.com/) is a library that is supposed to solve all the problems I mentioned previously. As its homepage suggests...

> React Query makes fetching, caching, synchronizing, and updating server state in your React applications a breeze.

Let's understand how it works. But first, let's install it.

## Installing React Query

You can install React Query with [npm](https://npmjs.com/) and [Yarn](https://yarnpkg.com/) like so.

```bash
$ npm i react-query
# or
$ yarn add react-query
```

## Wiring React Query with your app

Once installed, you can start using it right away without configuring anything upfront.

First, you'll need to pass down the `QueryClient` provided by React Query to your component tree using `QueryClientProvider` like so.

```jsx
// index.js

import { 
    QueryClient, 
    QueryClientProvider
} from 'react-query'

import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
)
```

Once this is done, you're ready to start using React Query in your components.

## Using React Query for `GET` requests

As I mentioned, manually fetching data using the method I mentioned earlier involves a lot of boilerplate code and is looking complex. React Query attempt to solve just that.

So, if we want to write the previous (`GET` request) example using React Query, we can do it like so.

```jsx
import { useQuery } from 'react-query'

function App() {
    const { isLoading, error, data } = useQuery('items', () =>
        fetch('https://api.example.com/items').then(res =>
            res.json()
        )
    )

    return(
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoading) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {data.map(item => (
                        <li key={item.id}>
                        {item.name} {item.price}
                        </li>
                    ))}
                </ul>
            );
        }
    )
}

export default App;
```

As you can tell, you can use the `useQuery` hook to subscribe to a query in your components. What is a "query" then?

> A query is a declarative dependency on an asynchronous source of data that is tied to a unique key. A query can be used with any Promise-based method (including `GET` and `POST` methods) to fetch data from a server.

The `useQuery` hook accepts two parameters:

- A *unique key* for the query
- A function that returns a promise that:
    - Resolves the data, or
    - Throws an error

In our example, we passed in `items` as a unique key to the `useQuery` hook and calling an API using fetch (which returns a promise that can be resolved to the data) or throws an error if the API fails for some reason.

The query results returned by `useQuery` contain all of the information about the query that you'll need for templating and any other usage of the data.

In our example, I have used the following to retrieve several things:

- `isLoading` or `status` === **'loading'** - The query has no data and is currently fetching.
- `error` - If the query is in an `isError` state, the error is available via the `error` property.
- `data` - If the query is in a `success` state, the data is available via the data property.

There are a few more states/properties that you can use to improvise the behavior further.

- `isError` or `status` === **'error'** - The query encountered an error
- `isSuccess` or `status` === **'success'** - The query was successful and data is available
- `isIdle` or `status` === **'idle'** - The query is currently disabled (you'll learn more about this in a bit)
- `isFetching` - In any state, if the query is fetching at any time (including background refetching) `isFetching` will be `true`.

As you can tell, the amount of code required significantly reduced when using React Query as opposed to the previous approach, and on top of this, you also don't need to handle errors and other different states yourself. 

And this is how React Query can make the entire developer experience (DX) of fetching data pretty seamlessly!

## Using React Query for server side-effects

If you want to perform create/update/delete data or perform server side-effects using React Query, you can use something called mutations instead of queries.

To use this, you can use the `useMutation` hook to perform server side-effects.

So, if you are working on a Todo application and want to create a Todo on the server, you can do it using mutation like so.

```jsx
import { useMutation } from 'react-query'

function App() {
   const mutation = useMutation(newTodo => axios.post('/todos', newTodo))
 
   return (
     <div>
       {mutation.isLoading ? (
         'Adding todo...'
       ) : (
         <>
           {mutation.isError ? (
             <div>An error occurred: {mutation.error.message}</div>
           ) : null}
 
           {mutation.isSuccess ? <div>Todo added!</div> : null}
 
           <button
             onClick={() => {
               mutation.mutate({ id: new Date(), title: 'Do Laundry' })
             }}
           >
             Create Todo
           </button>
         </>
       )}
     </div>
   )
}
```

As you can tell, the `useMutation` hook a callback as its only parameter where you can call the API and pass in the required payload.

You can then trigger the mutation by calling the `mutate` method where you can pass variables to your mutations function with a single variable or object.

Just like `useQuery`, `useMutation` also provides all the different states `isLoading`, `error`, `data` and so on to make this entire process seamless.

You can learn more about Mutations [here](https://react-query.tanstack.com/guides/mutations) at its official documentation.

## In closing

React Query is a powerful library and I have just touched the tip of the iceberg in this article. You can do much more than this using React Query such as Prefetching, Query Invalidation, Optimistic Updates, and so on.

So, if you want to learn more about it, you get to check its [official website](https://react-query.tanstack.com/)!