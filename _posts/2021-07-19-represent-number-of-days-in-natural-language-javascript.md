---
layout: post
title: How to represent the number of days in natural language in JavaScript
image: /cdn/represent-number-of-days-in-natural-language-javascript.png
categories: [JavaScript]
---

Extending the use of the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object from the [previous article](/how-to-convert-arrays-to-human-readable-lists-in-javascript/), today we're going to talk about the [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat) object that has an important and relatively frequent usecase in modern web applications.

Take the following for example.

Let's say, you're developing a social media application and when the user of your application posts something, you might want to show the number of days passed since the day it has been posted intrinsically.

For instance, if the user has posted a day ago, you might want to show "yesterday". Or if your application has a schedule post feature where the user has set the post to be published the next day. In such a case, you might want to show "tomorrow".

You can do just that using the `Intl.RelativeTimeFormat` object.

## The `Intl.RelativeTimeFormat` object

Essentially, you can create a relative time formatter in your locale using the [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat) object which can be used to represent days in a natural language.

So, if you want to represent the previous day as "yesterday", you can do it using `Intl.RelativeTimeFormat` like so.

```js
const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", { 
    numeric: "auto" 
});

relativeTimeFormatter.format(-1, "day");
// 'yesterday'

relativeTimeFormatter.format(1, "day");
// 'tomorrow'
```

As you can tell, you can create a relative time formatter using `Intl.RelativeTimeFormat` by passing in the locale as the first parameter and an `option` object as a second parameter.

Here, in this case, we passed in the `numeric: auto` option will produce the string `yesterday` or `tomorrow`. And finally, we can pass the number of days (negative in case if in past) to the `Intl.RelativeTimeFormat.format()` function as the first parameter and you can pass in a string as a second parameter which will be used when the first argument is not `-1` or `1`.

If the value is other than `1` and `-1`, it will intelligently return a related string like so.

```js
const relativeTimeFormatter = new Intl.RelativeTimeFormat("en", { 
    numeric: "auto" 
});

relativeTimeFormatter.format(4, "day");
// 'in 4 days'

relativeTimeFormatter.format(-3, "day");
// '3 days ago'
```

Learn more about [Intl.RelativeTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat/RelativeTimeFormat).