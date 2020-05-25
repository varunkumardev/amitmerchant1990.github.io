---
layout: post
title: Convert long numbers to short and compact form in JavaScript
image: /cdn/compact-number-javascript.png
categories: [JavaScript]
---

JavaScript amazes me everyday when I find something can be done using native JavaScript instead of using heavy-weight libraries or inventing my own functions.

Recently, I found one such thing. There's an [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object which is a standard built-in object in JavaScript that provides language sensitive string comparison, number formatting, and date and time formatting.

The `Intl` object provides access to [several constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Constructor_properties) as well as functionality common to the internationalization constructors and other language sensitive functions.

There is one such constructor called `NumberFormat()` which lets you do language-sensitive number formatting.

For instance, it lets you format a long number to its compact counterpart by providing `notation: "compact"` as an option like so.

```js
new Intl.NumberFormat('en-GB', { 
    notation: "compact"
}).format(987654321);

// → 988M

new Intl.NumberFormat('en-GB', { 
    notation: "compact"
}).format(78656666589);

// → 79B
```

Or you can pass another option `compactDisplay: "long"` to get its more verbose format.

```js
new Intl.NumberFormat(undefined, { 
    notation: "compact",
    compactDisplay: "long"
}).format(78656);

// → 79 thousand
```

You can choose not to supply locale if you're not sure about it. You can specify `undefined` instead of a locale and it'd still work.

```js
new Intl.NumberFormat(undefined, { 
    notation: "compact",
    compactDisplay: "long"
}).format(78656);

// → 79 thousand
```

## Scientific and Engineering notation

Apart from "compact", you can also pass in the "engineering" and "scientific" to the `notation` to get the respective format of the number respectively, like so.

```js
new Intl.NumberFormat(undefined, { 
    notation: "scientific"
}).format(78656666589);

// → 7.866E10

new Intl.NumberFormat(undefined, { 
    notation: "engineering"
}).format(78656666589);

// → 78.657E9
```
