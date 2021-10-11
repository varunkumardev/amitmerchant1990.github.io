---
layout: post
title: Check if a PWA is opened as a standalone app or not
image: /cdn/check-if-pwa-opened-as-standalone-app.png
categories: [PWA]
---

When working with Progressive Web Apps (PWA), there might be a case when you only want to show certain things when the website is in standalone mode.

* TOC*
{:toc}

## What is the standalone mode?

When a PWA is installed on any supported computer, it can act like a native app and it can be opened just like how you would open a native app.

For instance, if your PWA is installed on an Android phone, it can be opened just like the native Android apps are opened. i.e. the PWA can have a different window, its own icon in the application launcher, etc. Also, there won't be any address bar in this case.

So, I have been in the situation where I needed to show an "Install" button only when my [Notepad](https://notepad.js.org/) PWA is opened in the browser and hide it when it's opened in the standalone mode.

## The CSS Way

Turns out, it can be easily achieved through the [display-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode) media query where it can check the display mode of an application.

So, for instance, if you want to apply a specific set of CSS in the standalone mode, you can do it like so.

```css
@media all and (display-mode: standalone) {
  .install-button {
    display: none;
  }
}
```

As you can tell, in this example, I'm making the install button hidden when my PWA is in the `standalone` mode.

## Tracking Display Mode Transitions

Now, this can only check the `display-mode` when the application is loaded. What if you want to track when the PWA is going into standalone mode and do things accordingly?

Well, this can be achieved using [Window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method where you can pass the media query string (in our case `(display-mode: standalone)`) and setting [an event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) onto it like so.

```js
window
    .matchMedia('(display-mode: standalone)')
    .addEventListener('change', ({ matches }) => {
        if (matches) {
            $('#installAppButton').hide();
        } else {
            $('#installAppButton').show();
        }
});
```

Now, this will track the transition of the website's display mode (From `browser` to `standalone` for instance) and will do things accordingly.