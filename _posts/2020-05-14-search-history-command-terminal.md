---
layout: post
title: Search through the history of commands in terminal
image: /cdn/search-command-history.png
categories: [Terminal]
---

Admit it. Remembering a lot of terminal commands can be overwhelming and often tiring. What if I tell you there's a pretty handy way of searching through all of your previous commands using a few keystrokes? Follow along.

Terminals in Linux and macOS have this nifty search called *"reverse search"* or `reverse-i-search` which you can invoke by typing a few keywords from your desired command and then pressing <kbd>Ctrl</kbd> + <kbd>R</kbd>.

So, for instance, if I want to find all the Artisan commands I've previously used, I could type *"arti"* and then press <kbd>Ctrl</kbd> + <kbd>R</kbd> and that will show me the recent command that contains *"arti"* like so.

![](/images/search-commands-terminal.png)

Now, you can cycle through all the available commands by <kbd>Ctrl</kbd> + <kbd>R</kbd> until you get your desired command.

The vice-versa is also possible where you can press <kbd>Ctrl</kbd> + <kbd>R</kbd> and then type in your search keyword, which will work just like I've mentioned previously.

Behind the scene, the command will search through `~/.bash_history` where the history of all the commands gets maintained.

Very handy, right?

