---
layout: post
title: Why to choose Jekyll for blogging over other platforms 
image: /cdn/choose-jekyll-blogging.png
categories: [Miscellaneous]
---

It's hard to choose a platform for blogging in 2019. Why? Because there are so many to choose from. [Wordpress](https://wordpress.com/), [Ghost](https://gohugo.io/), [Hugo](https://gohugo.io/), [Gatsby](https://www.gatsbyjs.org/), [eleventy](https://www.11ty.dev/) and what not! The choice is endless. It will ultimately comes down to the fact that which platform you're more comfortable with. Be its setup, maintenance to the community support and extensibility.

In this article, I'll talk specifically about [Jekyll](https://jekyllrb.com/) upon which this blog has been built and why I've never looked back since then. I'll talk about certain aspects of Jekyll which makes it a de-facto choice for developers who wants to get started with blogging. Let's discuss them one at a time.

* TOC*
{:toc}

## Simplicity

The first and foremost thing that hooks me to Jekyll is it's simplicity. As it's a [static site generator](https://davidwalsh.name/introduction-static-site-generators), it's just a matter of few clicks if you want to get your blog up and running on the internet.

You just need to grab [one of these themes](https://github.com/topics/jekyll-theme) from many, make a GitHub repository out of it, set up [GitHub pages](https://pages.github.com/) for the same and boom! you've got yourself a blog up and running in minutes. And all these without spending a single penny as GitHub Pages are free for hosting static sites. Sweet, isn't it?

Sure, if you want to setup your blog on a local environment, it's a [little work](https://jekyllrb.com/docs/) upfront. But after that, it's a smooth sailing.

> For starters, you can get started with [Reverie](https://github.com/amitmerchant1990/reverie) which is extracted from the good parts of this blog.

## Lightweight

It's lightweight in a sense it doesn't have tonnes of files to look at contrary to WordPress. You'll primarily work with [markdown](https://daringfireball.net/projects/markdown/) files to write your posts which resides in a folder called `_posts`. And if you want to customize the theme further then also you're in luck. You'll just need to dabble around in the folders named `_inclues` which consists of html files that you wish to reuse across your blog. A `_layout` folder which consists of all the possible layout you've configured. And bunch CSS and JavaScript files. And that's it!

During the lifetime of your blog, you'll have to hardly look beyond these files and folders as that's all what your blog is consists of.

## You get total control of everything

The fact that Jekyll is a static site generator(SSG), meaning it's just a matter of few html's, css and yaml's, gives you an infinite amount of control on customizing things.

You're in a total control of each and every area of the blog and it's rather relatively easy to modify things when you compare it with a CMS like WordPress. You don't have to worry about the backend as it's a SSG. 

## It's fast

Because of the fact that Jekyll doesn't use databases as all the posts that you write in Jekyll are plain markdown files, makes it blazing fast. 

Apart from this, it has an edge over platforms like WordPress as it doesn't have a backend. Additionlly, in case of WordPress, On every request, it needs to build the whole page from scratch. This involves putting together all the template files and getting any content or other data from the database. This makes the entire experience slow when we compare it to a SSG like Jekyll.

## Security

Similarly, as it doesn't uses databases, and as the name suggests it's a "static" site generator, there won't be anything dynamic that can be compromised. As a result, there won't be a threat of SQL injection or Session Hijacking or any vulnerability related to servers and databases as such.

## In closing

These were the key point that had me going with Jekyll since last three years and I don't see any reason to move it to another platform anytime soon. Until next time!
