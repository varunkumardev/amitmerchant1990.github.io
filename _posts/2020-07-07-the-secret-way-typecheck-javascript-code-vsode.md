---
layout: post
title: The secret way to type-check JavaScript in VS Code
image: /cdn/the-secret-way-typecheck-javascript-code-vsode.png
categories: [VS Code]
---

We all know that [VS Code](https://code.visualstudio.com/) comes with a great support for TypeScriptm language out-of-the-box. Meaning, if you're working with `.ts` files in VS Code, VS Code will prompt type related errors if there are any.

This is fine as long as you're working with TypeScript file but what if you want to type-check your JavaScript code so that you can spot mistakes you might not have caught otherwise? 

> VS Code has this handy feature where you can run TypeScript type checker on your existing JavaScript code by just adding a `// @ts-check` comment to the top of your file. 

Once added, it can show type errors like so.

![ts-check](/images/tscheck.png)

I think it's really useful at minimizing some nasty JavaScript type errors in early development phase only and the good thing is it comes at no extra cost! So, there is no reason you shouldn't use it.