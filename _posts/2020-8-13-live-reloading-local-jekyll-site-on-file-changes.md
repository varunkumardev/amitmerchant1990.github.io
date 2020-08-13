---
layout: post
title: Live reload local Jekyll site in browser on file changes
image: /cdn/live-reloading-local-jekyll-site-on-file-changes.png
categories: [Jekyll]
---

The other day, I was looking for a way using which I can reload my local [Jekyll](https://jekyllrb.com/) instance every time I make some changes into the files.

So, I dig through the following `--help` command hoping to find if something in-built is there or not,

```bash
$ jekyll serve --help
```

And fortunately, there was an option called `-l` (or `--livereload`) which can do exactly the same as I wanted which is to detect file changes and live reloading the browser instance.

![](/images/jekyll-live-reload.png)

As you may guess, all we need to do is append the `-l` option to `jekyll serve` command like so.

```bash
$ jekyll serve -l
```

And it will automatically reload your local Jekyll site in the browser every time you make changes in files.

You can further couple the `-o` (or `--open-url`) option which will launch your site in your browser automatically.

```bash
$ jekyll serve -l -o
```
