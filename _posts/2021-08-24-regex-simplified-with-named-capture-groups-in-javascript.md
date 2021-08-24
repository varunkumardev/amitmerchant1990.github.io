---
layout: post
title: RegEx simplified with named capture groups in JavaScript
image: /cdn/regex-simplified-with-named-capture-groups-in-javascript.png
categories: [JavaScript]
---

Regular expressions (RegEx) are great little strings that help in solving some of the complex problems that are rather hard if we don't use the RegExes.

> Essentially, Regular expressions are patterns used to match character combinations in strings.

JavaScript identifies regular expressions as objects and there are methods in JavaScript such as [exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) and [test()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) using which you can test strings based on the regular expression.

* TOC*
{:toc}

## The `exec()` method

One of the main use of regular expressions is to extract information out of the string. You can accomplish this using the [exec()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) method. The `exec()` method executes a search for a match in a specified string. Returns a result array, or `null`.

So, for instance, if you want to extract the words *"Brown"* and *"Jumps"* from the string **"The Quick Brown Fox Jumps Over The Lazy Dog"**, you can do it using regular expressions and the `exec()` function like so.

```js
let regEx = /quick\s(brown).+?(jumps)/ig;
let result = regEx.exec('The Quick Brown Fox Jumps Over The Lazy Dog');

console.log(result);

/*
[
  'Quick Brown Fox Jumps',
  'Brown',
  'Jumps',
  index: 4,
  input: 'The Quick Brown Fox Jumps Over The Lazy Dog',
  groups: undefined
]
*/
```

As you can tell, the `exec()` method has returned an array in this case that includes the matched text as the first item, and then one item for each parenthetical capture group of the matched text.

So, if you want to access the words *"Brown"* and *"Jumps"* respectively, you can do it like so.

```js
result[1] // Brown
result[2] // Jumps
```

That was easy enough, right? But if you notice, there is this last item in the returned array called `groups`. Its value is `undefined` right now. But you can make use of it to simplify this process of extracting information further.

## Named capture groups

As I mentioned previously, the `exec()` method returns an array, and one of the items it returns is called `groups`. What is that? and how can it be useful?

The idea is, we can specify a name to the certain group in the regular expression using the `?<named_group>` format, and then when you use the `exec()` function, it returns the array with the `groups` property which includes all the named groups in form of an object.

Let's modify the previous example to use the named groups.

```js
let regEx = /quick\s(?<brown>brown).+?(?<jumps>jumps)/ig;
let result = regEx.exec('The Quick Brown Fox Jumps Over The Lazy Dog');

console.log(result);

/*
[
  'Quick Brown Fox Jumps',
  'Brown',
  'Jumps',
  index: 4,
  input: 'The Quick Brown Fox Jumps Over The Lazy Dog',
  groups: { brown: 'Brown', jumps: 'Jumps' }
]
*/
```

As you can tell, once the named groups are specified in the regular expression, the returned array now has the `group` property filled in with the captured named groups. 

Now, if you can access these named groups from the `groups` instead of the numbered indexes like so.

```js
result.groups.brown // Brown
result.groups.jumps // Jumps
```

Pretty convenient, right?

It's especially useful in a scenario where you want to extract date's components from a date using a regular expression like so.

```js
const regEx = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = regEx.exec('2011-12-03')

match.groups.year // 2011
match.groups.month // 12
match.groups.day // 03
```

This example is courtesy of Addy Osmani's [tweet](https://twitter.com/addyosmani/status/1386031624232456194?s=20)!