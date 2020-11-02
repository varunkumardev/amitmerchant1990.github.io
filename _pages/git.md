---
layout: page
permalink: /posts/git/
title: Posts about "Git"
---

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'Git' %}
      <article class="post">

        <h1><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h1>

        <div>
          <p class="post_date">{{ post.date | date: "%B %e, %Y" }}</p>
        </div>

        <div class="entry">
          {{ post.excerpt }}
        </div>

        <a href="{{ site.baseurl }}{{ post.url }}" class="read-more">Read More ⟶</a>
      </article>
      {% endif %}
  {% endfor %}
</div>