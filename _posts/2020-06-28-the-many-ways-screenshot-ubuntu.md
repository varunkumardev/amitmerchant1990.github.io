---
layout: post
title: The many ways to take screenshots on Ubuntu
image: /cdn/the-many-ways-screenshot-ubuntu.png
categories: [Miscellaneous]
---

I take a lot of screenshots and they are part of my daily workflow. As I mentioned at my [uses](/uses/) page, I use [Ubuntu 18.04 LTS](http://releases.ubuntu.com/18.04/) as my primary OS and there are native shortcuts to take screen shot in this particular OS.

- <kbd>PrtSc</kbd> - The classic way to print the entire screen is by hitting <kbd>PrtSc</kbd> which ultimately saves the screenshot in the `Pictures` directory.
- <kbd>Alt</kbd> + <kbd>PrtSc</kbd> - The combination of these two keys takes the screenshot of the active window and saves it in the `Pictures` directory.
- <kbd>Shift</kbd> + <kbd>PrtSc</kbd> - This will allow you to take part of the screen by giving you a selection tool and saves it to the `Pictures` directory.
- <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>PrtSc</kbd> - It will do same as <kbd>Shift</kbd> + <kbd>PrtSc</kbd> but instead of saving the screenshot into the `Pictures` directory, it will copy the selection into the system clipboard.
- <kbd>Ctrl</kbd> + <kbd>PrtSc</kbd> - This will save the entire screenshot of the entire screen into the system clipboard.

These all are native way to take screenshots on Ubuntu but these methods are not intuitive. So, if you want more adavanced usage, you'll need to install third-party tools.

## [Flameshot](https://flameshot.js.org)

The one that I'm currently using is called [Flameshot](https://flameshot.js.org). This is a pretty great tool of taking screenshots. It has got loads of features into it. But the feature that get me using this tool is the resizable selection area that it gives while taking screenshot.

So, whenever you invoke Flameshot, it will allow you to select part of the screen. But after selection it won't just go away. The selection would stay there and allow you to resize the selection with options to draw, annotate, blur things on the image and host of other features like so.

![Flameshot](/images/flameshot-tool.png)

You can install Flameshot in Ubuntu using following command:

```bash
$ apt install flameshot
```

You can learn more about Flameshot such as keyboard shortcuts and installation in other Linux environments at its GitHub repository over [here](https://github.com/lupoDharkael/flameshot).

## [Zoho's Annotator Tool](https://www.zoho.com/annotator/)

This is not really specific to Ubuntu (Or Linux) but [Zoho's Annotator](https://www.zoho.com/annotator) is the chrome extension if I want to take screenshots in the Chrome browser. For instance, the tool allows you to take full page screenshots, which wouldn't be possible to do with previously mentioned tools.

Apart from this, it allows you take regular screenshots and has a really nice support for image annotations. 

What's more? It even lets you take screenshots of the application windows using "Desktop Screen" option.

You can learn about how to install it and entire list of features on its [official website](https://www.zoho.com/annotator/).