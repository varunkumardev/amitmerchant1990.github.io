---
layout: post
title: Update URL query parameters as you type in the input using JavaScript
image: /cdn/update-url-query-parameters-as-you-type-in-the-input-using-javascript.png
categories: [JavaScript]
---

Sometimes, there might be a use case where you want to change the URL's query parameters as you type in an input field.

For instance, on this blog, if you type in the search field on the [search page](https://www.amitmerchant.com/search), it will update the URL in the [address bar](https://en.wikipedia.org/wiki/Address_bar) accordingly as well. It will append a `q` query parameter to the URL with the value typed in the search field. This can be useful if you want to make shareable URLs with search keywords.

How would you achieve something like this? Well, to understand it, check the below code snippet first.

```js
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", function(event) {
    let searchParams = new URLSearchParams(window.location.search);

    searchParams.set("q", event.target.value);

    if (window.history.replaceState) {
        const url = window.location.protocol 
                    + "//" + window.location.host 
                    + window.location.pathname 
                    + "?" 
                    + searchParams.toString();

        window.history.replaceState({
            path: url
        }, "", url)
    }
});
```

This is the entire code that will fulfill the use case I talked about. As you can tell, first we have set up a `keyup` event listener on the `search-input` on which we want to change the query parameter upon typing in it.

Next, with the combination of [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams) and [window.location.search](https://developer.mozilla.org/en-US/docs/Web/API/Location/search), we can retrieve the query string of the URL and set a parameter named `q` using the `set` method.

Once that is done, we can go ahead and build the final URL based on the `searchParams` and modify browser's current session history stack using [History.replaceState()](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState).

This way, you can conveniently rewrite URL's query params as you type in the input field!

## Enhancements

The only downside of this approach is that a new browser's session history entry will get added every time you enter a character in the input field.

So, for instance, if you enter `hello`, there will be five browser session history entries for each of these characters.

You can mitigate this by wrapping the `keyup` logic up in a [debounce](https://lodash.com/docs/#debounce) function which delays invoking the `keyup` callback for the specified amount of time and hence it won't create a separate browser's session history entry for each character.