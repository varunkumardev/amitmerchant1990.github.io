---
layout: post
title: This blog is my playground
image: /cdn/this-blog-is-my-playground.png
categories: [Miscellaneous]
---

I started this website to establish my web presence on the holy internet. I wanted to keep a portfolio of my projects and to blog about random stuff(very rarely). Back then, I was only used to post articles whenever I feel like. But then, something's changed.

To begin with, I've set up this blog using this [Jekyll](https://jekyllrb.com/) theme called [Jekyll Now](https://www.jekyllnow.com/). I chose it mainly because...

- It's a very minimal looking blog theme just how I like.
- Easy to setup.
- It's really easy to host it on [GitHub Pages](https://pages.github.com/) as I didn't want to spend money on hosting my blog (at least in the intial days of the blog).

Back then, the blog used to [look like this](http://web.archive.org/web/20161010120522/http://www.amitmerchant.com/).

{% include image.html file="initial-days.png" description="This is how it looked like in 2016" %}

Nothing fancy there, no? Just a photo of me(posing as an Iron Man) as a logo, a few pages including About and Projects pages and a couple of blog posts and that's about it! In other words, "Pretty bland".

But then from late 2018, I've started improving the overall experience of the whole blog and started blogging more often at the same time. Of course, all these happened incrementally.

### Designed a logo

I've, first of all, designed [this logo](/images/logo.png) which I think helped establish this blog kind of like a brand. The logo that you currently seeing is the one I've designed 2 years ago. I've designed it using an app called Inkdrop. I'm no graphic designer. But trust me, if you really want to do something, you'll find the way. I looked up to a couple of YouTube tutorials about designing a logo using Inkdrop. I followed those and I ended up with this beautiful logo which I'm using ever since.

### Made design-related decisions

Then I began with overhauling the design of the blog. I wanted to give a unique accent to it so I've experimented with different color schemes to make the design more vibrant and playful. I ended up with the purple-pink color combination which matched with the logo's colors.

The theme I was using was pretty simple. Not that this is a bad thing, but I wanted more. For instance, the theme lacked pagination. So, I looked for the solution. Turned out, there was already a Jekyll plugin called [jekyll-paginate](https://github.com/jekyll/jekyll-paginate) for GitHub Pages that I needed to add in the `_config.yml` of the theme. I added it and there I have a nice pagination system setup for my blog.

There were many such features in Jekyll that got enabled just by adding plugins likewise. That was, however, not enough. 

### Learned CSS grids

I read a lot of great blogs around the web and I draw a lot of design inspiration from the great blogs such as [CSS-Tricks](http://css-tricks.com), [Alligator.io](https://alligator.io), [Smashing Magazine](https://www.smashingmagazine.com) and so forth. I try to emulate some of the nice design elements from these sites. For instance, there's this nice grid of "Top Posts" on the homepage of Alligator.io. Because...

> "Imitation is about copying. Emulation is when imitation goes one step further, breaking through into your own thing." - [Steal Like an Artist](https://en.wikipedia.org/wiki/Steal_Like_an_Artist)

I wanted to implement a similar kind of grid on my blog. So, I got to learn about CSS grids in the process and implemented the following grid on the [homepage](/).

{% include image.html file="article-grid.png" description="Featured Articles using CSS grid" %}

Also, I liked the floating "Next" and "Previous" navigation links on the [Swift by Sundell](https://www.swiftbysundell.com/) blog, where the links appear on each blog post can be used to go to previous or next blog posts adjacent to the current post. I liked these links mainly because it's non-intrusive yet functional at the same time. So, I tried implementing the same on my blog with a pinch of design changes from my end. It turned out great and after implementing it, I feel the [bounce rate](https://en.wikipedia.org/wiki/Bounce_rate) on my blog has been reduced significantly.

### Implemented search functionality

The one prominent feature that was missing on this blog was a proper search because "Jekyll Now" doesn't comes with one. So, I decided to implement one myself. And after some brainstorming, I've finally able to implement the [search](/search/). Upon searching the search would try to find the matching title, URL and category and would give the results accordingly.

I've also implemented [OpenSearch](https://developer.mozilla.org/en-US/docs/Web/OpenSearch) along the way because that would make my blog kind of a search engine itself. 

{:.you-may-like}
> Fun fact: I extracted parts of the aforementioned features as a separate theme. The theme is called [Reverie](https://github.com/amitmerchant1990/reverie) which is an extension to [jekyll-now](https://github.com/barryclark/jekyll-now).

## In closing

The entire point of this article is I've learned many new things while maintaining and growing this particular blog and I'm still learning. I'm improving my blog every day by incorporating new things into it as and when I come across one. The blog is now reaching a wider audience, so I try to keep it on standards on par with the great ones in the same territory. I'm happy with the current state of the blog but I won't miss the opportunity to improve it further if there's a scope. Let me know if you've any suggestions. 

Until next time!