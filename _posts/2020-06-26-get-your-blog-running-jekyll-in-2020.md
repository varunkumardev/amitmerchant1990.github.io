---
layout: post
title: Get your blog running in seconds with Jekyll in 2020
image: /cdn/get-your-blog-running-jekyll-in-2020.png
categories: [Jekyll]
---

It's never been easier to get started with a blog in 2020 as there are many options for you to choose from. For instance, [Jekyll](https://jekyllrb.com/), [Gatsby](https://www.gatsbyjs.org/), [Hugo](https://gohugo.io/), [eleventy](https://www.11ty.dev/) and many others. These are all static site generators. Meaning, there's no backend. So, you don't need to create or manage your own backend server. And because, there's no backend, there's no database as well. 

I'm going to talk about [Jekyll](https://jekyllrb.com/) in this article because the blog you're currently on is built with Jekyll and it's the one I'm most familiar with right now.

So, what is Jekyll?

> Jekyll is a blog-aware static site generator which is written in Ruby. It's perfect for personal, project, or organization sites. 

What's compelling about Jekyll is it’s [simplicity, lightweightness and speed](/why-choose-jekyll-blogging-over-other-platforms/). As it’s a static site generator, it’s just a matter of few clicks if you want to get your blog up and running on the internet.

In this article, I'm going to explain the simplest way using which you can setup your Jekyll-powered blog in seconds.

So, first off, You will need to grab one of [these themes](https://github.com/topics/jekyll-theme) from many. There's one theme called [Reverie](https://github.com/amitmerchant1990/reverie) which I've extracted from this blog. You can use it or one from [this](https://github.com/topics/jekyll-theme) list. For the rest of this article, I'm going to describe further keeping Reverie into mind.

Basically, Reverie is a plug-and-play Jekyll theme best suited to use on [GitHub Pages](https://pages.github.com/) without even setting up a local environment.

So, let's go.

### 1. Fork Reverie to your User Repository

Fork [Reverie](https://github.com/amitmerchant1990/reverie), then rename the repository to `yourgithubusername.github.io`.

Alternatively, you can click the [`Use this template`](https://github.com/amitmerchant1990/reverie/generate) button if you want to create a repository with a clean commit history which will use Reverie as a template.

Your Jekyll blog will often be viewable immediately at <https://yourgithubusername.github.io> (if it's not, you can often force it to build by completing step 2).

### 2. Customize and view your site

Enter your site `name`, `description`, `avatar` and many other configuration by editing the `_config.yml` file. You can easily turn on Google Analytics tracking, Disqus commenting and social icons right here.

> By the way, the `_config.yml` is the [YAML](https://en.wikipedia.org/wiki/YAML) file where all your blog's configuration will be specified. Reverie has many configuration out-of-the-box which you can customise according to your liking.

Making a change to `_config.yml` (or any file in your repository) will force GitHub Pages to rebuild your site with Jekyll. Your rebuilt site will be viewable a few seconds later at <https://yourgithubusername.github.io> - if not, give it ten minutes as GitHub suggests and it'll appear soon.

### 3. Publish your first blog post

Before we proceed, you would need to remove all the existing files from `_posts` folder.

Next, to create your first post, add a file to your `_posts` directory with the following format:

```
YEAR-MONTH-DAY-title.MARKUP
```

Where `YEAR` is a four-digit number, `MONTH` and `DAY` are both two-digit numbers, and `MARKUP` is the file extension representing the format used in the file. For example, the following are examples of valid post filenames:

```
2011-12-31-new-years-eve-is-awesome.md
2012-09-12-how-to-write-a-blog.md
```

All blog post files must begin with [front matter](https://jekyllrb.com/docs/front-matter/) which is typically used to set a [layout](https://jekyllrb.com/docs/layouts/) or other meta data. For a simple example this can just be empty:

```md
---
layout: post
title:  "Welcome to Jekyll!"
---

# Welcome

**Hello world**, this is my first Jekyll blog post.

I hope you like it!
```

That's all you need to do to publish your first blog post! 

Easy, right?

This [Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) might come in handy while writing the posts.

> You can add additional posts in the browser on GitHub.com too! Just hit the <kbd>Create new file</kbd> button in `/_posts/` to create new content. Just make sure to include the [front-matter](http://jekyllrb.com/docs/frontmatter/) block at the top of each new blog post and make sure the post's filename is in this format: year-month-day-title.md

Next, there are bunch of stuff you can further do with your blog which comes in-built with Reverie.

### Use Categories in Reverie

You can categorize your content based on categories in Reverie. For this, you just need to add categories in front matter like below:

For adding single category:

```yml
categories: JavaScript
```

For adding multiple categories:

```yml
categories: [PHP, Laravel]
```

The categorized content can be shown over this URL: https://yourgithubusername.github.io/categories/

### Pagination

Pagination of posts in Reverie works out-of-the-box. You only need to specify the number of posts you want on a single page in `_config.yml` and Reverie will take care of the rest.

```yml
paginate: 6
```

### RSS

The generated [RSS feed](https://en.wikipedia.org/wiki/RSS) of your blog can be found at https://yourgithubusername.github.io/feed. You can see the example RSS feed over [here](https://reverie-jekyll.netlify.app/feed.xml).

### Sitemap

The generated sitemap of your blog can be found at https://yourgithubusername.github.io/sitemap. You can see the example sitemap feed over [here](https://reverie-jekyll.netlify.app/sitemap).

## In Closing

As you can see, it's dead simple to get up and running with your blog with Jekyll and without spending a penny. Of course, you'd need to get aquinted with couple of stuff such as [Markdown](https://daringfireball.net/projects/markdown/), [Liquid syntax](https://jekyllrb.com/docs/liquid/) and [Yaml](https://en.wikipedia.org/wiki/YAML). But fret not, the Jekyll has a big community behind it and you can have your problem solved in few Google searches.

Hope you like the article. If you noticed something wrong in here, let me know in the comments below.

Until next time!



