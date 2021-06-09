---
layout: post
title: Adding a custom Install button in Progressive Web Apps
image: /cdn/adding-custom-install-button-in-progressive-web-apps.png
categories: [PWA]
fluidbox: true
---

The other day I was looking for a way to add a custom "Install" button in my [Notepad](https://notepad.js.org/) app which is essentially a [Progressive Web App (PWA)](https://web.dev/progressive-web-apps/).

* TOC
{:toc}

So, to give you a primer when you open a PWA, a `beforeinstallprompt` event would get fired in [supported browsers](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent#browser_compatibility). When this event is fired, the browser would show an installation popup to the user like so. 

[![Native PWA Popup](/images/native-pwa-popup.png)](/images/native-pwa-popup.png)

The user can then choose to install the app or dismiss the popup. So, what if you want your users to install your PWA once again after they dismiss the installation popup? To mitigate this what you can do is show a custom "Install" button somewhere in your app which would trigger the user to install your PWA.

This is exactly what I did in my Notepad PWA as well. How did I achieve this? Read on.

## Tap into the `beforeinstallprompt` event

Remember I talked about the [beforeinstallprompt](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) event which triggers the installation popup? We need to add an event listener for this event in our app and save the event to use it later to trigger the native installation popup. You can do it like so.

```js
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    deferredPrompt = e;
});
```

As you can tell, we need to define a global variable called `deferredPrompt` and when the `beforeinstallprompt` event occurs, we can save the event to the `deferredPrompt` variable for later use.

## Add an Install button in the PWA

Next, we can now add an install button somewhere in your app. In my Notepad app, I put it into the "About" modal next to the app's title like so.

[![](/images/custom-install-button.png)](/images/custom-install-button.png)

## Hook into the button's click event

Once done, we can add a *"click"* event listener on this button and use the `deferredPrompt` global variable to trigger browser's native installation popup like so.

```js
const installApp = document.getElementById('installApp');

installApp.addEventListener('click', async () => {
    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            deferredPrompt = null;
        }
    }
});
```

As you can see, we can trigger the native installation popup by using the `deferredPrompt.prompt()` and then we can wait ("await") for the user selection in the form of `deferredPrompt.userChoice`.

This will return the user choice as `outcome`. If the user chooses to install the application, the `outcome` would be *"accepted"* and then we can set `deferredPrompt` to `null` so that it won't trigger the install popup the next time user clicks on the button.

If the user dismisses the popup, the `outcome` would be *"dismiss"* in that case.

Take a look at the entire process in action.

![Custom Install button in action](/images/custom-install-in-action.gif)

And that is how you can add a custom install button in your PWAs!

But there are a few more things that you can do to make this process more seamless.

### Showing "Install" button only in supported browsers

Not every browser (such as Firefox, Safari, etc.) supports installing PWAs. So, it would be a better idea to show the "Install" button in supported browsers only.

To achieve this, what I did is by default I made the "Install" button hidden and for that, I did the following in the CSS.

```css
.install-app-btn-container {
  display: none;
}
```

Now to show it in the supported browser, all I did is made it visible when the `beforeinstallprompt` event is fired like so.

```js
window.addEventListener('beforeinstallprompt', (e) => {
    $('.install-app-btn-container').show();
    deferredPrompt = e;
});
```

Notice, I have used jQuery to make it visible but you can use whatever you want.

Using this approach, you are also not showing the "Install" button in the case if the app is already installed because in such a case, the `beforeinstallprompt` would not get fired. 

So, you're aiming at two targets using only one arrow here!

You can check out the [source code](https://github.com/amitmerchant1990/notepad) of my [Notepad](https://notepad.js.org/) app further if you want.