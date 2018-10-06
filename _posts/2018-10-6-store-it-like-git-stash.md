---
layout: post
title: Store it like git stash
image: /images/git-stash.jpg
---

If you have ever worked with [Git](https://git-scm.com/), you probably have encountered the following situation. i.e. You've two branches, let's say `feature-1` and `feature-2`, for two different features respectively. You have worked on the the first branch `feature-1`, completed all the related tasks and committed and pushed all the outstanding changes on that branch. So, the `feature-1` branch is now clean.

Now, you checkout to the other branch `feature-2` and started working upon it. While, working on this particular branch you got a task related to `feature-1`. So now, you need to switch to the `feature-1` branch but you can't. Why? Cause you have changed/added many files in the current branch which needs to be committed in order to switch to the other branch. But you just can't commit all the files before testing the feature throughly. What would you do in this case?

Git have a very handy feature to tackle this problem.

## git stash

From the official Git documentation, 

> [git-stash](https://git-scm.com/docs/git-stash) - Stash the changes in a dirty working directory away

In pure English "Stashing" means __*To store (something) safely in a hidden or secret place*__. What this command basically do is it takes the dirty state of your working directory — that is, your modified tracked files and staged changes — and saves it on a stack of unfinished changes that you can reapply at any time.

Let's see how we can apply this command to our example. So, as we discussed we want to switch to the `feature-1` branch without committing the existing files. We'll first do `git status` in order to check the current status of the branch.

```bash
$ git status
On branch feature-2
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   bootstrap.php
	modified:   index.php

no changes added to commit (use "git add" and/or "git commit -a")
```

As you can see, we have two modified files. So now, in order to switch to the other branch we'll stash this files by running `git stash`.

```bash
$ git stash
Saved working directory and index state WIP on feature-2: 6ae8626 test
```

Git has stashed all the modified files of `feature-2` branch and stored it on the stack which can used later. Our `feature-2` branch is now clean and we can confirm this by running `git status`.

```bash
$ git status
On branch feature-2
nothing to commit, working tree clean
```

Now, we can easily switch to the `feature-1` branch and carry on working on it.

## Restoring the stashed changes back

We've been done with the `feature-1` related tasks, pushed all changes on the branch and now we again want to continue working on the `feature-2` branch where we've left it. For this purpose, we'll first see the current status of our stack on which our changes are stashed. We'll use `git stash list` to do this.


```bash
$ git stash list
stash@{0}: WIP on feature-2: 6ae8626 test
```

As you can see above, we have one stashed change stored on the stack with id `stash@{0}`. We can restore this change by running `git stash pop`. It'll apply the stash and then immediately drop it from your stack. Running `git status` you'll see that all the changes we stashed previously has been safely restored back


```bash
$ git status
On branch feature-2
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   bootstrap.php
	modified:   index.php

no changes added to commit (use "git add" and/or "git commit -a")
```

We can now continue working on this files from now on. Alternatively, we have a `git stash apply` command using which we can apply specific stash from the stack based on its `id`. For instance, let's run `git stash list` command.

```bash
$ git stash list
stash@{0}: WIP on master: b304ba2 Update bootstrap.php
stash@{1}: WIP on master: 74cf476 test commit
```

As you can see, we have two stashed with id `stash@{0}` and `stash@{1}`. Now, if we want to apply a specific stash we can do it by running command `git stash apply stash@{1}` which will restore the changes stored in `stash@{1}` onto the branch.

One important advantage of using `git stash` is, we can keep our commit history clean by avoiding unnecessary commits just for the sake of switching branches.

Also, one more thing to note here is, the stashing applies branch-wide meaning all the branches of the project have a common stash stack. So, you need to be very careful when applying the stash onto the branches.