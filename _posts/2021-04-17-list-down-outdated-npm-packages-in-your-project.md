---
layout: post
title: List down outdated npm packages in your project
image: /cdn/list-down-outdated-npm-packages-in-your-project.png
categories: [Node.js]
fluidbox: true
---

It's always a good idea to keep a check on the npm packages you have installed in your project/product. Because these packages are ever updating and try to solve the vulnerabilities they have got in them.

So, it's a no-brainer that you should upgrade them regularly. The one way to approach this is to check which packages have gone outdated since the version you have installed.

npm has got this nifty little command called `npm outdated` that can list down all the outdated npm dependencies in your project.

Here's how it looks like when I ran it on one of my projects.

[![](/images/npm-outdated.png)](/images/npm-outdated.png)

As you can tell, the command lists down all the direct dependencies which are gone outdated. You can imagine how much they are outdated based on the three columns: `Current`, `Wanted`, and `Latest`.

- `wanted` is the maximum version of the package that satisfies the semver range specified in `package.json`. If there's no available semver range (i.e. you're running `npm outdated --global`, or the package isn't included in `package.json`), then wanted shows the currently-installed version.

- `latest` is the version of the package tagged as latest in the registry. Running `npm publish` with no special configuration will publish the package with a dist-tag of `latest`. This may or may not be the maximum version of the package, or the most recently published version of the package, depending on how the package's developer manages the latest [dist-tag](https://docs.npmjs.com/cli/v7/commands/npm-dist-tag).

You can then decide which packages you should update based on these columns but it's safe to say that the packages are shown in `red fonts` should be updated as soon as possible!