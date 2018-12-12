---
layout: post
title: 5 must have things for your Jekyll powered blog
---

Let's talk about Jekyll today. [Jekyll](https://jekyllrb.com/) is a blog aware, static website generator which is perfect for personal, project and organization sites. I've been using Jekyll for this blog for quite sometime now. Three years to be exact. And the best thing about Jekyll is that you can host it on [GitHub Pages](https://pages.github.com/) for free without compromising the speed or any other factors likewise.

Today, I'm going to list 5 things that I'm using on this blog which are helpful if you want to be pro in blogging using Jekyll or you're just starting with it.

## [Jekyll Now](https://github.com/barryclark/jekyll-now)

> [Jekyll Now](https://github.com/barryclark/jekyll-now) makes it easier to create your Jekyll blog, by eliminating a lot of the up front setup.

The usual process to setup a blog using Jekyll is quite cumbersome. By usual proceess, I meant the setup of the Jekyll in local can take up your time initially. Because it's ruby based. So, you have to first install Ruby, rvm/rbenv, ruby gems in your machine and then you can proceed with the actual installation of Jekyll. But `jekyll-now` eliminates this hassle of setting up the things. You just need to fork this repository and host it on the GitHub Pages. Yes, it's that simple! In a few minutes you'll be set up with a minimal, responsive blog like the one below giving you more time to spend on writing epic blog posts!

![](/images/jekyll-now-theme-screenshot.jpg)

I'm using `jekyll-now` on [this blog](https://github.com/amitmerchant1990/amitmerchant1990.github.io) and have customized it to my liking. I'm pretty much happy with it so far.

## [An RSS Feed](https://github.com/jekyll/jekyll-feed)

An [RSS feed](https://en.wikipedia.org/wiki/RSS) is important for your blog if you want your audience to visit your blog again.  RSS allows the content and new updates to come to the reader. Generally, you use RSS to syndicate or subscribe to the feed of a website, blog or almost any media content that is updated online. 

[jekyll-feed](https://github.com/jekyll/jekyll-feed) is a plugin to generate an Atom (RSS-like) feed of your Jekyll posts. 

If you've hosted your blog on GitHub Page, you just need to add this line to your site's `_config.yml`:

```yml
plugins:
  - jekyll-feed
```

The plugin will automatically generate an Atom feed at `/feed.xml`.

## [An SEO Plugin](https://github.com/jekyll/jekyll-seo-tag)

Similarly, if you want your blog to get ranked on the search engines, it's really important to have all the meta tags for your posts. Jekyll don't have in-built mechanism which can generate relevant meta tags based on your posts title or keyword and I'm sure you wouldn't want to do it manually either. So, here we have a plugin called [jekyll-seo-tag](https://github.com/jekyll/jekyll-seo-tag) to our recue. This plugin add metadata tags for search engines and social networks to better index and display your site's content. It will add following meta tags to your site:

* Page title, with site title or description appended
* Page description
* Canonical URL
* Next and previous URLs on paginated pages
* [JSON-LD Site and post metadata](https://developers.google.com/structured-data/) for richer indexing
* [Open Graph](http://ogp.me/) title, description, site title, and URL (for Facebook, LinkedIn, etc.)
* [Twitter Summary Card](https://dev.twitter.com/cards/overview) metadata

To add it into your blog you just need to add this line to your site's `_config.yml`:

```yml
plugins:
  - jekyll-seo-tag
```

## [A Sitemap](https://github.com/jekyll/jekyll-sitemap)

[XML Sitemaps](https://en.wikipedia.org/wiki/Sitemaps) are important for SEO because they make it easier for Google to find your site's pages—this is important because Google ranks web PAGES not just websites. There is no downside of having an XML Sitemap and having one can improve your SEO, so it's highly recommended to add one.

You can achieve this by adding a plugin called [jekyll-sitemap](https://github.com/jekyll/jekyll-sitemap) to your blog. It's an official plugin provided by Jekyll. It will silently generate a sitemaps.org compliant sitemap for your Jekyll site.

To add it into your blog you just need to add this line to your site's `_config.yml`:

```yml
plugins:
  - jekyll-sitemap
```

## A comment management service

Jekyll doesn't provide support to have comments on posts natively. You need to use external service to integrate to your blog. In my case, I'm using [Disqus](https://disqus.com/) on my blog. It has been really great so far for me and it has blended with my design of the blog. So, you'll never feel that you're using some third party service. 

Moreover, they recently introduced [Reactions](https://blog.disqus.com/reactions-a-new-way-for-readers-to-engage) which adds Raction emojis(similar to that of Facebook) to your posts which can be really engaging to the readers of your blog. You can find the example of it on this post only! Just scroll down to the end and take a look. I think it's amazing way to get to know how your audience feels about your content.

## Conclusion

These were some of the things which I think are _must-have_ for any newbie blogger who have just started blogging with Jekyll. These have benefitted me greatly and I hope it will help others as well. And with that said, this post comes to an end. Until next time, stay tuned!
