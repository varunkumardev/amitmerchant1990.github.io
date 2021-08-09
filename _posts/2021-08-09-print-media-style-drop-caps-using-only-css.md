---
layout: post
title: Print media style drop caps using only CSS
image: /cdn/print-media-style-drop-caps-using-only-css.png
categories: [CSS]
---

The first character in this paragraph, the letter **"T"**, is called a *drop cap* or an "initial". Why? Because in a written or published work, an initial or [drop cap](https://en.wikipedia.org/wiki/Initial) is a letter at the beginning of a word, a chapter, or a paragraph that is larger than the rest of the text.

Having drop caps in your text adds a nice flavor to the overall aesthetics of your writing layout. For instance, on this blog, as you can see I have implemented the drop cap and it kind of adds a flare to the blog's design language.

In this article, we will go over how you can implement drop caps using pure CSS. 

Let's take the following for example.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum gravida ac ex vel tincidunt. Cras posuere, velit placerat egestas efficitur, mauris nisi tempor neque, vitae semper erat ligula eu augue. Ut ultricies dictum purus, nec condimentum sapien elementum sit amet. Aenean mattis at ante non iaculis. Duis ultrices dignissim urna, quis pulvinar ex congue ut. Aliquam fringilla mi a lectus dapibus tempor quis sit amet nisi. Nulla auctor dapibus nibh nec ullamcorper. Nam vehicula molestie dui eget volutpat. Ut molestie, libero at viverra sodales, purus eros feugiat massa, at condimentum magna purus ac augue. Donec quis dolor imperdiet orci ultrices malesuada. Donec tempor vestibulum ex, et ullamcorper lectus ultricies at. Integer a accumsan massa, sed ultrices arcu. Maecenas at odio vitae leo egestas pharetra sit amet ut nulla.
</p>
<p>
  Aliquam quis leo imperdiet, posuere turpis quis, pulvinar ante. Sed nisl urna, fringilla vitae aliquam ut, porta egestas mauris. Quisque lacus turpis, lobortis at pulvinar et, efficitur vel erat. Ut pretium dignissim nibh, porttitor lobortis dui gravida eget. Nunc euismod dui enim, ac dignissim nisl iaculis vitae. Quisque sit amet velit sed nisi faucibus bibendum. Nullam nisi arcu, sollicitudin vitae porta a, egestas quis nulla. Nunc nec nulla dolor. Proin mauris justo, lobortis eu leo vel, volutpat lacinia mi. Mauris in eros elit. Pellentesque sed libero non enim blandit condimentum sit amet vel quam. Sed ac nulla sed ipsum tristique ullamcorper ac quis nunc.
</p>
```

Now, if you want to make the letter "L" of the first paragraph a drop cap, you can do it using CSS like so.

```css
p:first-child:first-letter {
  float: left;
  margin: 0.13em 0.10em 0 -0.01em;
  font-size: 3.333em;
  line-height: 0.65em;
  font-family: serif;
  font-weight: bold;
}
```

Let's break this down. 

We used the `first-child` pseudo-element on the `<p>` tag since we want to make the drop cap for the first paragraph only. This is coupled with the `first-letter` pseudo-element that applies styles to the first letter of the first line of a block-level element.

Here's the above example in action.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="MWmzRWO" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/MWmzRWO">
  Drop cap</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

You can apply the style to this first letter however you want. You can play around with the margins and line-height according to your liking, add drop shadows, or you can set an entirely different font for your drop caps altogether. Your imagination is the only limit here!

Here's one more example of what more you can do with drop caps.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="PomxMaW" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/PomxMaW">
  Drop cap</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>