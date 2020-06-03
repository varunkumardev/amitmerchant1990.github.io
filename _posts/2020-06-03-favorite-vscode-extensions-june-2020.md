---
layout: post
title: My absolute favorite VS Code extensions - June 2020
image: /cdn/favorite-vscode-extensions-june-2020.png
categories: [VS Code]
---

VS Code extensions are a great way to enhance the experience of the already great editor of recent times. I tend to experiment different sort of extensions which can improve my workflow or help me fix some of the pain points.

In this article, I'm going to list down my favorite [VS Code extensions](https://code.visualstudio.com/docs/editor/extension-gallery) that I'm currently using myself and have helped me improvise my developer life quite significantly.

## [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client)

I'm a PHP developer and my default IDE is [PhpStorm](https://www.jetbrains.com/phpstorm/) when it comes to working with PHP but sometimes I just want to open projects into VS Code for quick updates and this is where I miss PhpStorm's intelligence a lot. 

So, I was looking for an extension which can at least partially fulfil this gap and that's where I found PHP Intelephense which enables PHP code intelligence in VS Code.

Intelephense is a high-performance PHP language server packed full of essential features for productive PHP development. Here are some of the features of Intelephense that I love.

- Rapid workspace wide go to definition support.
- Workspace wide find all references.
- Detailed hover with links to official PHP documentation.
- Reads PHPStorm metadata for improved type analysis and suggestions.
- Lossless PSR-12 compatible document/range formatting.

Although the free version of this extension would be enough for your day-to-day need, there's also a [paid version](https://intelephense.com/) which add some additional features which you can if you like.

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install bmewburn.vscode-intelephense-client
```

## [CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek)

Ever wanted a functionality where you can jump to the CSS definition of the class right from where it's used?

[CSS Peek](https://marketplace.visualstudio.com/items?itemName=pranaygp.vscode-css-peek) can used just for that purpose. It allow peeking to CSS ID and class strings as definitions from html files to respective CSS. Allows peek and goto definition.

This extension extends `HTML` and `ejs` code editing with Go To Definition and Go To Symbol in Workspace support for css/scss/less (classes and IDs) found in strings within the source code.

Here is how to use it.

- **Peek**: Load the CSS file inline and make quick edits right there. (Ctrl+Shift+F12)
- **Go To**: Jump directly to the CSS file or open it in a new editor. (F12)
- **Hover**: Show the definition in a hover over the symbol. (Ctrl+hover)

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install pranaygp.vscode-css-peek
```

## [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks)

One of the features I always missed in VS Code (coming from PhpStorm) is the ability to bookmark lines in the files. This is helpful in remembering important code snippets by assigning a label to it, so that you can access it later on.

Luckily, I found [Bookmarks](https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks) which gets the job done for me for this particular usecase.

It helps you to navigate in your code, moving between important positions easily and quickly by adding bookmarks. There are commands using which you can add/clear bookmarks. Here are some of the commands.

- `Bookmarks: Toggle Labeled` Mark labeled bookmarks
- `Bookmarks: Toggle` Mark/unmark positions with bookmarks
- `Bookmarks: Jump to Next` Move the cursor forward, to the bookmark below
- `Bookmarks: Jump to Previous` Move the cursor backward, to the bookmark above
- `Bookmarks: List` List all bookmarks in the current file

Few of the commands can also be found in the context menu when you right click in the line where you want to add a bookmark.

The Bookmarks extension has its own Side Bar, giving you more free space in your Explorer view. You will have a few extra commands available:

- Jump to Bookmark
- Edit Label
- Remove Bookmark
- Clear Bookmark's file

![](/images/2020-06-03-11-28-30.png)

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install alefragnani.Bookmarks
```

## [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

I work with Tailwind a lot. So, it's natural for me to look for something which can help me find Tailwind utility classes in a faster way. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) lets you autocomplete the Tailwind classes. It uses your projects Tailwind installation and configuration to provide suggestions as you type.

It also includes features that improve the overall Tailwind experience, including improved syntax highlighting, and CSS previews.

![](/images/tailwind-example.gif)

Explore the entire list of features [over here](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) in the marketplace.

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install bradlc.vscode-tailwindcss
```

## [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)

[Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer) is a customizable extension for colorizing matching brackets.

This extension allows matching brackets to be identified with colours. The user can define which characters to match, and which colours to use.

![](/images/2020-06-03-11-40-31.png)

The extension is entirely configurable so you assign colors for the brackets according to your requirements. 

This is a must-have extension in my opinion.

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install CoenraadS.bracket-pair-colorizer
```

## [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image&ssr=false)

I write my articles in Markdown and one annoyance that I always face when adding images into the document. If you've ever worked with Markdown, you'll know that it's quite a hassle.

But using [Paste Image](https://marketplace.visualstudio.com/items?itemName=mushan.vscode-paste-image&ssr=false), adding images have become a breeze for me.

It lets you paste image directly from clipboard to markdown/asciidoc(or other file)! Here's how to use it.

- Capture screen to clipboard
- Open the command palette: Ctrl+Shift+P (`Cmd+Shift+P` on Mac)
- Type: "Paste Image" or you can use default keyboard binding: `Ctrl+Alt+V` (`Cmd+Alt+V` on Mac).
- Image will be saved in the folder that contains current editing file
- The relative path will be paste to current editing file

It has proven to be extremely useful for my workflow. A highly recommended if you work with Markdown a lot!

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install mushan.vscode-paste-image
```

## [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)

Speaking of Markdowns, this extension is a goldmine for all your Markdown needs. It has got all the utilities for keyboard shortcuts, auto completions, GitHub Flavored Markdown, Table of contents, Table formatter, and so forth.

But, my favorite feature amongst all of these is the ability to paste the link on the selected text and trust me this has saved me tonnes of time.

![](/images/paste-link.gif)

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install yzhang.markdown-all-in-one
```

## [Emoji](https://marketplace.visualstudio.com/items?itemName=Perkovec.emoji)

This is a fun extension. This lets you add emoji into your files right from the command palette. It has got all the general emojis and unicode emojis that can be used like so.

Run `Emoji: Insert emoji` or `Emoji: Insert emoji unicode` in the command palette and select the emoji to insert at the cursor.

![](/images/emoji-extension.gif)

This is especially in the operating systems, such as Linux, where emoji support is not there natively.

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install Perkovec.emoji
```

## [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils&ssr=false)

This plugin gives you a convenient way of creating, duplicating, moving, renaming and deleting files and directories.

Once installed, all the commands that this extension provides can be brought up by typing `File: ` in the command palette like so.

![](/images/2020-06-03-12-22-40.png)

This can be helpful in a large/complex application where duplicating files can be very tedious but this extension can come really handy in such scenarios. 

Install it by opening command palette (Ctrl+Shift+P), paste the following command, and press enter.

```
ext install sleistner.vscode-fileutils
```






