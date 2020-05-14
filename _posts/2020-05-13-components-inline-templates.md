---
layout: post
title: Components with inline templates in Vue.js
image: /cdn/inline-templates-vue.png
categories: [Vue]
---

Vue.js has this handy feature where you can set the `inline-template` special attribute on the component and now the component can use its inner content as its template, rather than treating it as distributed content.

So, for instance, let's say I have this component called `sidebar`, I can attach the `inline-template` attribute to it like so.

```html
<sidebar inline-template>
    <ul>
        <li>{% raw %}{{ elementAbout }}{% endraw %}</li>
        <li>{% raw %}{{ elementContact }}{% endraw %}</li>
        <li>{% raw %}{{ elementTheme }}{% endraw %}</li>
    </ul>
</sidebar>
```

Now, Vue will treat the content inside the `sidebar` as its template and you don't have to give template explicitly using `Vue.component`. This can be useful when you want to add some amount of reactivity to a little part of the application without adding a lot of complexity.

> Although, this is an inline template, the rules for the template are still true here. i.e , You've to wrap your entire template into a single root element and that is exactly what I did in this example by wrapping the content in a single root element `<ul>`.

Now, we can define the component and make it dynamic like so.

```js
Vue.component('sidebar', {
    data() {
        return {
            elementAbout: 'Amit Merchant',
            elementContact: 'test@amitmerchant.com',
            elementTheme: 'Dark'
        };
    }
})
```

Here's the complete example on the [CodePen](https://codepen.io/amit_merchant/pen/NWGzeJK?editors=0010).

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="html,result" data-user="amit_merchant" data-slug-hash="NWGzeJK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Vue Inline Template Example">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/NWGzeJK">
  Vue Inline Template Example</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

