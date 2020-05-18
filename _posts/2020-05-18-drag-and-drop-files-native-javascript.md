---
layout: post
title: Drag and drop files using only JavaScript
image: /cdn/drag-drop-javascript-1.png
categories: [JavaScript]
---

You've probably seen or have used this feature where you can upload files by dropping the selected files into the specific area. For example, how Gmail handles this while drafting emails. 

You can implement this using [some libraries](https://www.dropzonejs.com/) and be done with it... but what if I tell you could build this using only JavaScript? Well, it's fairly easy to do so.

You first need an element onto which files will get dropped. We can call it "dropzone".

```html
<div id="dropbox"></div>
```

Now, you can attach some events listeners onto this element. Following are the events that we'll need to add listeners to.

- `dragenter` - The event is fired when a dragged element or text selection enters a valid drop target.
- `dragover` - The event is fired when an element or text selection is being dragged over a valid drop target (every few hundred milliseconds).
- `drop` - The event is fired when an element or text selection is dropped on a valid drop target.

```js
let dropbox;

dropbox = document.getElementById("dropbox");

dropbox.addEventListener("dragenter", dragenter, false);
dropbox.addEventListener("dragover", dragover, false);
dropbox.addEventListener("drop", drop, false);
```

Now, for our example to work, we don't need to worry about the `dragenter` and `dragover` events, so these functions are both simple. They just stop the propagation of the event and prevent the default action from occurring like so.

```js
function dragenter(e) {
  e.stopPropagation();
  e.preventDefault();
}

function dragover(e) {
  e.stopPropagation();
  e.preventDefault();
} 
```

The `drop` event is the one which do all the work. Here's how our function `drop()` would look like.

```js
function drop(e) {
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer;
  const files = dt.files;

  console.log(files);
}
```

Here, we retrieve the `dataTransfer` field from the event, pull the `file` list out of it and console logged it.

Upon checking the log, you can get some of the details, such as `name`, `size`, `type`, `lastModified` of the dropped files in form of `FileList` object like so.

![](/images/file-list.png)

In a real application, you would pass this file list to some function which can handle the files the same way whether the user used the `input` element.

Here's the entire example [on CodePen](https://codepen.io/amit_merchant/pen/JjYeEZm).

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="js,result" data-user="amit_merchant" data-slug-hash="JjYeEZm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Darg and Drop using native JavaScript">
  <span>See the Pen <a href="https://codepen.io/amit_merchant/pen/JjYeEZm">
  Darg and Drop using native JavaScript</a> by Amit Merchant (<a href="https://codepen.io/amit_merchant">@amit_merchant</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>




