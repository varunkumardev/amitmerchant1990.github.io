---
layout: post
title: Quickly sudo-ing the previous command in Bash Shell
image: /cdn/quickly-sudo-ing-the-previous-command-in-linux-bash.png
categories: [Bash]
fluidbox: true
---

It's just another day where I [got to learn](https://twitter.com/RutujaWillDoit/status/1390344234591563781) gemstone of command for Linux's [Bash shell](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) once again.

So, you probably have run into this scenario where you forget to type `sudo` before your command that requires root privileges. For instance, the `apt-get install` command.

When you do this, the bash terminal would give you the following error.

[![](/images/bash-sudo-error.png)](/images/bash-sudo-error.png)

So, to run this command with sudo what you would normally do is go back to that command and prepend `sudo` to it, right? Not anymore.

## ✨ Enter `sudo !!` ✨

There's *a better and quick way* to do it with just one command. Check it out.

```bash
$ sudo !!
```

What this command will do is it will run the previously run command with `sudo` so you don't need to go back to the command and prepend or type the command all the way from scratch.

[![](/images/sudo-nifty.png)](/images/sudo-nifty.png)

It's just a nifty little command that can improve your workflow dramatically.

But be aware that this command only works in Bash-based shell. So, that's the only caveat you need to know.