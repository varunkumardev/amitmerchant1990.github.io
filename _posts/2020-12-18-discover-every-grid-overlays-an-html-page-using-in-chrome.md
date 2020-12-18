---
layout: post
title: Discover every CSS grid on an HTML page using Chrome
image: /cdn/discover-every-css-grid-an-html-page-using-in-chrome.png
categories: [CSS]
fluidbox: true
---

Lately, I've been revamping the **"Featured Articles"** section which is there on the homepage using [CSS Grid layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout). It's not that it wasn't using grids previously. Just that the way I have implemented them previously was sort of inefficient and bloated.

And so, I have been redesigning it entirely. And that's where I stumbled across this cool feature of Chrome DevTools.

## The "Layouts" pane

Chrome's latest version `v87` has introduced a new [Layout](https://developers.google.com/web/tools/chrome-devtools/css/grid) pane in the DevTools. This pane would give you information about all the grids the HTML page is using and an easy way to navigate to those.

For instance, when I pop open the DevTools on my blog, this is how the **"Layout"** pane is showing all the grid the page is using.

[![](/images/grid-layout-chrome.png)](/images/grid-layout-chrome.png)

As you can tell, in the **"Layout"** pane, under **"Grids > Grid overlays"** section, you can see the **list of all the grids** this page is using. Selecting a grid through the checkbox would reveal the corresponding grid on the page as you can see.

If you want to see the grid in the **"Elements"** panel, you can do it by clicking the arrow button next to it. This will navigate you to the grid on the HTML page as well.

Apart from this, you can also change the color representation of grids through the color picker next to the grid name.

## In closing

In my opinion, this little feature is really useful as you can visualize each grid all in one place rather than hunting them down manually.