---
layout: post
title: Creating Keyboard shortcuts of combination of keys in JavaScript
image: /cdn/creating-keyboard-shortcuts-combination-keys-javascript.png
categories: [JavaScript]
---

Recently, I added a set of few keyboard shortcuts on this blog which helps in navigating through different parts of the blog conveniently. You can check all the shortcuts on [this dedicated page](/keyboard-shortcuts).

Most of these shortcuts are made of a combination of keys. Meaning, an operation is being triggered when you press a certain set of keys simultaneously.

## Two keys shortcut

For instance, there's a shortcut to naviagating to the [categories](/categories) page by pressing <kbd>Shift</kbd> + <kbd>C</kbd> keys simultaneously.

How do you register if these keys are pressed simultaneously? Check the below code first.

```js
window.addEventListener('keydown', function (event) {
    if (event.shiftKey && event.code === 'KeyC') {
        window.location.href = '/categories';
    }
});
```

As you can tell, I've used the [keydown](https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event) event to identify the key presses. 

Inside of the listener, I've used the [keyboard](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent) `event`'s various properties to check which keys are pressed.

To check whether the <kbd>Shift</kbd> key is pressed, we can use the [shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/shiftKey) property of the event (which indicates if the shift key was pressed (`true`) or not (`false`) when the event occurred.) and to further check whether the <kbd>C</kbd> key is pressed, we can use the `code` property of the event in conjunction with the shift key.

This will deduce if both the keys in question are pressed simultaneously and based on that it will navigate the user to the categories page.

Essentially, when you press any key on the keyboard, the event will always register the status of the below keys in the object like so.

- `event.shiftKey` - Indicates if the shift key was pressed (`true`) or not (`false`) when the event occurred.
- `event.ctrltKey` - Indicates if the control/cmd key was pressed (`true`) or not (`false`) when the event occurred.
- `event.altKey` - Indicates if the alt key was pressed (`true`) or not (`false`) when the event occurred.

You can use these properties to create shortcuts which requires a combination of multiple keys (including <kbd>Ctrl</kbd>, <kbd>Alt</kbd>, and <kbd>Shift</kbd>).

## Three keys shortcut

So, for instance, if you want to create a shortcut for <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd>, you can do it like so.

```js
window.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.shiftKey && event.code === 'KeyU') {
        // do something here
    }
});
```