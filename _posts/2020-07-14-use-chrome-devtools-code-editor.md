---
layout: post
title: Using Chrome DevTools as a secret code editor
image: /cdn/use-chrome-devtools-code-editor.png
categories: [ChromeDevTools]
fluidbox: true
---

That's right! You can even use Chrome [DevTools](https://developers.google.com/web/tools/chrome-devtools) as your *"Adhoc"* code editor. Now, why would you do that, you ask? Well, there are a few reasons.

- You don't want to install a full-fledged code editor on your machine.
- Let's just face it. It's just fun!

So, to make your DevTools turn to a code editor, here's what you'll have to do.

- Open DevTools.
- Open the **"Sources"** tab.
- Open the **"Filesystem"** tab in the left sidebar like so.

[![](/images/chrome-filesystem.png)](/images/chrome-filesystem.png)

- Press the **"+"** button which will allow you to **"Add folder to workspace"**.
- Once selecting your desired folder, it will ask for permission to access it like so.

[![](/images/chrome-devtools-permission-filesystem.png)](/images/chrome-devtools-permission-filesystem.png)

- On pressing **"Allow"**, the desired folder will get added to the workspace and is now ready to use. Here's how it looks like.

[![](/images/chrome-devtools-code-editor.png)](/images/chrome-devtools-code-editor.png)

That's all! You're all set to use the great DevTools as a code editor. 

It has the following features.

- A nice syntax highlighting for almost all the popular programming languages (including the backend ones such as PHP, Ruby, etc)
- Create files in project directories.
- Support for multiple projects in the workspace.

Sure, you miss some of the "intelligence", the likes you get in VS Code-ish sort of editors.. but hey! you wouldn't expect more from an editor that comes inside of the DevTools as sort of an "easter egg", no?

Let me know what you think about it in the comments.

Until next time!

