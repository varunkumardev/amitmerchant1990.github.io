---
layout: post
title: How to create a two column layout using Flexbox in CSS
image: /cdn/how-to-create-two-column-layout-using-flexbox-css.png
categories: [CSS]
fluidbox: true
---

This blog has got this two-column layout which houses host of different things for different purposes. A two-column layout is especially useful if you want to repeat a certain column on every page. 

In my case, it's the right column which gets repeated on every page because it contains a newsletter box, a recently published articles' container, and a few ads. I wanted these things on every page. And hence a two-column layout was inevitable.

I've built this two-column layout using [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox). And I'll tell you it's rather easy to create one from my experience. Apart from these, the support for Felxbox is quite widespread across all the newest browsers as you can see below.

[![Flexbox browser support](/images/flex-support-browsers.png)](/images/flex-support-browsers.png)

So, let's jump into it right away.

First, we'll need to create a parent container which will house the two column/div like so.

```html
<div class="flex-container">
    <!-- this will hold the two column layout -->
</div>
```

Now, as you can see, I've given this `div` a class called `flex-container`. Let's define that in the CSS.

```css
.flex-container {
    display: flex;
    flex-direction: row;
}
```

As you can see, I've made the div a Flexbox by setting the `display` property to `flex`. Also, we have set the `flex-direction` property to `row` which will set the two divs (that we're going to add next) side-by-side. Let's add these two divs to the `flex-container` like so.

```html
<div class="flex-container">
    <div class="flex-left">
        This will have content in the left box.
    </div>
    <div class="flex-right">
        This will have content in the right box.
    </div>
</div>
```

We now have two columns called `flex-left` and `flex-right` respectively. Let's define its CSS.

```css
.flex-left {
    width: 75%;
    height: 100vh;
}

.flex-right {
    width: 25%;
}
```

This just set the widths of the columns that we would like to see. In my case, I've set the width of left column to ***75%*** of the entire window and ***25%*** for the right column. Also, set the `height` property to `100vh` so that it takes the height of the whole window.

And that's about it! That's all you need to create a nice two-column layout for your website. See it in action in this CodePen below.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="amit_merchant" data-slug-hash="KKzpMEo" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Two column layout">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/KKzpMEo">
  Two column layout</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

As you may notice, I've added borders, margins and paddings to the columns so things look more sophisticated and visible.

## Bonus

You can make this layout responsive for mobile devices by changing the `flex-direction` of the container to `column` which will stack the columns on top of each other and set the `width` of both the columns to `100%`. I've done exactly the same on this blog. 