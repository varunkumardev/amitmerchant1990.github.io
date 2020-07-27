---
layout: post
title: Freeze scroll on arrow key up or down using JavaScript
image: /cdn/disable-scroll-arrow-key-up-down-javascript.png
categories: [JavaScript]
---

I was working on implementing the [Konami code easter egg](/implement-konami-code-easter-egg/) on this blog and there was this need where I need to stop the scrolling only when the previous two presses by the user are `ArrowUp`.

To give a primer, the Konami code consists of the following key sequence:

<kbd>↑</kbd><kbd>↑</kbd><kbd>↓</kbd><kbd>↓</kbd><kbd>←</kbd><kbd>→</kbd><kbd>←</kbd><kbd>→</kbd><kbd>B</kbd><kbd>A</kbd>

Now, as you can see, the firt two keypresses are <kbd>↑</kbd><kbd>↑</kbd>. I wanted to disable the scrolling on this point onwards. i.e sarting from <kbd>↓</kbd>. Because I wanted the user to be on the same place when he/she presses <kbd>↓</kbd> after pressing <kbd>↑</kbd><kbd>↑</kbd>.

To check this, I added an event-listener on `keydown` like so.

```js
document.addEventListener('keydown', function(e) {
    // To make sure it freezes the scroll when 
    // the first two keypresses are "ArrowUp"
    if (
        keySequence[0] === 'ArrowUp' 
        && keySequence[1] === 'ArrowUp' 
        && e.key === 'ArrowDown'
    ) {
        e.preventDefault();
    }
});
```

As you can see, I'm checking if the fist two indexes in `keySequence`(where I store user-entered keystrokes) array contains `ArrowUp` and the next key is `ArrowDown`, I would just prevent the scroll by [disabling the default key action](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault) of `ArrowDown` using `e.preventDefault();`.

That's it! It will disable the scroll further if this scenario happens and that is what I wanted. And the code also makes sure, it behaves like this only if a certain scenario arrives.
