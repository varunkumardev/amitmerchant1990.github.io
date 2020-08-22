---
layout: post
title: How to detect fullscreen mode using CSS
image: /cdn/how-to-detecting-fullscreen-mode-using-css.png
categories: [CSS]
---

Recently, I needed to change some design elements of a site when the site is in the fullscreen mode. So, I was looking for a way to it using CSS as all I wanted to change was hiding some stuff when in the fullscreen mode.

And that's when I came across this CSS media feature [display-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode) which can be used to test the display mode of an application.

This feature would work just like any other media query. Meaning, the `display-mode` would be anything among these options. Mainly `fullscreen`, `standalone`, `minimal-ui`, and `browser`. The different option has a different aspect to it.

The `fullscreen` option, as its name suggests, would detect if the device is in the fullscreen mode, and based on that you can apply or alter some CSS. Here's how you can write this media query.

```css
@media all and (display-mode: fullscreen) {
  /* every CSS goes here that you want 
  to apply or alter in the fullscreen mode*/
}
```

For instance, if you want to change the `body` color when the application goes into the fullscreen mode, you can do it like so.

```css
@media all and (display-mode: fullscreen) {
  body {
      background-color: lightpink;
  }
}
```

## Using `display-mode` in JavaScript

If you want to perform some JavaScript related weight-lifting when the app switches to fullscreen mode, you can use [window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method and attaching a listener to it which will monitor the `display-mode` changes like so.


```js
window.matchMedia('(display-mode: fullscreen)')
  .addListener(({ matches }) => {
    if (matches) {
        // Apply fullscreenmode mode related changes
    } else {
        // Remove fullscreenmode mode related changes
    }
});
```

And that is how you can listen for the `fullscreen` mode event in JavaScript.