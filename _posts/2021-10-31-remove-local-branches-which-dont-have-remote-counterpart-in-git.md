---
layout: post
title: Remove local branches which don't have remote counterparts in Git
image: /cdn/remove-local-branches-which-dont-have-remote-counterpart-in-git.png
categories: [Git]
---

Working with [Git](https://git-scm.com/), it might be the case when you're working on your feature branch, you worked on it and then pushed it onto the remote.

Now, once it is pushed, you may delete that feature branch from your remote because it's needed anymore. Over time, this leads to zombie branches scattered around in your local which don't have any remote-tracking references to them anymore. 

So, you might want to delete these branches as well.

Luckily, there is a simple Git command to do this.

```bash
$ git fetch origin --prune
```

Or

```bash
$ git fetch origin -p
```

And that's it! Running this will remove all the zombie branches from your local.