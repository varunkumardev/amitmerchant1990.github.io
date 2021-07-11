---
layout: post
title: How to convert arrays to human-readable lists in JavaScript
image: /cdn/how-to-convert-arrays-to-human-readable-lists-in-javascript.png
categories: [JavaScript]
---

Oftentimes, you might end up in situations where you have an array and you just want to deflate the entire array content in a human-readable form. Or more specifically in a list-like format.

For instance, let's say we have the following array for example.

```js
const books = [
    'Harry Potter',
    'Bhagavad Gita',
    'The Alchemist',
    'Birthday Girl'
]
```

Now, I want to deflate this array in the following form.

*...Harry Potter, Bhagavad Gita, The Alchemist, and Birthday Girl.*

How would you achieve this? Well, at first you might want to reach to use loops to do so but there's a better way to accomplish this in JavaScript.

## The `Intl.ListFormat` object

There's this [ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat) object which falls under the [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) internationalization API which can be used to do just what I explained above.

So, if we want the desired output from our example array, we can do it like so.

```js
const books = [
    'Harry Potter',
    'Bhagavad Gita',
    'The Alchemist',
    'Birthday Girl'
]

const listFormatter = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction'
})

console.log(listFormatter.format(books));
// Harry Potter, Bhagavad Gita, The Alchemist, and Birthday Girl
```

As you can tell, we can achieve this in two parts. 

The first part is to create the formatter using the `Intl.ListFormat` method. This method accepts two optional parameters.

- `locales` - A string with a BCP 47 language tag, or an array of such strings.
- `options` - An object with some or all of the following properties:
    - `localeMatcher` - The locale matching algorithm to use. Possible values are `lookup` and `best fit`; the default is `best fit`.
    - `type` - The format of the output message. Possible values are `conjunction` that stands for "and"-based lists (default, e.g., "A, B, and C"), or `disjunction` that stands for "or"-based lists (e.g., "A, B, or C"). `unit` stands for lists of values with units (e.g., "5 pounds, 12 ounces").
    - `style` - The length of the formatted message. Possible values are: `long` (default, e.g., "A, B, and C"); `short` (e.g., "A, B, C"), or `narrow` (e.g., "A B C"). When style is `short` or `narrow`, `unit` is the only allowed value for the type option.

Once the formatter is created, we can now simply wrap up the array using the `format` method further to format the array to the specified format.

Here are few more examples of using `Intl.ListFormat`.

```js
const books = [
    'Harry Potter',
    'Bhagavad Gita',
    'The Alchemist',
    'Birthday Girl'
]

const listFormatter = new Intl.ListFormat('en-GB', {
    style: 'short',
    type: 'disjunction'
})

console.log(listFormatter.format(books));
// Harry Potter, Bhagavad Gita, The Alchemist, or Birthday Girl

const listFormatter = new Intl.ListFormat('en-GB', {
    style: 'narrow',
    type: 'unit'
})

console.log(listFormatter.format(books));
// Harry Potter Bhagavad Gita The Alchemist Birthday Girl
```

The `Intl.ListFormat` object is supported in [all major browsers currently](https://caniuse.com/?search=ListFormat). So, it's pretty safe to use it in production!