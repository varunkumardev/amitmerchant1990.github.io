---
layout: post
title: Make images clickable in Jekyll
image: /cdn/images-clickable.png
categories: [Jekyll]
---

The blog that you're on right now is built using [Jekyll](https://jekyllrb.com/). So, the other day, I was looking for a way to make images clickable. If you've worked with Jekyll previously, you might be knowing that the classic way to insert an image in Jekyll is to use the following Markdown markup like so.

```md
![Ancient Bristlecone Pine Forest, USA](/images/john-towner-unsplash.jpg)
```

This will render the following image.

![](/images/john-towner-unsplash.jpg)

Notice, If you try to click/tap the above image, you won't be able to as this is simply an `<img>` tag. So, to make it "clickable" all you will need to do is wrap the `<img>` using an anchor `<a>` tag. And to do this, you just need to change the above markup to the following.

```md
[![Ancient Bristlecone Pine Forest, USA](/images/john-towner-unsplash.jpg)](/images/john-towner-unsplash.jpg)
```

It will basically use the `<img>` tag as `<a>` tag's content and image URL as its `href`. So,this will render the following html,

```html
<a href="/images/john-towner-unsplash.jpg">
    <img 
        src="/images/john-towner-unsplash.jpg" 
        alt="Ancient Bristlecone Pine Forest, USA"
    >
</a>
```

This will ultimately render the following image which is now comfortably clickable and tappable!

[![Ancient Bristlecone Pine Forest, USA](/images/john-towner-unsplash.jpg)](/images/john-towner-unsplash.jpg)