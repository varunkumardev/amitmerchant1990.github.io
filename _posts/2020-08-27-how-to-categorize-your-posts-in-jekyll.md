---
layout: post
title: How to categorize your posts in Jekyll
image: /cdn/how-to-categorize-your-posts-in-jekyll.png
categories: [Jekyll]
---

When I first started blogging using [Jekyll](https://jekyllrb.com/), I was using a popular Jekyll theme called [jekyll-now](https://www.google.com/search?q=jekyll-now&oq=jekyll-now&aqs=chrome..69i57j0l7.2704j0j4&sourceid=chrome&ie=UTF-8). The theme is quite minimalistic in nature, bare-bone and lacking some key features. But in those earlier days, I was okay with its simplicity.

Then, over time, my number of articles grew and I was writing about an array of different topics and at this point, I've felt that something is missing. The content became unmanageable and unsearchable and so, I needed a way to get around with it. And that's where the idea of implementing categories/tags arrived. I'll walk you through how I implemented it on this blog.

## Adding categories in posts

The first and foremost thing I needed to do is to just add a `categories` variable in the [frontmatter](https://jekyllrb.com/docs/front-matter/) of each post. Here's how you can add categories into the frontmatter.

So, if your post falls under the `JavaScript`, you can set it like so.

```yaml
categories: JavaScript
```

And for adding multiple categories:

```yaml
categories: [PHP, Laravel]
```

By adding this into the frontmatter, about 50% of the task is done.

Now, by using this `categories` variable, we can do many different things. Such as creating category pages, make post searchable, and several other things.

## Creating a category page

Using the `category` frontmatter variable, we can make a categories page called `categories.md` in the `_pages` directory where you can categorize and list each post by its category like so.

```html
---
layout: page
permalink: /categories/
title: Categories
---

<div id="archives">
  {% raw %}{% for category in site.categories %}
    <div class="archive-group">
      {% capture category_name %}{{ category | first }}{% endcapture %}
      <div id="#{{ category_name | slugize }}"></div>
      <h3 class="category-head">{{ category_name }}</h3>
      <a name="{{ category_name | slugize }}"></a>
      {% for post in site.categories[category_name] %}
      <article class="archive-item">
        <h4>
            <a href="{{ site.baseurl }}{{ post.url }}">{{post.title}}</a>
        </h4>
      </article>
      {% endfor %}
    </div>
  {% endfor %}{% endraw %}
</div>
```

Notice, we're using `site.categories` which will get us all the categories the posts are using and then we can loop over them. And in the loop, we can get the post based on the current category in the loop using the following loop.

```html
{% raw %}{% for post in site.categories[category_name] %}{% endraw %}
```

This page looks like the following: [https://www.amitmerchant.com/categories](https://www.amitmerchant.com/categories/)

# Individual a category page

You can also create an individual category page for selected categories. For instance, you can see a category page for "PHP": [https://www.amitmerchant.com/posts/php](https://www.amitmerchant.com/posts/php/)

You can make such a category page called `php.md` in the `_pages` directory using the following code.

```html
---
layout: page
permalink: /posts/php/
title: Posts about "PHP"
---

<div class="posts">
  {% raw %}{% for post in site.categories['PHP'] %}
    <article class="post">
      <h1>
          <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      </h1>
      <div>
        <p class="post_date">{{ post.date | date: "%B %e, %Y" }}</p>
      </div>
      <div class="entry">
        {{ post.excerpt }}
      </div>
      <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">
          Read More
      </a>
    </article>
  {% endfor %}{% endraw %}
</div>
```

This page will enlist all the posts which have `categories` set to `PHP`.

## Using categories in search

You can also utilize categories in your search. For instance, I'm using a library called [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search) to power my blog's search.

What this library does is use a small dataset file called `search.json` which contains all the posts in the form of a JSON to perform the searches on the client-side. You can place the following code in `search.json` in the root of your Jekyll blog.

```json
---
---
[
  {% raw %}{% for post in site.posts %}
    {

      "title"    : "{{ post.title | escape }}",
      "url"      : "{{ site.baseurl }}{{ post.url }}",
      "category" : "{{ post.categories | join: ', '}}",
      "date"     : "{{ post.date | date: "%B %e, %Y" }}"
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}{% endraw %}
]
```

As you can see here, we've used a JSON key called `category` which will hold the category of the post. And this way, we can utilize categories while search posts as well.