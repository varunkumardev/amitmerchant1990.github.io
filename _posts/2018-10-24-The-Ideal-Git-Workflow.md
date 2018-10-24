---
layout: post
title: The ideal Git workflow
---

Today, I'm going to discuss about Git workflow that we're using at our projects which involves a team of several developers. [Git](https://git-scm.com/) is no doubt a great version control system but if you don't use it efficiently, things can get messy easily. For instance, if there are 10 people working on the same codebase and each of them work on the same branch, it would be really difficult to keep the branch's state clean. So, here's a workflow which we follow in all our projects. The workflow is could work great for big teams but small teams can also get benefited from it equally.

## The team

Let's say there's a team of 5 developers working on a project. Among them is a project manager whose job is to  basically review and approve the code other developers do. Our example will follow this team and how they deal with day-to-day tasks.

## The workflow

In Git, there will be a `master` branch for each project which acts as a main branch from which different branch can be created. Also, it will always have the bug-free and production ready code.

Now, developer-1 have been assigned with `task-1`. So, he will create a branch called `feature-1` from `master` branch for this particular branch and starts working upon it. Similarly, developer-2 got another task `task-2`. He will create a branch called `feature-2` and will work on that branch. And rest of the team follow this approach for their respected tasks.

Among them, developer-3 have completed his task. So, he will now push the code his feature branch and create a pull request for the same. The project manager will review the PR and if he find it valid it, he will merge that branch into `master`. So, the `master` contain all the changes which `feature-3` branch had.

As `master` branch is now updated with the recent changes of `feature-3` branch, it's a good time rest of the developer get sync with the `master` branch's up-to-date code. For this, they can follow this routine.

First of all, they will have to commit all the necessary changes to their respected branch and then apply following commands which will basically merge master branch into feature branch.

```bash
$ git checkout master
$ git pull
$ git checkout feature-branch
$ git merge master
$ git push
```
Developers can get conflicts while merging the `master` branch during above process but resolving them would be quite a simple process. So now, the `feature` branch is up-to-date with the `master` branch and the developer can continue working on his branch. The benefit of this approach is that, there will be very less chance of getting conflicts when the `feture` branch gets merged into `master` as all those conflicts gets resolved while syncing the branch with `master`. Developers should follow this process frequently during the development of the feature in order to reduce the chance of getting conflicts when the project manager merges the pull requests.

## Conclusion

This is process through which we keep out development workflow stress-free while keeping everything in harmony. For us, this has turned out to an ideal workflow and have been stick to it for long time now and encourage every other team to follow the same for the betterment of their project.