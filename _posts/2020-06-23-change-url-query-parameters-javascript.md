---
layout: post
title: Change URL query parameters using JavaScript
image: /cdn/change-url-query-parameters-javascript.png
categories: [JavaScript]
---

While working on [Your First Commit Ever](https://www.amitmerchant.com/your-first-commit-ever/), there arised a requirement in which I had to update/change the URL's query paramter based on the user input.

To give a primer, this app contains an only input where a user can enter their GitHub username and once hit Enter, the app would fetch the very first commit of that particular user using [GitHub Developer API](https://developer.github.com/v3/) like so.

![Your First Commit Ever Demo](/images/your-first-github-commit.png)

Now, I wanted change the URL's query parameter based on the entered input. So, for example if user enter `amitmerchant1990`, the app should append `?user=amitmerchant1990` to the URL. So, the URL will become *"https://www.amitmerchant.com/your-first-commit-ever/?user=amitmerchant1990"*.

This is because I wanted to make the URLs sharable. The app would fetch the results based on the `user` param as well.

So, to update the query parameter, I used the following code.

```js
let searchParams = new URLSearchParams(window.location.search);
searchParams.set("user", githubUserName);
window.location.search = searchParams.toString();
```

The code would first try to fetch the query string (if there is any) using the [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) by passing in the URL's existing query string using [location.search](https://developer.mozilla.org/en-US/docs/Web/API/Location/search). 

Then, it would set the `user` param using the `set` method of the `URLSearchParams` interface. 

And then, it would set the updated parameters once again by assining `searchParams` to `location.search`.

This will update the existing `user` parameter or append `user` parameter if doesn't exist in the query string.

This works even when there's no query parameters at all!