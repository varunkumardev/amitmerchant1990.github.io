---
layout: post
title: Abort a fetch request manually in JavaScript
image: /cdn/abort-fetch-request-manually-in-javascript.png
categories: [JavaScript]
---

The [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API, as you might know, is a modern replacement of the good old [XHRHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (popularly known as Ajax) that gives nicer developer experience (DX) by giving a promise based implementation.

* TOC*
{:toc}

Here's a simple example of how you would make a GET request to this API: [https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('success!');
  })
  .catch(error => {
    console.log('API failure' + error);
  });
```

This is great but sometimes, you may want to abort the already initiated request for some reason. 

For instance, in React.js, when the component is being unmounted, the request must get aborted.

Turns out, it's rather easy to do so.

## The `AbortController` interface

The modern browsers come bundled with the [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) interface that represents a controller object that allows you to abort one or more Web requests as and when desired.

Now, the `AbortController` interface has a property and a method.

- [AbortController.signal](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/signal) - The `signal` property Returns an AbortSignal object instance, which can be used to communicate with, or to abort, a DOM request.
- [AbortController.abort()](https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort) - The `abort()` method Aborts a DOM request before it has completed.

## Aborting the request

To abort a fetch request, we need to create a controller using the `AbortController()` constructor and then get a reference to its associated `AbortSignal` object using the `AbortController.signal` property.

```js
var controller = new AbortController();
var signal = controller.signal;
```

We'll then need to pass this `signal` as a second parameter (which is an optional one) to the `fetch()` method called `init`. This will associate the signal and controller with the fetch request and allows us to abort it by calling `AbortController.abort()` like so.

```js
controller.abort();
```

## A real-world example

Here's a React's [useEffect()](https://reactjs.org/docs/hooks-effect.html) hook example to showcase this altogether.

```js
var controller = new AbortController();
var signal = controller.signal;

useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1', { signal })
        .then(response => {
            console.log('success!');
        })
        .catch(error => {
            console.log('API failure' + error);
        });

    return () => {
        // Abort if the component is unmounted.
        controller.abort();
    }
}, []);
```

As you can tell, the initiated fetch request will get aborted once the component is unmounted. This will result in an API failure and will be eventually caught by the `catch` block.