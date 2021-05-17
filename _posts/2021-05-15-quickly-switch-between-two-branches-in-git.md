---
layout: post
title: Quickly switch between recent branches in Git
image: /cdn/quickly-switch-between-two-branches-in-git.png
categories: [Git]
fluidbox: true
---

When working on projects, it's often a case when you would find yourself dabbling between different branches. Maybe you're working on different features simultaneously or you're keeping your feature branch up-to-date with your master/main branch. You would need to switch between branches in any of the cases.

For instance, let's say I'm currently on the `master` branch and I have a feature branch called `ui-improvements` that I want to work on.

To switch to this branch, I would use `git checkout` like so.

```bash
$ git checkout ui-improvements
```

Now, I'm done with the feature and now I want to switch back to master again. How would you do that? 

## The quicker way

You might use the `git checkout master` command normally. But *there's a quicker way to do so*. Check this out!

```bash
$ git checkout -
Switched to branch 'master'
```

As you can tell, using `-` with `git checkout` will switch back to the most recent branch which in our case is `master`. And that's it! You don't need to specify the name of the previous branch.

Now if you want to switch back to `ui-improvements` once again, you can use `git checkout -` to do so.

This is how the switching between branches looks like when using this command.

[![](/images/quick-switch-branch-git.png)](/images/quick-switch-branch-git.png)