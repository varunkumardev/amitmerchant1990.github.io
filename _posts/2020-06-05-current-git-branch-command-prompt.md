---
layout: post
title: Showing current Git branch for the project in command prompt
image: /cdn/current-branch-command-prompt.png
categories: [Terminal]
---

It's always a nice idea to add something to your workflow which can enhance your productivity. Even if it's as small as showing the current Git branch for your project in command prompt like so.

```bash
amitmerchant@hp-notebook:~/workspace/amitmerchant1990.github.io (master)$ 
```

As you can see, the prompt shows the branch (`master` in my case) on which the project is right now at the end of the prompt. It's subtle and it'll be always there and this way you don't have to `git status` every now and then just to check on which branch you're currently on.

So, how would you add this in your command prompt? Well, the magic lies in the `.bashrc` file of your terminal which holds all the configurations for the same. I'm using Ubuntu 18.04, so in my case it was there in `home` directory. You might need to find it differently according to your operating system.

Open the `.bashrc`, spot the following lines.

```bash
if [ "$color_prompt" = yes ]; then
    PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\$ '
else
    PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w\$ '
fi
unset color_prompt force_color_prompt
```

For the safe side, comment these lines and add following,

```bash
parse_git_branch() {
 git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

if [ "$color_prompt" = yes ]; then
 PS1='${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\h\[\033[00m\]:\[\033[01;34m\]\w\[\033[01;31m\] $(parse_git_branch)\[\033[00m\]\$ '
else
 PS1='${debian_chroot:+($debian_chroot)}\u@\h:\w$(parse_git_branch)\$ '
fi
```

The magic lies in the `parse_git_branch` method, which try to check the current branch for the directory and if it's able to get the branch it'll get appended to the prompt.

Save it and you're done! This all you'll need to do. Now, once you restart your terminal and move to your project's directory, it'll show you the current branch like so.

![](/images/bash-current-branch.png)