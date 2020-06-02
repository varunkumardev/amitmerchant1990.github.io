---
layout: post
title: Detect device's OS in JavaScript
image: /cdn/detect-device-os.png
categories: [JavaScript]
---

There comes a scenario when you might want to check which operating system the device is running. For instance, when you want to set device-specific download links. For windows, `.exe` file, for macOS, `.dmg` file and so on. 

Browser's [navigator](https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator) object can come to rescue in this particular scenario.

The `navigator` object holds the significant amount of device information such as `appName`, `appCodeName`, `platform`, `userAgent` and so forth. Among all these, you can utilize the `userAgent` property which holds the information regarding the browser and the operating system it's running on.

Running `navigator.userAgent` in my browser's console will give the following string in return.

```
Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.92 Safari/537.36
```

As you can see, it return the information regarding my current browser but most importantly it has also returned the OS. In my case it's `Linux`.

Now we only need to check if this property holds the desired OS by using [match()](https://www.w3schools.com/jsref/jsref_match.asp) method on `navigator.userAgent` like so.

```js
if (navigator.userAgent.match(/Linux/i)) {
    // Do Linux related stuff
} else if (navigator.userAgent.match(/Windows/i)) {
    // Do Windows related stuff
} else if (navigator.userAgent.match(/Mac/i)) {
    // Do macOS related stuff
}
```

It's as simple as that.