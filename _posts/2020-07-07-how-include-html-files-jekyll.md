---
layout: post
title: How to include HTML files in Jekyll
image: /cdn/how-include-html-files-jekyll.png
categories: [Jekyll]
---

Sometimes, there comes a scenario where you would need to extract some part of the `html` so that you can use it across different areas of your site without repeating the same markup all over places.

For instance, the *"Recently Published"* section of the sidebar on this site contains 5 recently added articles. Now, I want to make this section re-usable. [Jekyll](https://jekyllrb.com/) makes it easy to accomplish this.

So, to make the logic re-usable, I created a file called `recent_articles.html` under the `_includes` folder like so.

```html
<div class="recent-articles">
    <h2>Recently Published</h2>
    {% raw %}{% assign maxposts = 5 %}{% endraw %}
    <ul class="post-list text-muted list-unstyled">
        {% raw %}{% for post in site.posts limit: maxposts %}{% endraw %}
            <li>
                <p>
                    <a class="article-link" href="{{ post.url | relative_url }}">
                    {% raw %}{{ post.title | escape }}{% endraw %}</a>
                </p>
            </li>
        {% raw %}{% endfor %}{% endraw %}
    </ul>
</div>
```

> **Note**:  Keep in mind, the `_includes` is the only folder where all your html goes that you want to "include" at various places.

Now, all I need to do to include is to use following format in the file you want include the file.

In my case, I wanted to include this in `sidebar.html` and here's how I included it.

```html
{% raw %}{% include recent_articles.html %}{% endraw %}
```

This way, Jekyll will render the included file and is become re-usable as well.
