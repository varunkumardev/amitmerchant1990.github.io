---
layout: post
title: TIL - How to fix embedded scripts in Progressive Web Apps
---

[Progressive Web Apps](https://developers.google.com/web/progressive-web-apps/) are great when you need to achieve things like offline capabilities, push notifications, background-sync and to give your website an overall app-like experience. While, the PWAs are great at implementing all of the above things and are the obvious choice, there are certain things which can be broken when you use [ServiceWorker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)(which are the building blocks of any PWA) to make your webaite a PWA. 

I've faced one such issue in one of my PWA [Notepad](https://notepad.js.org). So, basically the issue was, I've added an embedded script of one the advertisment platform [CodeFund](https://codefund.io) as a publisher on my webapp which basically display an ad on a specified place on a page. I've grabbed the embedded code they have provided and put that on my webapp's page and left that as it is. Then later on when I tried checking the analytics on CodeFund's dashboard for this particular website I found there were no impressions at all even though the site have traffic of around 500 users daily which was evident from the Google Analytics(Surprisingly, the code from Google Analytics was working fine). So, out of the curiosity, I went to webapp, unregistered the `ServiceWorker` which were installed previously, and loaded the app fresh and what I've noticed in the console was shocking and surprising at the same time. 

> CodeFund's and some other external scripts were failing when the ServiceWorkers are enabled and throws below error in the console

![](images/service-worker-error.png)

And here's the code I've used to implement ServiceWorker

```js
importScripts('js/cache-polyfill.js');

var CACHE_VERSION = 'app-v18';
var CACHE_FILES = [
    '/',
    'index.html',
    'js/app.js',
    'js/jquery.min.js',
    'js/bootstrap.min.js',
    'css/bootstrap.min.css',
    'css/style.css',
    'favicon.ico',
    'manifest.json',
    'img/icon-48.png',
    'img/icon-96.png',
    'img/icon-144.png',
    'img/icon-196.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(CACHE_FILES);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }
            requestBackend(event);
        })
    )
});

function requestBackend(event){
    var url = event.request.clone();
    return fetch(url).then(function(res){
        //if not a valid response send the error
        if(!res || res.status !== 200 || res.type !== 'basic'){
            return res;
        }

        var response = res.clone();

        caches.open(CACHE_VERSION).then(function(cache){
            cache.put(event.request, response);
        });

        return res;
    })
}

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(keys){
            return Promise.all(keys.map(function(key, i){
                if(key !== CACHE_VERSION){
                    return caches.delete(keys[i]);
                }
            }))
        })
    )
});
```

I was not sure why was that happening? I was even wondering whether I have to cache these scripts some way in `ServiceWorker`? I've tried to find the solution here and there I've came to a conclusion that the issue is happening the app tries to load resources from `ServiceWorker` even if the app is in online mode and that's where the script were throwing errors. I've to find a way to load scripts when the browser is online. And after some brainstroming I've found the solution.


## Navigator.onLine

There's this neat little API which is being shipped with every modern browsers called [Navigator.onLine](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine). What this basically do is returns the online status of the browser. The property returns a boolean value, with true meaning online and false meaning offline. I tried checking if the app is online or not using `Navigator.onLine` and if it's online, then serve the response from the server and from ServiceWorker if the case is otherwise. This way the requests from the scripts wouldn't get blocked while the app is online and now app was able to load the embedded scripts successfully which previously it wasn't and thus it solved above mentioned issue.

Here's how I've implemented it.

```js
// Commented the code for brevity

self.addEventListener('fetch', function (event) {
    let online = navigator.onLine;
    if(!online){
      event.respondWith(
          caches.match(event.request).then(function(res){
              if(res){
                  return res;
              }
              requestBackend(event);
          })
      )
    }
});
```

