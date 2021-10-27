---
layout: post
title: Render Images Based On Dark or Light Theme Of The Device
image: /cdn/render-images-based-on-dark-or-light-mode-of-the-device.png
categories: [HTML]
---

If your website has been equipped with a dark theme, there will be a good chance where you might want to render some of the images based on the device's theme. i.e. Dark or Light theme.

To, the common way using which you can render an image is by using an `<img>` tag and in this article, I'm going to discuss the HTML-based approach to achieve this problem.

Let's say, you're already rendering an image like so.

```html
<img 
    src="https://picsum.photos/id/1035/300" 
    alt="Light Mode Image"
>
```

Now, you want this image to be something else when the user has Dark mode/theme turned on his/her device. How would you do that?

Well, this can be achieved through the combination of using the `<source>` element and a pinch of a [media](https://developer.mozilla.org/en-US/docs/Web/CSS/@media) query.

So, here's how we can do this.

```html
<picture>
    <source 
        srcset="https://picsum.photos/id/1019/300" 
        media="(prefers-color-scheme: dark)"
    >
   <img 
        src="https://picsum.photos/id/1035/300" 
        alt="Light Mode Image"
    >
</picture>
```

As you can tell, for this to work, we need to use a `<source>` element (enclosed by a `<picture>` element) on which we can specify the image that we want to render when the device has a dark theme turned on. This will be determined by specifying a `media` attribute and setting it as [(prefers-color-scheme: dark)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme).

If the device has a light theme turned on, the user agent will fall back to the image given by the `<img>` element.

You can see it in action in the CodePen below. 

[Open the CodePen](https://codepen.io/amit_merchant/pen/gOxWBaK){:target="_blank"} in the new tab and try changing the device's theme (or [simulate](https://stackoverflow.com/a/67856736/1485183) it from the dev tools) and watch out for the image!

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="gOxWBaK" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/gOxWBaK">
  Change Images Based On Light/Dark Mode</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>