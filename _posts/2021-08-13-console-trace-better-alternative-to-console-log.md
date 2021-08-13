---
layout: post
title: console.trace — A better alternative to console.log
image: /cdn/console-trace-better-alternative-to-console-log.png
categories: [JavaScript]
fluidbox: true
---

If you ask me what is that one thing that I (over)use when working with JavaScript application, the only answer you'll get is `console.log()`.

* TOC*
{:toc}

You can use the `console.log()` method to output messages to the web console. The message may be a single string (with optional substitution values), or it may be one or more JavaScript objects.

It's like a swiss army knife that you can use in every scenario you imagine but the most probable scenario when you want to reach this method is when you want to debug something.

Maybe printing an object which is breaking the flow of your application or just checking a weird conditional.

The `console.log()` method can be certainly at your rescue in these situations but you know what there's one more method called `console.trace()` which is exactly like `console.log()` but more useful.

## The `console.trace()` method

As I mentioned, there exists this method called `trace()` inside the [console](https://developer.mozilla.org/en-US/docs/Web/API/console) object which does exactly the same as the `log()` method but apart from just printing the message, it also provides a stack trace.

Essentially, it will show you the call path taken to reach the point at which you call the `console.trace()` function.

Take the following for example.

```js
function Foo() {
    function Bar() {
        console.trace('Foo Bar');
    }

    Bar();
}

Foo();
```

If we run the above example in the Chrome dev tools, you will get the following.

[![](/images/console-trace.png)](/images/console-trace.png)

As you can tell, the `console.trace()` method prints the message *"Foo Bar"* and on top of this, it also shows the entire call path from which the method is called. 

For instance, in this case, the `Foo()` method is called first and the `Bar()` method is called (including the line numbers).

## Advantages

This is useful in scenarios where your application is complex and you are not able to figure out how some of the methods are being called from different modules or files.

The `console.trace()` would give you an entire stack trace of the functions including the files from which they are called.

In my opinion, you can use the `console.trace()` method in every place where you would use the `console.log()` method. If you are getting the stack traces in the addition, I see no reason why you should keep using `console.log()`.
