---
layout: post
title: Detecting device color scheme automatically in JavaScript
image: /cdn/device-scheme-javascript.png
categories: [JavaScript]
---

Implementing a Dark mode in applications is all the rage these days. And you can provide a toggle to switch between Dark/Light mode to users like the one I've implemented on my Notepad app.

But what if you can detect the device's default theme and based on that set the theme accordingly?

Well, this is certainly possible using this [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS media query. So, basically, all you'll need to do is write CSS in the `prefers-color-scheme` media query based on the `dark` and `light` mode like so.

```css
.day   { background: #eee; color: black; }
.night { background: #333; color: white; }

@media (prefers-color-scheme: dark) {
  .day.dark-scheme   { background:  #333; color: white; }
  .night.dark-scheme { background: black; color:  #ddd; }
}

@media (prefers-color-scheme: light) {
  .day.light-scheme   { background: white; color:  #555; }
  .night.light-scheme { background:  #eee; color: black; }
}
```

## Using `prefers-color-scheme` in JavaScript

Using this the CSS will detect the device theme preference and apply the classes accordingly. 

This is using CSS but what if you want to implement it using the JavaScript?

You can implement this by using [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method on the `window` object and adding a listener like so.

```js
window.matchMedia('(prefers-color-scheme: dark)').addListener(({ matches }) => {
    if (matches) {
        // Apply dark mode related changes
    } else {
        // Apply dark light related changes
    }
});
```

Attaching a listener on `matchMedia` will check if the device has the specified color scheme applied and in the closure you can perform the operations accordingly.

