---
layout: page
title: Search
permalink: /search/
---

<div id="search-container">
    <input type="text" id="search-input" placeholder="Try searching about PHP, Eloquent, PWA,..">
    <ul id="results-container"></ul>
</div>

<script src="/js/simple-jekyll-search.min.js" type="text/javascript"></script>

<script>
    SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    searchResultTemplate: '<div style="text-align: left !important;"><a href="{url}"><h1 style="text-align:left !important;">{title}</h1></a><span style="text-align:left !important;">{date}</span></div>',
    json: '/search.json'
    });

    function getURLParameter(e) {
        return decodeURI((new RegExp(e + "=(.+?)(&|$)").exec(location.search) || [, ""])[1]);
    }

    setTimeout(function() {
        if (getURLParameter('q') === '') {
            let element =  document.getElementById('search-input');
            element.focus();
        } else {
            let element =  document.getElementById('search-input');
            element.focus();
            element.value = getURLParameter('q');
            var e = document.createEvent('KeyboardEvent');
            e.initEvent('keyup', true, true, document.defaultView, false, false, false, false, 13, 0);
            element.dispatchEvent(e);
        }
    }, 200);
</script>