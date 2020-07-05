---
layout: post
title: Make repetitive CSS compact using :is() pseudo-class function
image: /cdn/make-repetitive-css-compact-is-pseudo-class-function.png
categories: [CSS]
---

The CSS has many experimental features, that if used cautiously, can be proven very handy in simplifying things.

For instance, the `:is()` CSS [pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) function. What this function does is it takes a selector list as its argument and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form.

So, if you've following CSS at hand...

```css
header p:hover,
main p:hover,
footer p:hover {
  color: red;
  cursor: pointer;
}
```

Here, `p:hover` is *"common"* across all three selectors. The `:is()` function can be used to shorten this to the following.

```css
:is(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
```

As you can see, it looks more concise and refactorable now.

But as I said, this function is an experimental one. So, not every browser has support for the same. So, to mitigate this you can use fallback functions for the same like `*-any()` or `:matches()`.

```css
:-webkit-any(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
:-moz-any(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
:matches(header, main, footer) p:hover {
  color: red;
  cursor: pointer;
}
```

Here is the list of all browsers that supports `:is()` currently.

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/image/css-matches-pseudo.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/image/css-matches-pseudo.png">
<img src="https://caniuse.bitsofco.de/image/css-matches-pseudo.jpg" alt="Data on support for the css-matches-pseudo feature across the major browsers from caniuse.com">
</picture>
