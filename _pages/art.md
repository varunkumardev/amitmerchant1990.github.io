---
layout: page
permalink: /art/
title: All of my artworks
image: /images/artworks.png
fluidbox: true
---

<style>
    .row-masonry {
        display: -ms-flexbox; /* IE10 */
        display: flex;
        -ms-flex-wrap: wrap; /* IE10 */
        flex-wrap: wrap;
        padding: 0 4px;
    }

    /* Create four equal columns 
    that sits next to each other */
    .column-masonry {
        -ms-flex: 50%; /* IE10 */
        flex: 50%;
        max-width: 50%;
        padding: 0 4px;
    }

    .column-masonry img {
        margin-top: 8px;
        vertical-align: middle;
        width: 100%;
        border-radius: 10px;
    }

    /* Responsive layout - makes a two 
    column-layout instead of four columns */
    @media screen and (max-width: 800px) {
        .column-masonry {
            -ms-flex: 50%;
            flex: 50%;
            max-width: 50%;
        }
    }

    /* Responsive layout - makes the two columns stack on 
    top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .column-masonry {
            -ms-flex: 100%;
            flex: 100%;
            max-width: 100%;
        }
    }
</style>

These are all of my artworks/drawings that I've drawn over time. This will be sort of a live page where I'll be adding new artworks as and when I get a chance to get them completed.

<div class="row-masonry">
    {% assign j = 0 %}
    {% for picture in site.pictures %}
        {% if j == 0 or j == 8 %}
        <div class="column-masonry">
        {% endif %}
        <a href="/cdn/art/{{picture.name}}"><img src="/cdn/art/{{picture.name}}" style="width:100%" loading="lazy"></a>
        {% if j == 7 or j == 13 %}
        </div>
        {% endif %}
        {% assign j = j | plus:1 %}
    {% endfor %}
</div>