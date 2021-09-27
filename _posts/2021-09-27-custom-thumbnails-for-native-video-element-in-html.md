---
layout: post
title: Custom thumbnails for native video element in HTML
image: /cdn/custom-thumbnails-for-native-video-element-in-html.png
categories: [HTML]
---

The `<video>` is an HTML element that can be used to embed a media player on a page that can a variety of video formats. Here's how a simple video embed with an external video source would look like.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="vYZQzWW" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/vYZQzWW">
  Simple HTML video player demo</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Now, there are [a lot of things](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attributes) that you can customize for this `<video>` element but I'm going to show you a configuration that I recently discovered and I found it quite useful.

So, if you have ever uploaded a YouTube video, you might know that you can provide a custom thumbnail for the video that will get showed up when the video is not started playing yet or it is being shown as the first frame when the video starts playing.

The `video` element has a similar option that you can use to replicate the same behavior.

## The `poster` attribute

The `poster` attribute can be provided to the `<video>` element. A URL of an image can be set as a poster which will be shown when the video is not started playing yet.

```html
<video 
    controls 
    width="300" 
    poster="https://www.amitmerchant.com/cdn/custom-thumbnail-video-element.png"
>
    <source 
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        type="video/mp4">
</video>
```

So, if we change the previous example by using the `poster` attribute, it looks like so.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWozqqY" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/MWozqqY">
  Simple HTML video player demo</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

(Try opening the video in fullscreen)

As you can tell, now that we are using the `poster` attribute on the `<video>` element (where we have given a *.png* image), it will be now shown as a thumbnail for this video instead of a blank screen... just like a YouTube thumbnail!
