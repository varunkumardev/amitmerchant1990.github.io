---
layout: post
title: How to use HTML with CSS inside SVG
image: /cdn/how-to-add-html-in-svg-using-foreignobject.png
categories: [HTML]
---

Have you ever run into a situation where you want to render some HTML into an SVG? Well, if you ask me the same question, I would say yes. 

There is a legitimate use-case where you would want this behavior. For instance, if you've ever worked with [GitHub readme](https://docs.github.com/en/github/writing-on-github/basic-writing-and-formatting-syntax) files, which are essentially written in [Markdown](https://en.wikipedia.org/wiki/Markdown), you might be knowing that you can use HTML into the readme but you can not actually use CSS to apply style changes to the HTML directly. It would be useful if you could do so, right?

## The `<foreignObject>` element

This can be solved by using the `<foreignObject>` SVG element in which you can add an HTML under a different namespace than the parent SVG and then you can also style the elements using CSS like so.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <style>
    div {
      background: pink;
      font: 12px serif;
      padding: 10px;
    }
    
    .red {
      color: red;
    }
    
    .green {
      color: green
    }
  </style>

  <foreignObject x="20" y="20" width="160" height="100">
    <div xmlns="http://www.w3.org/1999/xhtml">
      <p class="red">This is red color</p>
      <p class="green">This is green color</p>
    </div>
  </foreignObject>
</svg>
```

Here's how the output would look like.

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="amit_merchant" data-slug-hash="OJbdeBo" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="SVG With CSS">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/OJbdeBo">
  SVG With CSS</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

If you want to see this in action on a GitHub readme, you can check out this [repository](https://github.com/sindresorhus/css-in-readme-like-wat) by Sindre Sorhus who has proposed this idea.

The <foreignObject> element also has a fair amount of support for all modern browsers as of today. So, no issues there.

<picture>
<source type="image/webp" srcset="https://caniuse.bitsofco.de/static/v1/mdn-svg__elements__foreignObject-1615661679942.webp">
<source type="image/png" srcset="https://caniuse.bitsofco.de/static/v1/mdn-svg__elements__foreignObject-1615661679942.png">
<img src="https://caniuse.bitsofco.de/static/v1/mdn-svg__elements__foreignObject-1615661679942.jpg" alt="Data on support for the mdn-svg__elements__foreignObject feature across the major browsers from caniuse.com">
</picture>