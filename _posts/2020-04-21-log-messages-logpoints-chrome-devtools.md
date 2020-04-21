---
layout: post
title: Log messages directly into the console using Logpoints
image: /cdn/logpoints.png
categories: [ChromeDevTools]
fluidbox: true
---

Have you ever been in a situation where you're testing an application but you don't have access to the source code but you still want to debug some part of the code by console logging the variables? 

This can be a situation where you're checking out a production version of the application but you don't have access to the source code of the same. For instance, let's say, you're checking this application [notepad.js.org](https://notepad.js.org/) and it has this JavaScript file at `js/app.js` which drives all of the JS related stuff of the application. You can access this file by going to [notepad.js.org](https://notepad.js.org/) and pressing <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>P</kbd> and searching "app.js" into it.

In this specific file, there's a logic which retrieves the `bodyClass` of the app (which is used to switch between Dark/Light mode) based on the toggle.

[![](/images/notepad-appjs.png)](/images/notepad-appjs.png)

Now, all you want to do is log this variable to console. How would you do it without access to the source code? Well, in this case, DevTool's Logpoints can come to your rescue.

## Logpoints

Logpoints can be used to log messages to the Console without cluttering up your code with `console.log()` calls and also for the aformentioned reason.

Let's see how it works.

You go to the file in the console sources as I mentioned previously, i.e pressing <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>P</kbd> and searching `app.js`. Now..

- Right-click the line number where you want to add the Logpoint. In our case, we want to do it just after the line where it's been assigned a value.

[![](/images/logpoint-step1.png)](/images/logpoint-step1.png)

- Select Add logpoint. The Breakpoint Editor pops up where you need to select the "Add logpoint..." and enter the variable that you want to log like so.

[![](/images/logpoint-step2.png)](/images/logpoint-step2.png)

- Press Enter or click outside of the Breakpoint Editor to save. The orange badge on top of the line number represents the Logpoint.

[![](/images/logpoint-step3.png)](/images/logpoint-step3.png)

- Now, reload the app and the next time that the line executes, in our case on dark mode toggle, DevTools logs the result of the Logpoint expression to the Console.

[![](/images/logpoint-step4.png)](/images/logpoint-step4.png)

As you can see upon switching to the Dark mode, we have the console message logged which we added through the Logpoint.

Pretty handy, right?

So, the next time when you want to do some console logging, don't ruin your code with too many `console.log`s. Use Logpoints instead!