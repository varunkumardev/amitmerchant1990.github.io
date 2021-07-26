---
layout: post
title: Break HTML content into newspaper-like columns using pure CSS
image: /cdn/how-to-break-html-content-into-columns-using-pure-css.png
categories: [CSS]
---

Sometimes, the things you might think are tricky to implement can turn out to be a matter of just a few lines of code if you read the documentation.

For instance, let's say you want to break the content into a specified number of columns just like how you see in the newspapers like so.

![](/images/newspaper-column.jpg)

How would do that? At first, you might want to reach for a fancy flexbox or grid-related approach and tweak these to achieve what you want.

But you know what? This can be possible using just one line of code in CSS.

## The `column-count` property

Using the [column-count](https://developer.mozilla.org/en-US/docs/Web/CSS/column-count) property you can break an element's content into a specified number of columns.

For instance, if you want to break the content inside a `<p>` element into 2 columns, you can do it like so.

```css
p {
    column-count: 2;
}
```

Here's the property in action.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="LYyeZbe" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/LYyeZbe">
  The `column-count` property</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

That's it! That's all you need.

Now, the great thing about this property is, it works equally well for the content that lies in nested elements. So, for instance, check the following example.

```html
<div class="nested-content">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed blandit quam id metus fringilla fringilla. Nulla vestibulum egestas ipsum, non vulputate nisi. Vestibulum velit metus, elementum in nisi eget, vulputate tristique ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Donec ut pretium metus. Mauris sit amet leo neque. Sed commodo felis purus, sit amet mollis dolor tristique non. Phasellus eleifend blandit mauris at cursus. Donec lacinia eget nunc nec porttitor.
    </p>
    <div>
        <p>
            Duis rutrum suscipit ex. Aenean aliquam elit eleifend bibendum scelerisque. Sed ac erat vel dolor venenatis feugiat at in sem. Nam nulla risus, sagittis quis odio eu, euismod tristique sem. Curabitur non consectetur orci, quis gravida justo. In efficitur sem at efficitur faucibus. Aliquam fringilla tempor ligula, vestibulum cursus nisi tincidunt ut. Etiam quis massa vestibulum felis venenatis elementum. Vestibulum dictum condimentum nunc. Proin ac risus sit amet nulla pharetra venenatis. Suspendisse tincidunt dictum eleifend. Nullam at sem sapien. Nulla felis nibh, pretium nec sapien id, porta fermentum magna. Nulla facilisi.
        </p>
        <p>
            In varius ligula gravida, faucibus urna ut, maximus elit. Curabitur vitae erat vehicula, ultrices nunc vel, fermentum risus. Integer ut accumsan mi, at laoreet justo. Nulla ac libero aliquam, fermentum velit ut, mattis ipsum. Quisque cursus laoreet rutrum. Nam pretium est velit, in tristique purus facilisis quis. Sed nec bibendum ex, vitae gravida risus. Sed gravida viverra urna, sed sagittis nibh posuere quis.
        </p>
    </div>
</div>
```

As you can tell, in this example, the content is deeply nested and yet, `column-count` will work surprisingly well.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="bGWaeqP" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/bGWaeqP">
  The `column-count` property</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Sidekick properties

You can also use two more *sidekick* properties in conjunction with the `column-count` property to enhance the experience further.

The first one is the `column-gap` property.

As its name suggests, it sets the size of the gap (gutter) between an element's columns.

And the second one is the `column-rule` property.

This property sets the width, style, and color of the line drawn between columns in a multi-column layout.

Here are both the properties in action.

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="html,result" data-slug-hash="rNmpLKw" data-user="amit_merchant" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/rNmpLKw">
  The `column-count` property</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## In closing

All the properties I mentioned in this article are supported in all modern browsers. So, yes, you can use these in production without worrying about workarounds or polyfills!

