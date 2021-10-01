---
layout: post
title: Simple blinking cursor animation using CSS
image: /cdn/simple-blinking-cursor-animation-using-css.png
categories: [CSS]
---

The other day I was feeling a little nerdy (like all the cool kids) and so, I attempted to add this cool-looking blinking cursor at the end of my blog's tagline like so.

![](/images/blinking-cursor-tagline.gif){:.image-shadow}

Turns out it's rather quite easy to implement something like this. In a nutshell, it's a combination of the `::after` pseudo-element and a pinch of CSS animation timing using the `steps()` function.

If you want to learn how it can be done, read on!

* TOC*
{:toc}

## Using the `::after` pseudo element

The first and foremost thing is to add a static cursor. And the way to do it is by using the `::after` pseudo-element to the element after which you want the cursor.

So, for instance, if you want to place it at the end of a `<h2>`, you can use the `::after` pseudo-element like so.

```css
.box h2::after {
  content: "";
  width: 5px;
  height: 20px;
  background: #ec7fff;
  display: inline-block;
}
```

The result would look like so.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="WNOmWKM" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/WNOmWKM">
  Simple Cursor Blink Animation</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

As you can tell, I have used the flexbox in order to make the text and the cursor align properly and have proper spacing between them.

```css
.box h2 {
  display: flex;
  align-items: center;
  gap: 2px;
}
```

Once that is done, it's time to animate the cursor.

## Animating the cursor

To animate the cursor, first, we need to define a [keyframe](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) called `cursor-blink` that will reduce the opacity of the cursor to `0` when the keyframe is "0%".

```css
@keyframes cursor-blink {
  0% {
    opacity: 0;
  }
}
```

Once done, we can now use this keyframe on the cursor using the `animation` shorthand like so.

```css
.box h2::after {
    /*code commented for brevity*/
    animation: cursor-blink 1.5s steps(2) infinite;
}
```

Let's break this down!

The `cursor-blink` animation we previously defined will run infinitely at each duration of 1.5 seconds and the [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) would take care of the animation iterations in form of `steps(2)` which essentially means it will display the animation iteration along 2 stops along with the entire transition.

## The final output

Here's how the final output looks like once everything is put together.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="qBjvvzL" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/qBjvvzL">
  Simple Cursor Blink Animation</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>