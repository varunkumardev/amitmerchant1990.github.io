---
layout: post
title: Detecting if device is online or offline using plain JavaScript
image: /cdn/online-offline-javascript.png
categories: [JavaScript]
---

There might be cases where you would like to check if the device on which the website is loading is connected to the internet or not. For instance, this can be used to show the user the message if their device is offline or to disable some functionality of the application if the device is offline.

There are [libraries available](https://github.hubspot.com/offline/docs/welcome/) to achieve this purpose but using libraries to manipulate simple thing would be overkill if you can do this using plain JavaScript.

Modern browsers comes with the `NavigatorOnLine` interface that contains methods and properties related to the connectivity status of the browser.

For instance, it contains a property called `onLine` which returns a `true`/`false` which indicated whether the browser is online or not. Here's how you can check it.

```js
let isDeviceOnline = navigator.onLine;

if (isDeviceOnline) {
  console.log('online');
} else {
  console.log('offline');
}
```

I've fixed an issue related to embedded scripts based on the device's online status which I've depicted in [this article](/Til-How-To-Fix-Embedded-Scripts-In-Progressive-Web-Apps/).

Now, this code is useful when you want to check the device's connection status only on the page load. What if you want to monitor the status continuously?

To do this, you can hook on event listeners to listen to the events on `window.online` and `window.offline` like so.

```js
window.addEventListener('offline', function(e) { 
    console.log('offline'); 
});

window.addEventListener('online', function(e) { 
    console.log('online'); 
});
```

That's it! It's as simple as that.

If you're a visual learner, there's a video form as well which you can checkout below.

<div class="videowrapper">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/VV2dvu_Xwvw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>