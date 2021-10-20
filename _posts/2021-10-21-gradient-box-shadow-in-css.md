---
layout: post
title: Gradient-y Box Shadows in CSS
image: /cdn/gradient-box-shadow-in-css.png
categories: [CSS]
---

Okay... Here's a confession. I love box shadows! And you can make it out by looking around on this blog. They are all over the place. Some are subtle while some are prominent. 

* TOC*
{:toc}

I don't know why but there's something about shadows that appeals to me a lot and I always get tempted to use them wherever and whenever possible.

While the regular box-shadows are great, sometimes, you can spice them up by making them gradient-y because why not?

Let's see how you can make one.

## It isn't the `box-shadow`

The first thing I want to clarify over here is this won't be the box shadow that you make natively using the `box-shadow` property but rather a [::before](https://developer.mozilla.org/en-US/docs/Web/CSS/::before) pseudo-element trickery that disguise as a box shadow.

So, let's say we have a simple div with a class `box` centered around in a container.

```css
.box {
  height: 50%;
  width: 50%;
  background: bisque;
  aspect-ratio: 16/9;
  border-radius: 15px;
}
```

Here's how it looks like.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="QWMKgzR" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/QWMKgzR">
  Box Without A Gradient Shadow</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## The `::before` pseudo element trickery

Now, if we want to add a gradient-y box shadow behind this box, we can do it using a `::before` pseudo-element around it and makes it looks like a shadow.

```css
.box::before {
  content: "";
  background: linear-gradient(90deg, purple, green, hotpink);
  position: absolute;
  height: 50%;
  width: 50%;
  z-index: -1;
  filter: blur(20px);
}
```

As you can tell, since we want a gradient shadow, we're using `linear-gradient` as the background of the pseudo-element.

Next, by positioning the pseudo-element *absolutely* and keeping its width and height **50%**, we are making sure that it stacks on top of the box.

And to position it behind the box, we used a negative `z-index`. That will do the trick for us.

And finally, to make the shadow natural, we made it blurred using a combination of the `filter` property and the [blur()](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur()) function.

You can adjust the amount of blur by increasing or decreasing the radius value for the `blur()` function.

## The result
Here's the entire example in action!

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="gOxwwqY" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/gOxwwqY">
  Gradient Shadow</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

If you want to change the angle of the shadow further, you can use `top`, `bottom`, `left`, and `right` properties accordingly.