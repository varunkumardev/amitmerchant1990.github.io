---
layout: post
title: Why you should use Laravel Queues
---

There comes times when you wouldn't want your end users staring at white screens or that intimidating loaders for a long time. For instance when user registers to your site, you must have configured your website to send a welcome email or a confirmation email upon registering. So, that operation should be snappy and for that purpose you'd actually want to reduce the amount of time your app takes while sending the email to the user. Laravel Queues comes to the recue for achieving such kind oftime consuming tasks.

> Laravel queues provide a unified API across a variety of different queue backends, such as Beanstalk, Amazon SQS, Redis, or even a relational database. Queues allow you to defer the processing of a time consuming task, such as sending an email, until a later time. Deferring these time consuming tasks drastically speeds up web requests to your application.

So, what Laravel Queues basically does is, it stacks up time consuming tasks and create their jobs and dispatches them when they are intended to be. This way the user won't notice lag in their overall experience when performing such operation.

