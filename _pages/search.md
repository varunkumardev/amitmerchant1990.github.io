---
layout: page
title: Search
permalink: /search/
---

<div id="search-container">
    <div>
        <input type="text" id="search-input" placeholder="Try searching about PHP, Eloquent, PWA,..">
        <p class="search-categories">
            ...Or browse by <a title="Categories" href="/categories">category</a>
        </p>
    </div>
    <ul id="results-container"></ul>
</div>

<script src="/js/simple-jekyll-search.min.js" type="text/javascript"></script>

<script>
    function getURLParameter(e) {
        let params = (new URL(document.location)).searchParams;
        return params.get('q');
    }

    let element = '';

    if (getURLParameter('q') === '') {
        element =  document.getElementById('search-input');
        element.focus();
    } else {
        element =  document.getElementById('search-input');
        element.focus();
        element.value = getURLParameter('q');
    }

    SimpleJekyllSearch({
        searchInput: document.getElementById('search-input'),
        resultsContainer: document.getElementById('results-container'),
        searchResultTemplate: '<div style="text-align: left !important;"><a href="{url}"><h1 style="text-align:left !important;">{title}</h1></a><span style="text-align:left !important;">{date}</span></div>',
        json: '/search.json'
    });
</script>