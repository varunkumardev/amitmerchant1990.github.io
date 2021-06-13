---
layout: post
title: Get your website ready for new tab bar theming of Safari 15
image: /cdn/get-your-website-ready-tab-bar-theming-of-safari-15.png
categories: [Miscellaneous]
fluidbox: true
---

It's a wrap for Apple's [WWDC 2021](https://developer.apple.com/wwdc21/) last week. And while a lot of good stuff was released in the event, I, as a web developer, was pretty excited for Safari 15 and its all-new design in the macOS and the iPadOS.

* TOC
{:toc}

The part of this all-new design is the adaptive theming of the tab bar. So, if your website's background is *pink*, the tab bar color will also be *pink*. This makes the website blend in really nicely with the entire browser window. That's pretty nice in my opinion and adds aesthetics to the overall web browsing experience.

While Safari 15 can change the tab bar color intelligently, you, as a website owner, can also change this behavior as per your need by adding just a single line in your HTML.

## The `theme-color` meta tag

So, the way how this works is, you need to add the `theme-color` [meta](https://en.wikipedia.org/wiki/Meta_element) tag in your HTML and set your desired color in it. This will tell Safari to set this color for the website when it's opened in a tab.

For instance, as you can tell, my blog has got a purple-ish accent to it. It only makes sense to have a tab bar color that falls into the same color region. So, we can add the following meta tag to the HTML with the color `#673AAC` like so.

```html
<meta name="theme-color" content="#673AAC">
```

This is all you need to make Safari 15 aware of the color in which the tab bar needs to be rendered when it's opened in a tab.

Here's how a website (not my blog) with a `theme-color` meta tag would look like when it's opened in Safari 15.

[![Safari 15 Address Bar Theming in macOS](/images/safari-15-example-1.png)](/images/safari-15-example-1.png)

Here's one more example.

[![Safari 15 Address Bar Theming in iPadOS](/images/safari-15-example-2.png)](/images/safari-15-example-2.png)

## Tab bar theming based on device theme

Additionally, you can also set different tab colors based on the device theme, whether it's a dark or light theme by specifying the `media` attribute in the `meta` tag like so.

```html
<meta 
    name="theme-color" 
    content="#ecd96f"
    media="(prefers-color-scheme: light)">

<meta 
    name="theme-color" 
    content="#0b3e05"
    media="(prefers-color-scheme: dark)">
```

As you can tell, the `media` attribute takes [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) into the consideration and will set the tab bar color accordingly.

This is how the end result would look like.

[![Safari 15 Device Theming](/images/safari-15-device-theming.png)](/images/safari-15-device-theming.png)