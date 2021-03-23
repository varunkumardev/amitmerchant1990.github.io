---
layout: post
title: Moving to a privacy-focused and open-source comment system on my blog
image: /cdn/moving-to-a-privacy-focused-comment-system-on-my-blog.png
categories: [Miscellaneous]
---

If you're running any sort of blog, it would be really important to interact with your audience. One way to doing this by having a comment system that can enable a visitor on your blog to drop their view and opinions.

My blog is built on top of [Jekyll](https://jekyllrb.com/) meaning it's a statically generated website and so it can't have its own comment system because it doesn't have any database.

* TOC
{:toc}

## The Disqus dilemma

One way to tackle this is to use ready-made drop-in services which you can start by embedding a little piece of code that magically enables your static site to have comments from the visitor. Up until this day, my blog was using this service called [Disqus](https://disqus.com/) which allowed me to embed comment threads within my blog posts and pages, including additional functionality like upvoting and adding Emoji reactions.

I have been using this service for about 3 years now and trust me I was very happy with it up until today when they started putting **sponsored ads forcefully** above and below the comments. These ads were taking full four rows on the screen and are really intrusive, irrelevant, and don't blend in with my blog at all. That was one of the red flags for me.

On top of this, Disqus commenting isn't privacy-friendly. Meaning, you pay mainly with your and your users' data when using this service. So, that's a downside.

And so, the alarm rang finally and I decided to move from Disqus to something more privacy-focused and non-obtrusive (and lightweight). And in my search of this ideal-looking commenting system, I stumbled upon [utterances](https://utteranc.es/).

## The utterances comment widget

In a nutshell, [utterances](https://utteranc.es/) is a lightweight comment widget that uses GitHub issues of any of your public repositories under-the-hood.

It maps the post on your blog with an issue on the repository. So, when someone comments on your post for the first time, it will create an issue, associate the blog post with this issue, and save the reply on it as a comment. It's as simple as it gets!

To add utterances to your blog posts, all you need to do is add the following piece of code under each of your posts like so.

```js
<script src="https://utteranc.es/client.js"
        repo="githubusername/utterances-comments"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
</script>
```

This is the default configuration. The only thing you would need to make it work is to change the `repo` attribute with your own public GitHub repository. 

The only other thing you need to do is to install [utterances app](https://github.com/apps/utterances) on this repository.

With this in place, you're practically done. 

People now can drop comments on your posts using their GitHub accounts in no time and trust it feels light and uncluttered.

## Benefits

As I mentioned earlier, I wanted a comment system that is more privacy-focused and less intrusive. 

utterances is a match made in heaven for me. Here are all the benefits it serves.

- [Open source](https://github.com/utterance). 
- No tracking, no ads, always free. 
- No lock-in. All data stored in GitHub issues. 
- Styled with [Primer](http://primer.style/), the CSS toolkit that powers GitHub. 
- Dark theme. 
- Lightweight. Vanilla TypeScript. No font downloads, JavaScript frameworks, or polyfills for evergreen browsers.

## In closing

It was a hard decision to stop using Disqus after using all these years as many blog posts had lots of invaluable comments and opinions from my readers. It was difficult to let go of all of these.

But since things started getting murkier, it's safe to say that I have left it for the good and it's a trade-off I can certainly live with from here onwards!
