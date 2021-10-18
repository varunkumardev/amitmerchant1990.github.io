---
layout: post
title: Track Git-style local changes in Chrome Dev Tools
image: /cdn/track-git-style-local-changes-in-chrome-dev-tools.png
categories: [ChromeDevTools]
fluidbox: true
---

Chrome's [Dev Tools](https://developer.chrome.com/docs/devtools/) is a gold mine of little features. While some of them are pretty useful, some are just there. But the problem here is these features sit deep inside the settings panel and to really discover them, you have to dig them. Feature-by-feature!

I have come across one such feature recently while I was playing around with CSS in Dev Tools.

So, how many times did it happen to you that you are changing various CSS properties right inside the Dev Tools and you lost track of the original values? I don't know about you but I find myself in this situation a whole lot of time.

And that's when I found this handy setting in Dev Tools that lets you see all the local changes you have made in the Dev Tools. 

To enable this, you'll need to open the menu by hitting the three-dot menu at the top right of the Dev Tools. 

From there, you'll need to select **More tools** > **Changes**.

[![](/images/open-changes-tab-chrome.png)](/images/open-changes-tab-chrome.png)

Once done, it will enable a new tab called *"Changes"* that will show you all the changes you made in the Dev Tools in the [Git-style](https://git-scm.com/docs/git-difftool) differences like so.

[![](/images/chrome-local-change-example.png)](/images/chrome-local-change-example.png)

As you can tell, it's handy to track all the changes (file-wise) visually pretty easily!

