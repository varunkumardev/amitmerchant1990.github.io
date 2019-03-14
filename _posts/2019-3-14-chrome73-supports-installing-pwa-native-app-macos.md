---
layout: post
title: Chrome 73 now supports installing PWAs as a native app on macOS
categories: [PWA, macOS, Usability]
---

It's not long ago that Google Chrome team had released the support for intalling PWAs on Windows 10 natively with Chrome 70. And people have been since then waiting for the similar support in the macOS as well. Seems like the waiting is over now as the team has shipped the support for installing PWA apps natively, just like Windows.

As you can read [here](https://developers.google.com/web/updates/2019/03/nic73), starting from Chrome 73, you can now install the PWAs from Chrome's context menu and with that, it is been now supported on all major desktop platform, i.e. macOS, Windows, Linux and Chrome OS.

## Install PWA on macOS with Chrome

if you want to install a Progressive Web App, you will need to visit a website that offers one. For instance, you can visit one of my webapp https://resume-nation.github.io which is a PWA. Once the webapp gets loaded, click on the 'Menu' where you will find `Install Resume Nation...` option.

![](/images/context_menu.png)

Upon clickin on `Install Resume Nation...`, you'll greeted with a popup which will ask "Install app?".

![](/images/install_popup.png)

Once installed, you can now access the app from varios places from within the OS without even touching browser, ever. For instance, you can access it from Alfred.

![](/images/alfred_pwa.png)

Or from the launchpad,

![](/images/launchpad_pwa.png)

Upon opening the app, you won't be able to notice that it's a webapp cause it doesn't have the usual addressbar that webapps used to have. So, it does look like a webapp. Apart from this, It's also have its own icon in the system dock like.

![](/images/dock_pwa.png)

## In closing

Now that PWAs being supported all the major platforms, both desktop and mobile, it's a great time to learn and leverage the use of PWA into your own webapps.

Also, if you want to get started with building progressive web apps, check out [this article](Building-Simple-Offline-Notepad-Using-Service-Worker/) which will teach you to build a simple offline-capable Notepad app using ServiceWorker or you can read more about PWAs over [here](https://developers.google.com/web/progressive-web-apps/).

Until next time!
