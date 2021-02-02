---
layout: post
title: Monitor a Laravel App with Scout APM (Sponsor)
image: /cdn/monitor-a-laravel-app-with-scout-apm-1.png
categories: [Laravel]
fluidbox: true
---

There is no denying the popularity of PHP. It has been a constant force in the web development world since its release in 1995. And now, thanks to Laravel, it is still going as strong as ever! 

To support this popularity, Scout APM works hard to provide a PHP application performance monitoring agent to sit alongside their existing [Ruby](https://docs.scoutapm.com/?&_ga=2.13897777.787953493.1607361874-1921515952.1591658385#ruby-agent), [Python](https://docs.scoutapm.com/?_ga=2.13897777.787953493.1607361874-1921515952.1591658385#python-agent), [Node.js](https://docs.scoutapm.com/#nodejs-agent), and [Elixir](https://docs.scoutapm.com/?_ga=2.121896717.787953493.1607361874-1921515952.1591658385#elixir-agent) agents, and we thought it would be a good idea to show you folks how easy it is to get started with it and to highlight the main features to the Laravel community.

* TOC
{:toc}

## Setup

To get started monitoring your Laravel applications you will first of all need a Scout account. If you don’t have one already, you can [sign up for a free 14-day free trial (no credit card required) here](https://ter.li/wpbqw2).

The next thing to do is to add the low-overhead monitoring agent to your project’s dependencies, this can be done with a single command in your shell:

```bash
$ composer require scoutapp/scout-apm-laravel
```

This command will install two packages: **scout-apm-laravel** and **scout-apm-php**.

The next thing to do is to define some configuration settings to link the agent to your account. To do that, open up your project’s **.env** file in your favourite text editor and add the following three lines to the end of the file:

```
SCOUT_MONITOR=true

SCOUT_KEY="enter your Agent Key here"

SCOUT_NAME="enter the name of you application here"
```

You can find your account’s Agent Key on [the settings page of Scout](https://scoutapm.com/settings).

And that’s it! Deploy, and after approximately 5 minutes, your data will start to appear in Scout. For more information about Heroku installs or to troubleshoot installation problems, either [take a look at the documentation](https://docs.scoutapm.com/#php-agent) or [shoot us an email on support](mailto:support@scoutapm.com) and we’ll be happy to help.

## Where to start?

So you’ve created a Scout account, hooked up the monitoring agent, but where do you start with diagnosing your application’s performance issues? Let’s take a look at the main features of Scout which can help you to understand your performance issues quickly.

## The main overview page

The first page that you are presented with when you log into Scout is the overview page (shown below) which gives you a clear, clutter-free, snapshot of the health and performance of your application in one quick glance.

[![alt_text](/images/scoutapm-article/scout-image1.png)](/images/scoutapm-article/scout-image1.png)

The chart is highly configurable, allowing you to change the time period and toggle which metrics you want to see. It also features a neat drag-and-drop tool (shown below) that allows you to draw a box around areas you wish you explore in more detail. A pop-up window will dynamically load as you draw these boxes, showing all the endpoints that were accessed during this time period. This can be particularly useful when you see a performance spike on the chart and you want to see what caused it.

[![alt_text](/images/scoutapm-article/scout-image2.png)](/images/scoutapm-article/scout-image2.png)

## Insights tabs

A great place to start if you are trying out Scout for the first time are the insights tabs. Here we have a set of algorithms which analyse your project to identify potential **n+1 queries** and **slow queries**. These offer you the "low-hanging fruit" of performance fixes that can often instantly improve your application’s performance.

[![alt_text](/images/scoutapm-article/scout-image3.png)](/images/scoutapm-article/scout-image3.png)

## Endpoints and Traces

Scout primarily provides application performance metrics at two levels. First of all, from the perspective of an **Endpoint**. For example, on average, how long does this endpoint take to access and what is the breakdown of where time was spent? 

If you take a look at the screenshot below, you can clearly see that on the 3 occasions that this ForgetPasswordController endpoint was accessed 78% of the 2,371ms mean request time was spent in the controller layer indicating that would be the first place to investigate if we wanted to try to improve this sluggish endpoint.

[![alt_text](/images/scoutapm-article/scout-image4.png)](/images/scoutapm-article/scout-image4.png)

The second perspective that Scout primarily presents metrics from is at the **Trace** level. For example, during this particular web request that somebody made, how long did it take to complete, and which levels of the request consumed the most time etc. Looking at the trace of the update action of the UserController below, we can see that in this case 98% of time was spent in the SQL layer, and most of this time was spent in those 2 calls to the query on the top line. If we click that SQL button we can see a backtrace and see if we can perhaps improve the query.

[![alt_text](/images/scoutapm-article/scout-image5.png)](/images/scoutapm-article/scout-image5.png)

These pages are where you will spend most of your time in Scout, and they give you the sort of visibility that is essential when trying to understand your performance issues. You can reach **Endpoint** and **Trace** pages either by coming directly from the main overview page and insights tabs, or by clicking on the **Web Endpoints** link at the top of the page (shown below).

[![alt_text](/images/scoutapm-article/scout-image6.png)](/images/scoutapm-article/scout-image6.png)

## Beyond the basics

Now that we’ve covered the basics of Scout and shown you the main areas of the system that you would typically use day in, day out, let’s now switch our attention to some of the more advanced features which put Scout ahead of the crowd in the APM space.

### Error Monitoring

Whether you are using [Sentry](https://sentry.io/), [Honeybadger](https://www.honeybadger.io/), [Bugsnag](https://www.bugsnag.com/) or [Rollbar](https://rollbar.com/) for your error monitoring, then we have you covered! Scout integrates seamlessly with these popular services, allowing you to have all your monitoring in one place, on the main overview page.

[![alt_text](/images/scoutapm-article/scout-image7.png)](/images/scoutapm-article/scout-image7.png)

The setup process is similar regardless of which of these services you use, and all it [involves is adding the API token](https://docs.scoutapm.com/#rollbar) on the settings screen of Scout.

### Custom Context and Trace Explorer

Why does this performance issue only happen at 2:00AM on Tuesday night from a Brazlian IP address? These kinds of difficult (but common) performance issues can be tackled with one of the most powerful features of Scout: the **trace explorer** being used in conjunction with user defined **custom context**.

Used defined **custom context** allows you to tell us what you need to see. And it is well worth investing the relatively [small amount of time it will take you to set up](https://docs.scoutapm.com/#php-custom-context) to be granted monitoring superpowers! By default the only context fields you will see are URI and Hostname, as you can see below, but these can be customized to anything that you want.

[![alt_text](/images/scoutapm-article/scout-image8.png)](/images/scoutapm-article/scout-image8.png)

The **trace explorer’s** multi-filter charts (shown above) allow you to examine endpoints that match criteria that you have defined, and then you can see all the traces that match these filters in the Transaction Traces part of the screen. For example, perhaps you want to see the web requests of a certain user, or of all users on a certain plan size, or from a certain part of the world. These sorts of operations are easy to do in the trace explorer with custom context, and they help you to get to the bottom of those hard-to-diagnose, time-consuming performance issues.

### Deploy tracking

Did this performance issue that you are seeing suddenly start happening after the last deploy? What is the user experience like during the time that you deploy? These are the types of questions that can be answered with our **deploy tracking** feature, which will place a rocket symbol on the main overview chart to indicate when a deployment occurred.

[![alt_text](/images/scoutapm-article/scout-image9.png)](/images/scoutapm-article/scout-image9.png)

Deploy tracking also allows you to see details such as how many commits were involved in the deploy and which branch the commits came from. We can glean all this information when you add the SHA or your deployment to the [SCOUT_REVISON_SHA environmental variable](https://docs.scoutapm.com/#php-deploy-tracking-config).

### Alerting

Like all good monitoring solutions, Scout provides you with a sophisticated **alerting system** which can be configured to send certain people alerts when endpoint response times or memory usage metrics go over a certain threshold. These alerts will appear as warning symbols on the main overview chart, and notifications will be sent out.

[![alt_text](/images/scoutapm-article/scout-image10.png)](/images/scoutapm-article/scout-image10.png)

By default, the alerting system will send notifications to users in notification groups via email, but it can also be [configured to work with third party services such as Slack](https://docs.scoutapm.com/#slack), VictorOps, PagerDuty etc. with our webhook feature.

### Custom Instrumentation

Are you using libraries outside of Laravel that we don’t currently instrument? If so, then first of all [let our support team know](mailto:support@scoutapm.com) and we’ll try and get support added for you. And in the meantime you can add some **custom instrumentation** yourself, it’s [really easy to get started](https://docs.scoutapm.com/#php-custom-instrumentation), and it will ensure that you have full visibility of your whole application.

## What’s next?

As you can see Scout APM brings a very mature APM monitoring solution to the PHP and Laravel communities. Our clutter-free UI and deep instrumentation help you get right to the heart of your performance issues quickly, whilst remaining affordable due to our flexible transaction-based pricing structure.

Are you interested in **trying out our new PHP monitoring agent?** If so, then [sign up here today for a free trial](https://ter.li/wpbqw2) (no credit card necessary) or [contact us with any queries](mailto:support@scoutapm.com) you might have.