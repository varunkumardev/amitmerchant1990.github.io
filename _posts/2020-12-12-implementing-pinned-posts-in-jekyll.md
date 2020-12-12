---
layout: post
title: Implementing pinned posts in Jekyll
image: /cdn/implementing-pinned-posts-in-jekyll.png
categories: [Jekyll]
---

Since my blog is built on to of [Jekyll](https://jekyllrb.com/), many a times, I have been in a situation where I would try to [implement](/showing-related-posts-based-on-the-current-post-category-in-jekyll/) [certain features](/how-to-categorize-your-posts-in-jekyll/) according to my needs.

For instance, recently, I was looking for a way to pin certain posts. What this feature should do is keep the pinned posts on the top of the list on the homepage no matter what. Currently, all posts are being listed in chronological order but pinned posts should be an exception to remain on top. 

This feature is inspired by Twitter's [pinned tweets](https://help.twitter.com/en/managing-your-account/how-to-customize-your-profile).

I was looking for a Jekyll plugin or something like that but I didn't find any. So, I decided to implement it myself. Here's how I did it.

* TOC
{:toc}

## Mark the post as "pinned"

The first step is to mark the posts as pinned. Since I was already using `categories` to categorize posts, I used the `tags` variable in the [front matter](https://jekyllrb.com/docs/front-matter/) to mark the post as ***"pinned"*** like so.

```yml
layout: post
title: Exciting new features and improvements in PHP8
image: /cdn/new-features-and-improvements-in-php8.png
categories: [PHP]
tags: pinned
```

This will essentially mark the post as "pinned" and now we can use this flag to list pinned posts on top of all the other posts.

## List pinned posts

Since we now have posts tagged as "pinned", we can list them at top of the rest of the articles using the following code like so.

```html
{% raw %}{% if page.url == "/" %}
    {% for post in site.tags.pinned %}
          <article class="post">
            <p class="pinned-article"><b>📌 Pinned Article</b></p>

            <h1>
                <a href="{{ site.baseurl }}{{ post.url }}">
                    {{ post.title }}
                </a>
            </h1>

            <div class="entry">
                <p>
                    {{ post.excerpt }}
                </p>
            </div>

            <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">
                Read More ⟶
            </a>
          </article>
    {% endfor %}
{% endif %}{% endraw %}
```

As you can tell, you can loop over `site.tags.pinned` which will hold all the `pinned` posts. You should put this code just before the main loop starts.

Notice also that, I have added an additional check `if page.url == "/"` to only render pinned posts on the homepage.

The end result would look like below.

![pinned post jekyll](/images/pinned-post-jekyll.png)

## Exclude pinned posts from the main list

The last thing I did was to exclude pinned posts from the main list of posts because that is redundant and repetitive.

To do so, I added a check to only render the posts which are not marked as pinned in the main loop which renders all of the posts like so.

```html
{% raw %}{% for post in site.tags.pinned %}
     <!-- Renders all the pinned posts -->
{% endfor %}

{% for post in paginator.posts %}
    {% unless post.tags contains 'pinned' %}
        <!-- Renders all the posts except pinned -->
    {% endunless %}
{% endfor %}{% endraw %}
```

## In closing

With this approach, you can practically pin multiple posts but ideally, you only mark a post as "pinned" at a time just like how it works for Twitter's pinned tweets.