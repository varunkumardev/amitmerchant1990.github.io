---
layout: post
title: Showing related posts based on the category of current post in Jekyll
image: /cdn/showing-related-posts-based-on-the-current-post-category-in-jekyll.png
categories: [Jekyll]
---

Lately, I wanted to show related posts on post pages based on the category the current post lies in. So, for instance, of the post belongs to the "Jekyll" category, I would fetch the recent five posts published under this category and show those on the post. In my case, as you can tell, I've shown it in the right sidebar under `More in "Jekyll"` label.

Before reading further, if you're not aware of how to categorize your posts in [Jekyll](https://jekyllrb.com), I would highly recommend you to first read [this article](/how-to-categorize-your-posts-in-jekyll/) and come back again.

Alright so, my task was to fetch related posts by the category. In my case, I categorize my posts by `categories` property in the [frontmatter](https://jekyllrb.com/docs/front-matter/) like so.

```yml
layout: post
title: Everything About Jekyll
categories: [Jekyll]
```

So, I needed to use this property to fetch the related posts. For instance, if I want to fetch the recent five posts under the category "Jekyll", I can do so by looping over `site.categories` (which is available globally) like so.

```html
{% raw %}{% for post in site.categories['Jekyll'] limit: 5 %}
    <li>
        <p>
            <a href="{{ post.url | relative_url }}">
                {{ post.title | escape }}
            </a>
        </p>
    </li>
{% endfor %}{% endraw %}
```

Notice that, I've hard-coded "Jekyll" over here. But we need to use the post's category instead. So, we can use post's `page.categories` property which contains the category of the current post.

There's a catch, however. You simply just can't use `page.categories` as the index of `site.categories` like so.

```
site.categories[page.categories]
```

That's because Jekyll doesn't identify `page.categories` as a text/string.

To get around this, you'd need to capture it using a [capture](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers#tags) tag which lets you assign text/string to a variable and then use that variable as an index of the `site.categories` array. So, our updated code would be like so.

```html
{% raw %}{% capture category %}{{ page.categories | first }}{% endcapture %}

{% for post in site.categories[category] limit: 5 %}
    <li>
        <p>
            <a href="{{ post.url | relative_url }}">
                {{ post.title | escape }}
            </a>
        </p>
    </li>
{% endfor %}{% endraw %}
```

And that's how you can show related posts for your current post in Jekyll!