---
layout: post
title: How to check if the API call is failing using Fetch in JavaScript
image: /cdn/check-if-api-failing-fetch-javascript.png
categories: [JavaScript]
---

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) as we all know is the modern replacement to the good old [XHRHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) AKA Ajax as it's much simpler and uses [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). It's great to make API calls without adding any third-party library overhead.

So, for instance, if I want to make a GET call to this API ([https://jsonplaceholder.typicode.com/posts/1](https://jsonplaceholder.typicode.com/posts/1)), I can comfortably do it like so.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    console.log('suucess!');
  })
  .catch(error => {
    console.log('API failure' + error);
  });
```

Now, as you can see here, the Fetch API will call the provided endpoint and return whatever response in form of a Promise. But there's a catch. The Fetch API can't distinguish between a successful or a bad response sent by the server.

Irrespective of bad response, say ***404*** or ***500***, it will still fulfill the promise and goes into `then()`. So, for instance, the following endpoint [https://jsonplaceholder.typicode.com/posts/1483948389](https://jsonplaceholder.typicode.com/posts/1483948389) would return 404 as `1483948389` is a non-existent post ID but still, the Fetch API wouldn't throw any error.

To get around this, the Fetch API provides two object variables mainly `status` and `ok`.

- `Response.ok` - Returns true if the response returned successfully.
- `Response.status` - Returns status code of the response.

Using these object variables, one can identify if the request is successful or failing.

So, in the previous example, if we use some non-existent post ID, we can use `status` and `ok` the bad request like so.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1483948389')
  .then(response => {
    console.log(response.status, response.ok); // 404 false 
  })
  .catch(error => {
    console.log('API failure' + error);
  });
```

As you can see, the `response.status` states that the response is `404` and `response.ok` states that the request is failing. Check it in action below.

<iframe height="400px" width="100%" src="https://repl.it/@amitmerchant/JS-Fetch-API?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>