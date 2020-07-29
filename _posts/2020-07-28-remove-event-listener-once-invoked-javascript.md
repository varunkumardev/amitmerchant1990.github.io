---
layout: post
title: Remove event listener once it's invoked in JavaScript 
image: /cdn/remove-event-listener-once-invoked-javascript.png
categories: [JavaScript]
---

The usual way of adding event-listener on certain elements is using the `addEventListener` method on the element. For instance, if you want to register a click event on an element with id `checkoutBtn`, you can do it like so.

```js
const checkoutBtn = document.getElementById('checkoutBtn');

checkoutBtn.addEventListener('click', function() {
    alert('You clicked the checkout button.');
});
```

This will register a `click` event and the callback function will be called whenever the specified event is delivered to the target. In this case, it will show a JavaScript alert every time user clicks on the `checkoutBtn` button.

Now, this happens every time a user clicks the button. Meaning the lifetime of this listener is equal to the time page persists into the browser.

But, there might be a scenario where you might only want to invoke the click event once and after that, you no longer want to listen to the click event on the element anymore.

Well, there's a third parameter in the `addEventListener` method that you can pass as an object in which you can set certain options for the event-listener.

Among [those options](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters), the one is called `once` which, if set to `true`, it indicates that the `listener` should be invoked at most once after being added and it would be automatically removed when invoked.

Here's how the previous example would look like if `once` is passed as an option.

```js
checkoutBtn.addEventListener('click', function() {
    alert('You clicked the checkout button.');
},{
    // This will invoke the event once and de-register it afterward
    once: true
});
```

This will only bring the alert the first time you click the button. It won't trigger it afterward.

Watch it in action here.

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="amit_merchant" data-slug-hash="jOWoKJJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Event-listener Once">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/jOWoKJJ">
  Event-listener Once</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

*Note that this is applicable to every event that you can register using `addEventListener`.*