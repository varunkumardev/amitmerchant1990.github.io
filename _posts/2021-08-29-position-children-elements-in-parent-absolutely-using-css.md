---
layout: post
title: Position children elements in the parent absolutely using CSS
image: /cdn/position-children-elements-in-parent-absolutely-using-css.png
categories: [CSS]
fluidbox: true
---

Sometimes, it might be the case where you want to place/position the children elements that reside insides their parent absolutely.

For instance, if you can notice on the [homepage](/), the first article on the list is labeled as a *"NEW"* badge on it like so. 

[![The NEW badge on the homepage](/images/new-badge-homepage.jpg)](/images/new-badge-homepage.jpg)

Here, the new badge is an SVG icon that lies inside the parent box absolutely and so even though it's a child of this parent div, I was able to place it outside of its edge.

I'm going to explain how you can achieve this kind of behavior in this article.

Now, let's say we have a container div with some content and an SVG icon wrapped by it like so.

```html
<div class="container">
    <svg width="40" class="icon" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
    </svg>
    <span>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mattis felis sit amet laoreet eleifend. Maecenas vel ultricies nibh. Quisque vel mauris id metus mattis accumsan sit amet a nulla. Curabitur sed sodales leo. Etiam vitae pretium arcu, eget interdum odio. Sed nisi velit, facilisis eu dui eu, commodo maximus lectus. Etiam consectetur turpis eu leo suscipit, ac consectetur eros mattis. Nunc sodales tempor ex, in vestibulum turpis feugiat id. Quisque at gravida eros, eu eleifend velit. Proin a imperdiet libero. Proin finibus nunc at justo suscipit varius. Duis eget quam eros. Quisque quis facilisis quam. Nullam sollicitudin nibh lectus, quis egesta dolor vehicula eget.
    </span>
</div>
```

Now, if you want to achieve something like what I have shown previously, you need to do two important things.

- Setting position of the div as `relative`.

```css
.container {
  position: relative;
}
```

- Setting the position of the SVG icon as `absolute`.

```css
.icon {
  position: absolute;
}
```

Doing so will make sure that the icon inside is positioned relative to the nearest positioned ancestor (in this case the `container` div) instead of positioned relative to the viewport, like fixed.

Our work is already 80% done.

The only thing now remains is to adjust the icon's position as per the requirement. In our case, to set it at the top-right corner at the edge of the container. This can be done using the [right](https://developer.mozilla.org/en-US/docs/Web/CSS/right) and [top](https://developer.mozilla.org/en-US/docs/Web/CSS/top) properties like so.

```css
.icon {
  position: absolute;
  right: 10px;
  top: -20px;
}
```

And that's all you need to do!

Putting it all together, here's how the entire example would look like.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="YzVbRVw" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/YzVbRVw">
  Floating icon on the div</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
