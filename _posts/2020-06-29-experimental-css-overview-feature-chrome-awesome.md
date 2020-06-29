---
layout: post
title: This experimental CSS Overview feature of Chrome is awesome
image: /cdn/experimental-css-overview-feature-chrome-awesome.png
categories: [CSS]
fluidbox: true
---

The Chrome browser is one of the widely used web browsers by developers. The DevTools it bundles within is mature and ahead of its competition. But there are certain features that Chrome Developers don't expose explicitly. Rather, you'd have to look out for those features by digging deep inside the settings.

One such feature that I've recently discovered is called **"CSS Overview"** which is an experimental feature. The feature gives developers the ability to have an overview of the CSS on websites. This includes *details about all the selectors*, *colors used on the website*, *fonts*, *details regarding media queries used*, and few other things in nicely separated sections. 

It potentially does this by analyzing the external stylesheets and inline stylesheets that the website is using. You'll learn how to enable this feature and how the information can be useful for developers.

## How to enable "CSS Overview"

To enable this feature, first...

- Open the DevTools on the website you want to have CSS over of. You can invoke DevTools using shortcut <kbd>Shift</kbd> + <kbd>Ctrl</kbd> + <kbd>J</kbd> (On Windows/Linux) or <kbd>Option</kbd> + <kbd>⌘</kbd> + <kbd>J</kbd> (on macOS)

- Next, open the **Setting** of the DevTools using shortcut <kbd>Shift</kbd> + <kbd>?</kbd>

- Open the **Experiments** tab from the left sidebar.

- This is where you'd find **CSS Overview** option. Check that.

- Close the setting, reload the website, and re-open the DevTools.

## Using “CSS Overview”

Once done, there will be a new "CSS Overview" tab added in DevTools like so.

[![](/images/css-overview-tab.png)](/images/css-overview-tab.png)

You can start capturing an overview by pressing **"Capture overview"** button over there. Once done, the tab will get populated with a host of information about the CSS this website is using in the following manner.

[![](/images/css-overview-done.png)](/images/css-overview-done.png)

As you can see, the information is divided into five sections.

- **Overview summary** - It gives information about CSS elements, external stylesheets, media queries, style rules, class selectors, and few other things used on the site in numbers. This is a nice way of analyzing the CSS and can come handy in optimize it further.

- **Colors** - It gives information about all the colors that is been used on the website. This includes background colors, text colors, fill colors, border colors, and so on. This is handy to have an overview of the color palette used on the website. The nice thing about this is, you can click on one of the colors which ultimately reveals where it's been used. Pretty cool!

- **Font info** - It contains information related to fonts that is been used at different places on the website.

- **Unused declarations** - It gives information about unused CSS declarations if there are any.

- **Media queries** - It gives information related to all the media queries used on the website with occurrences of those on the website.

## In closing

Even though this feature is in the experimental state, it exposes a wide variety of the CSS related details and hence useful in many ways. I hope this will land in as a standalone feature in the DevTools so that more developers can get benefitted from it rather than digging into the setting to enable it.

Until next time!
