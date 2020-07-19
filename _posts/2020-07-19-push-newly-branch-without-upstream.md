---
layout: post
title: Push to newly created branch without creating an upstream branch in Git
image: /cdn/push-newly-branch-without-upstream.png
categories: [Git]
fluidbox: true
---

Git is a lot easier when you make the best out of it. For instance, setting a simple [Git config](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) can make your life a lot simpler and smoother.

So, for instance, I'm working on a project's `master` branch. I do changes and push the changes to the branch using simple ***"git push"***. This is easily done as there's already an upstream branch called **"master"** but things get tricky when you create a new branch from the existing branch. 

## The problem

So, for instance, I created a new branch called `featureA` from the `master` branch like so.

```bash
$ git checkout -b featureA
```

Note that the `featureA` is still a local branch. I made changes into files and tried to push using `git push`. But as you might expect, I was greeted with the following error which says ***"fatal: The current branch featureA has no upstream branch."*** as `featureA` doesn't have an [upstream branch](https://git-scm.com/book/en/v2/Git-Branching-Remote-Branches).

[![](/images/git-push-error.png)](/images/git-push-error.png)

Now, the one solution here is to use the following command suggested in the error itself. 

```bash
$ git push --set-upstream origin featureA
```

## The solution

The previous solution is alright! But there's a simpler and more effective solution than this in which you just need to set a git config using a command like so. And that magic command is...

```bash
$ git config --global push.default current
```

What this command will do is, it will set a global configuration that instructs git to push to the current branch and if there's no upstream branch for the same, it will create one automatically and push henceforth.

So, now you'll be able to push by just using ***"git push"***. No need to mention the branch name explicitly.

[![](/images/git-push-success.png)](/images/git-push-success.png)

And the good thing about this, as this is a global config, it will work across all your projects seamlessly!

I learned about this via [this tweet](https://twitter.com/timacdonald87/status/1283579462001426437?s=20) from [Tim MacDonald](https://twitter.com/timacdonald87). Thanks, Tim for this valuable tip!
