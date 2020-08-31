---
layout: post
title: Making my VS Code minimal and distraction-free
image: /cdn/making-my-vs-code-setup-minimal-and-distraction-free.png
categories: [VS Code]
fluidbox: true
---

Before proceeding on describing all the customizations I made, I have a confession to make.

*"I love [VS Code](https://code.visualstudio.com/)... I freaking love this editor!"*

While I as much as love the simplicity and extensibility of this editor, I tend to hate the chaos that the default layout of it brings. Clutters such as activity bar, status bar, sidebar consumes staggering screen space which otherwise would be useful for doing the main task that I'd be using it in the first place. Below is the setup I was using previously...

[![VS Code Before](/images/vscode-before.png)](/images/vscode-before.png)

This looks pretty congested in my taste and in addition to this, I'm using a 15" laptop and because of that, I tend to get even less space. 

Thankfully, VS Code is very customizable even when it comes to changing its overall layout. And so, I tweaked some of the built-in default preferences of VS Code. And after applying those tweaks my editor now looks like below.

[![VS Code After](/images/vscode-after.png)](/images/vscode-after.png)

Pretty clean, isn't it? If you find this interesting, I'll walk you through all the settings using which you can also make your VS Code look like this.

* TOC
{:toc}

### Remove Status Bar

First, let's get rid of the status bar which lies in the bottom of the editor which shows the file language, current line and column numbers, and a few Git related things. I personally don't make use of the status bar and so, I removed it.

To remove it, open command palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) and search `Toggel Status Bar Visibility` and select it. This will remove the status bar from the bottom.

### Remove Activity Bar

Next, let's get rid of the Activity Bar which sits in the far left. This provides a UI to access *Explorer*, *Search*, *Source Control*, *Run* and *Extension* panel. But we have been given shortcuts to access all these panels even if we don't have the Activity Bar enabled. Below are all the shortcuts to access different sidepanel areas.

- Explorer - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd>
- Search - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd>
- Source Control - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>G</kbd>
- Run - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>D</kbd>
- Extensions - <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd>

It's just a matter of remembering these shortcuts and we can safely hide this Activity Bar as well.

To do this, open command palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) and search `Toggel Activity Bar Visibility` and select it. This will remove the activity bar.

### Remove Side Bar

Next, we can proceed to hide the entire sidebar which holds the explorer, the source control, search, and extension panel. 

For this, open command palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) and search `Toggel Side Bar Visibility` and select it. This will remove the activity bar. Of course, you can toggle the visibilty of the sidebar anytime you want.

Sweet! At this point, your editor would be looking much cleaner and sober than before but we still have work to do.

### Remove Minimap

Next, we'll aim to remove the minimap that comes in-built and can be seen far right. It has the sole purpose to give you a high-level overview of your source code. Personally, I don't rely upon it and so I've removed it as well.

To do this, open command palette (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>) and search `Toggel Minimap` and select it. And bam! The minimap is gone as well!

### Remove Menubar and Gutter (Line Numbers)

Now, the only thing remains is to hide the menubar and remove the gutter that shows line numbers and the ability to fold the code.

First, let's remove menubar. To remove it, Go to **View > Appearance** and toggle **"Show Menu Bar"** option. This will hide the menubar. But, if in any case, you want to access it, you can do it by pressing <kbd>Alt</kbd>, and it'll appear right there.

And to remove the gutter, we have to change a couple of settings. For that go to the **"Settings"** and find the below preferences and change those values as I mention here.

```json
"editor.lineNumbers": "off"
"editor.glyphMargin": false
"editor.folding": false
```

And with that, your editor should be looking like the way I've shown previously. Clean, minimal, and beautiful!

Of course, to go back to the default layout, revert all these settings and you'll get the good old VS Code back.

And if you're wondering which color theme and fonts I'm using? The answer for that is I'm currently using a theme called [Hyper Dracula](https://marketplace.visualstudio.com/items?itemName=hilalh.hyper-dracula-vscode-theme) which is a ultra dark variant of the popular [Dracula](https://draculatheme.com/) theme and fonts that I'm using are [JetBrains Mono.](https://www.jetbrains.com/lp/mono/)

If you're a visual learner, I've made a video of the entire process which you can checkout as well.

<div class="videowrapper">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/VYzCM7JP0WI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>