---
layout: post
title: Smartly auto-correct commands in Git
image: /cdn/smartly-auto-correct-commands-in-git.png
categories: [Git]
---

How many times did it happen to you that you mistyped a Git command and curse yourself every time you do it? I did. Many times. It's annoying!

But we can change this behavior by setting a Git global config that can smartly *"auto-correct"* your mistyped commands! Sounds interesting? Read on.

## The `help.autocorrect` global config

There is this global [Git configuration](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) called `help.autocorrect` which is when configured, Git will *automagically* run the nearest Git command in case you make a typo while running the command.

First, here's how you can set this global config.

```bash
$ git config --global help.autocorrect 10
```

Here, the `10` is a [decisecond](https://en.wiktionary.org/wiki/decisecond) (one tenth of a second) which signifies 1 second. So, when setting it to `10` means Git will give you 1 second to change your mind before executing the autocorrected command.

Now, for instance, if you mistype the command `git bramch`, Git will auto-correct the command and run it like so.

```bash
$ git bramch
WARNING: You called a Git command named 'bramch', which does not exist.
Continuing in 1.0 seconds, assuming that you meant 'branch'.
  alternate
  dark-mode-patch
* master
```

Watch this in action below.

![](/images/git-autocorrect.gif)

## Revert the configuration

If in case, if you don't want to use this configuration, you can revert it by using the `--unset` option like so.

```bash
$ git config --global --unset help.autocorrect
```

If you're a visual learner, I have also got a YouTube for you.

<iframe width="560" height="315" src="https://www.youtube.com/embed/a4BQDzZOKYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

