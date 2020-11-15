---
layout: page
permalink: /posts/git/
title: Posts about "Git"
---

<div class="posts">
  {% for post in site.posts %}
    {% if post.categories contains 'Git' %}
      {% include categories_common.html %}
    {% endif %}
  {% endfor %}
</div>