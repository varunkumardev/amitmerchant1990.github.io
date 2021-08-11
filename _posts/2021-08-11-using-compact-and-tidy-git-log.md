---
layout: post
title: Using compact and tidy Git Log
image: /cdn/compact-git-log.png
categories: [Git]
fluidbox: true
---

When it comes to using [Git](https://git-scm.com/) from the CLI, one of the commonly used commands is the [git log](https://git-scm.com/docs/git-log) command. The command essentially shows, as its name suggests, the log of all the commits (recent commit first).

When you run this command, it will show the list of all the commits. It will show information such as commit ID, author, date, current HEAD position, and message.

Here's what you'll typically get when running `git log`.

[![](/images/git-log.png)](/images/git-log.png)

Now, this is pretty alright but if you can notice, the list is taking a lot of space unnecessarily and because of that if you want to reach the much older commit, you would need to go further down by pressing the down arrow key on your keyboard. 

This is a kind of hassle we should avoid and that's where a handy alias for `git log` comes into the picture.

## A more compact `git log`

You can make things tidy for `git log` by creating a global Git alias and tweak the raw log. 

To make this work, all you need to do is you can copy the following Git alias and paste that into the `[alisas]` section of your `.gitconfig` file in your home directory like so.

```bash
[alias]
    # nice log
    l = "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --"
```

In my case, I added it into my `~/.gitconfig` file since I'm using Ubuntu 18.04.

Once added, now you use the alias `git l` and it will return the log in the following format.

[![](/images/git-log-compact.png)](/images/git-log-compact.png)

As you can tell, the log of commits is now more compact keeping all the different commit-related information on a single line which is easily distinguished by various colors.

Apart from this, the commit IDs are shortened as well. So, it would be easier to copy and use it somewhere else.

I got to learn about this near alias through the [dotfiles](https://github.com/timacdonald/dotfiles) of Tim MacDonald which he is been using for quite some time now.