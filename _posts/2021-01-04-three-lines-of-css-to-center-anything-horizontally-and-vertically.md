---
layout: post
title: Three lines of CSS to center anything horizontally and vertically
image: /cdn/three-lines-of-css-to-center-anything-horizontally-and-vertically.png
categories: [CSS]
---

Oftentimes, I stumble across a situation where I would need to center something and over the years I have tried different permutations and combinations. But all those somehow felt *"hacky"* and not something that is reliable.

But then, recently I learned about this little trick which only requires three lines of CSS to center anything, horizontally and vertically. That too in a proper way! Check out the below CodePen first.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="amit_merchant" data-slug-hash="abmGzqo" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Center anything">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/abmGzqo">
  Center anything</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

As you can see, to center anything horizontally and vertically inside a container element, you would only need to give the following CSS to it like so.

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

The `flex` property allows the container to have flexible items, the [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items) property would center the content on the y-axis while the [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) would center the content on the x-axis.

And that's about it... All you'll need is to slap in these 3 lines of CSS to perfectly center anything and everything!