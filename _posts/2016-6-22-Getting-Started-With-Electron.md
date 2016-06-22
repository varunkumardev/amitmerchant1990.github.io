---
layout: post
title: Getting started with Electron
---

Have you ever wanted to develop desktop apps while being a true web developer without even caring about the native architecture or the language most of the applications build for different platforms likes of Windows, macOS or Linux? Or you just wanted to get started with building desktop apps? Isn't it great if you are able to build desktop apps using the technologies you already knows i.e. HTML, JavaScript and CSS? I was in the same urge to dive into world of desktop apps. So, I have been stuck on to [GitHub](https://github.com)'s [Electron](http://electron.atom.io/) lately.

## What is Electron?

From official [Electron](http://electron.atom.io/)'s site, "Electron is a framework for creating native applications with web technologies like JavaScript, HTML, and CSS. It takes care of the hard parts so you can focus on the core of your application."

_Sweet_. Isn't it? You may be wondering which hard parts?! Electron basically makes it easy to implement automatic updates, native menus and APIs, App Crash Reporting, Debugging of your app a lot easier which you won't find in many similar solutions available in the market. Such as [nw.js](http://nwjs.io/) And when any project is backed by GitHub, you can use it with your eyes closed.

## Getting started with building the app

My philosophy to learn a new technology is to take a real world idea and try to implement it with that particular technology. In this case, I have decided to build a simple [Markdown Editor app](https://github.com/amitmerchant1990/electron-markdownify) which can do following:

  - Show live preview of Markdown while writing the same
  - Show the relevant HTML for Markdown
  - Basic Markdown editing
  - Support for GitHub Flavored Markdown


So, taking above requirements into account, I have started building it by first cloning the [Quick Start repository](https://github.com/electron/electron-quick-start)

```bash
$ git clone https://github.com/electron/electron-quick-start

$ ren electron-quick-start electron-markdownify

$ cd electron-markdownify

$ npm install && npm start
```
This gave me the very basic structure of Electron and all the necessary node dependencies installed including the `electron-prebuilt` which is the heart of any electron app and the starts the very app itself!

The app's folder structure contains a `main.js` file, an HTML file and `package.json`.

Electron basically runs two processes when running it : 1) Main Process 2) Renderer Process.

In a nutshell, Electron provides a runtime to build desktop applications with pure JavaScript. The way it works is — Electron takes a main file defined in your `package.json` file and executes it. This main file (usually named main.js) then creates application windows which contain rendered web pages with the added power of interacting with the native GUI (graphical user interface) of your operating system.

Render process involves the core JavaScript we write within the HTML to drive frontend functioning of the app.

Next, to make it convenient to user to write Markdowns, I have used [CodeMirror](http://codemirror.net/) which is a web based code editor. This made writing Markdown easy and beautiful.

Further, as my app is a Markdown editor, I needed a Markdown parser which can convert the plain Markdown in to the HTML which can be previewed. So, I have used this awesome Markdown parser named [marked](https://github.com/chjj/marked). It has all the things I needed including GFM.

Combining all bits and pieces, I have been finally done with my original prototype. You can see the end product over [here](https://github.com/amitmerchant1990/electron-markdownify).

## Final words

Throughout this journey, I have explored many new things about desktop app development such as packaging and distributing the app, handling exceptions for different operating systems and so on.

The app is still in beta and I'm still learning Electron. The more I know about Electron, the more I fell in love with it. It sure is a future of desktop apps.

_That's all folks!_
