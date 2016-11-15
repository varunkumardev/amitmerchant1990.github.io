---
layout: post
title: Building a simple offline-capable Notepad app using ServiceWorker
---

Today, We are going to build a progressive Notepad app which can very well be used in offline mode, be responsive on all available devices and which saves the content locally on device. So, the core functionality of this Notepad here is to make it work offline. To fulfill this requirement, we'll use [ServiceWorkers](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers) which I'm going to cover next.

# Foreward

## What is a ServiceWorker?

_A service worker is a script that runs in the background, separate from your web page. It responds to events, including network requests made from pages it serves. A service worker has an intentionally short lifetime. It wakes up when it gets an event and runs only as long as it needs to process it._

The first and foremost feature ServiceWorkers provides is to give the ability to webapp to work offline. Apart from this ServiceWorkers also includes features like [push notifications](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web) and [background sync](https://developers.google.com/web/updates/2015/12/background-sync). In the future service workers will support other things like periodic sync or geofencing. The core feature discussed in this tutorial is the ability to intercept and handle network requests, including programmatically managing a cache of responses.

## Now, let's talk about what is a Progressive Web App?

_A Progressive Web App uses modern web capabilities to deliver an app-like user experience. They evolve from pages in browser tabs to immersive, top-level apps, maintaining the web's low friction at every moment._

- This means a progressive web app should be responsive, connection-independent, app-like, fresh, installable and so forth. So, to make our Notepad a progressive web app, we need to include all above features. Let's get started.

# Building the Notepad

Let's start by creating a folder called Notepad in your favorite local web server(in my case I have used [XAMPP](https://www.apachefriends.org/index.html)) and add following files into it:

- `index.html`
- `sw.js` - This where we'll write our ServiceWorker logic
- `manifest.json` - The manifest enables your web app to have a more native-like presence on the user's homescreen. It allows the app to be launched in full-screen mode (without a URL bar being present), provides control over the screen orientation and in recent versions of Chrome on Android supports defining a [Splash Screen](https://developers.google.com/web/updates/2015/10/splashscreen?hl=en) and [theme color](https://developers.google.com/web/updates/2014/11/Support-for-theme-color-in-Chrome-39-for-Android?hl=en) for the address bar. It is also used to define a set of icons by size and density used for the aforementioned Splash screen and homescreen icon.

Now, first thing we will do is register a `ServiceWorker` when our app hits the browser for the first time. For this, create a folder called `js` in root and add file `app.js` into it and add the following code in that file.

<script src="https://gist.github.com/amitmerchant1990/47533b3422bce2d50437d12fba705858.js"></script>

Above code will try to check if the current browser supports `ServiceWorker` and if yes, it will register one. Notice, we have passed a file called `sw.js` in the register function which we haven't created yet.

Create a file called `sw.js` in the root and add the following content into it.

<script src="https://gist.github.com/amitmerchant1990/4d5bb62b795b10cb593e8b585ae8a1a5.js"></script>

Notice, If you want to import any external script in the Service Worker, you can do it using importScripts() . In this example we'll be using the [cache-polyfill](https://github.com/coonsta/cache-polyfill) since the support for cache is limited.

Now, We need to cache all files that we want to be cached the first time `ServiceWorker` registered. In order to do this, we'll add the following content after `var CACHE_VERSION = 'app-v10';` line:

```javascript
var CACHE_FILES = [
    '/',
    'index.html',
    'js/app.js',
    'css/style.css',
    'favicon.ico',
    'manifest.json'
];
```

All this files will get cached for the offline use. Here you can see we call `caches.open()` with our desired cache name(which in our case is `CACHE_VERSION `), after which we call cache.addAll() and pass in our array of files i.e `CACHE_FILES`.

Next, we'll add following content into the file `manifest.json`.

<script src="https://gist.github.com/amitmerchant1990/ea50498abf28cd04083ccc200ac19227.js"></script>

You can see here, we have provided our application name in `short_name`, default orientation for application is `standalone` and we have also provided different sized icons of our application which you can get from [here](https://github.com/amitmerchant1990/notepad/tree/master/img).

Let's now move to the `index.html` and add following content:

<script src="https://gist.github.com/amitmerchant1990/e2d6fb2d92327fec9c7de85122a8137a.js"></script>

So, as you can see here we have taken a textarea and have given it `id`=`note` which we will use to keep track of `onKeyUp` event of textarea. For this, purpose we'll use [jQuery](https://jquery.com/). Let's also note here that, to make the app responsive on all device, we have used [Bootstrap](http://getbootstrap.com/). You can I have included all of the necessary files in `index.html`. You can get all the necessary file from [here](https://github.com/amitmerchant1990/notepad/tree/master/js) and [here](https://github.com/amitmerchant1990/notepad/tree/master/css) and add them to the relevant folders. I have also included file [style.css](https://github.com/amitmerchant1990/notepad/blob/master/css/style.css) which will make some necessary changes on the page to make it responsive.

Now, again move to the file `js/app.js` and add the following content:

<script src="https://gist.github.com/amitmerchant1990/6a4aee82dd4e54296a5c36c44496e5a2.js"></script>

As you can see, we have `bind` the textarea's `propertychange` event so that it will get the text while user types and it to the `localStorage

```javascript
if(localStorage.getItem("note") && localStorage.getItem("note")!=''){
    var noteItem = localStorage.getItem("note")
    $('#note').val(noteItem);
  }
```

Above code will check if there's anything into the `localStorage` and if found will fill the `textarea` with the available content when the next time user visits the website.

Lastly, move to `sw.js` file once again and add all the remaining files into `CACHE_FILES`.

```javascript
var CACHE_FILES = [
    '/',
    'index.html',
    'js/app.js',
    'js/jquery.min.js',
    'js/bootstrap.min.js',
    'css/bootstrap.min.css',
    'css/style.css',
    'manifest.json',
    'img/icon-48.png',
    'img/icon-96.png',
    'img/icon-144.png',
    'img/icon-196.png'
];
```

Putting all above bits and pieces at correct place, our Notepad app is now ready to be used offline. Head over to the [http://localhost](http://localhost) or relevant local web server URL and check the final app.

You can check the whole [codebase](https://github.com/amitmerchant1990/notepad) or checkout the [demo](https://www.amitmerchant.com/notepad/).

_Thanks for reading!_
