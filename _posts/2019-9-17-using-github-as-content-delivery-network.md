---
layout: post
title: Using GitHub as a Content Delivery Network
image: /cdn/github-cdn.jpeg
categories: [Miscellaneous]
---

This is a quick write up on how I've started utilizing [GitHub](https://github.com) as a [Content Delivery Network](https://en.wikipedia.org/wiki/Content_delivery_network)(sort of) and how you can do the same as well.

Usually, CDNs are used to have a content delivered on your website in a fast manner and to save some space on your server from resources such as images, documents etc. I've tried to use GitHub as a CDN for somewhat similar reasons. I'm running this blog on GitHub pages and as you might know GitHub only allows contents under 1 GB per repository. I didn't wanted to utlize my GitHub page's site's storage to store images that I end up using on the blog. So, I've figured out a way.

## Repository as a CDN (RaaC) [?]

I thought of creating and using an another GitHub repository where I would store all the image resources and which can act as a mean to deliver content on my blog whenever requested. I created a repository named [cdn](https://github.com/amitmerchant1990/cdn) which is actually a bare bone repository. I would add images and resources in here.

Now, as I've configured my GtHub pages site to work with my custom domain, I can easily access any content on this site using URL `https://www.amitmerchant.com/cdn/<resource name in the repos>`. For instance, There's an image called `bulb-min.jpg` exists in the repository which I can access using the following URL: [https://www.amitmerchant.com/cdn/bulb-min.jpg](https://www.amitmerchant.com/cdn/bulb-min.jpg)

And there you have it! Your free and instantly available CDN ready to use in few clicks. Easy-peasy! 
 
This way I can save up the space on my original GitHub pages site which I don't want to get exhauted under 1 GB of limit and in case if the "cdn" repository also gets exhasuted, I can always create an another repository named "cdn2" or something like that. ;)

## In closing

I'm sure many here will find this funny but trust me it's highly functional and one can surely use it as a CDN alternative which they can spin up in minutes. I hope this would be useful for someone who is looking for a quick CDN service. :)

Until next time!

