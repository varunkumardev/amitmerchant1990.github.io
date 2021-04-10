---
layout: post
title: Add auto-completion in Bash terminal using Fish shell
image: /cdn/add-auto-completion-in-bash-terminal-using-fish-shell.png
categories: [Bash]
fluidbox: true
---

The default terminal shell you get in Linux systems is pretty basic and bare-bones. For instance, in Ubuntu, the default shell is GNU Bash and while it can get your job done, it lacks some of the power user features. 

One of the features that I was really missing is auto-completion of commands. It's not there in the default Bash shell.

How would you get that in your terminal? Well, it turns out you can use third-party shells. Many let you add this capability but the one I'm going to talk about is called [Fish shell](https://fishshell.com/).

* TOC
{:toc}

## What is Fish shell?

[Fish](https://fishshell.com/) is a smart and user-friendly command-line shell for Linux, macOS, and the rest of the family. Among many incredible features, fish suggests commands as you type based on history and completions, just like a web browser.

Apart from this, fish supports 24 bit true color which is incredible. Okay, enough talk. Let's see how you can install Fish and get up and running with it.

## Installing Fish

You can install fish on your operating system by referring to its homepage.

In my case, I'm using [Ubuntu](https://ubuntu.com/), so all I need to run is the following command to install Fish.

```bash
$ sudo apt-get install fish
```

And that is it! Fish is now installed on my system. I confirmed it by running the following command in my terminal.

```bash
$ fish -v
```

This will essentially show you which version of Fish has been installed on your system. And now you're pretty much ready to use it.

## Using Fish for autocompletion

Once installed, you can enter into the Fish shell by running the following command.

```bash
$ fish
```

Here's how the terminal looks like when running this command.

[![](/images/enter-fish-shell.png)](/images/enter-fish-shell.png)

On a first impression, the shell just looks like your regular shell but under the hood, it encompasses a [lot of superpowers](https://fishshell.com/docs/current/index.html) that you can take advantage of.

The autosuggestions or tab completion works out-of-the-box in Fish without having you add/update any configs.

Here's how the **directory autocompletion** looks like in Fish.

[![](/images/fish-autocompletion-1.png)](/images/fish-autocompletion-1.png)

Here's how **command autocompletion** looks like...

[![](/images/fish-autocompletion-2.png)](/images/fish-autocompletion-2.png)

Here's one more...

[![](/images/fish-autocompletion-3.png)](/images/fish-autocompletion-3.png)

## Make Fish your default shell

You can avoid entering the Fish shell manually using the `fish` command by adding the command right into your terminal's config file.

In my case, I added `fish` at the end of the `~/.bashrc` file and now when I open the bash terminal, Fish is the default shell that gets opened with it.