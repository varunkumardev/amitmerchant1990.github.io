---
layout: post
title: Quickly search keywords in your projects using Git Grep
image: /cdn/quickly-search-keywords-in-your-projects-using-git-grep.png
categories: [Git]
fluidbox: true
---

More often than not you'll find yourself in situations where you would need to search keywords or phrases across your project. 

Doing this is easy when you're using a visual editor or IDE with you. But sometimes, you want to search through your project directory on your server through the terminal. How would you do that?

* TOC*
{:toc}

## The `git grep` command

Well, it turns out, it's pretty easy if you've set up Git for your project. In this case, you can use a Git command called `git grep` to accomplish this. The command will list all the occurrences of the keyword inside the project directory along with the file paths.

For instance, let's say, if I want to search the string *"human-readable"* into my project, I can do it using the `git grep` command like so.

```bash
$ git grep -n "human-readable"
```

Here specifying the `-n` option will prefix the line numbers to matching lines.

This is how the output would look like.

[![git grep -n](/images/git-grep-simple.png)](/images/git-grep-simple.png)

As you can tell, the command has listed all the occurrences of the keyword (highlighted in red color) along with the line number where it occurred.

## Improving it further

Now, this is fine but you can improve the output further by using few more options like `--heading` and `--break` like so.

```bash
$ git grep -n --heading --break "human-readable"
```

The output for this command would look like the following.

[![git grep advanced](/images/git-grep-advanced.png)](/images/git-grep-advanced.png)

As you can tell, the output is now more refined where the `--heading` options will show the filename above the matches in that file instead of at the start of each shown line, and the `--break` option will print an empty line between matches from different files.
