---
layout: post
title: Premature optimization is dangerous
image: /cdn/premature-optimization.png
categories: [PHP]
---

Working with PHP, it would be pretty obvious you'd be worried about the performance of your application. And because of this anxiety, you start to optimize trivial things such as replacing double quotes(") to single quotes('), use `echo` instead of `print_r`, or using static methods to gain those little performance gain. These tips are good and all. 

But think about it. If your application is wrongly designed in the first place, these tips won't help you much. This is called "Premature optimization" where you start to optimizing things before even measuring your application first and get to know what's the root cause.

> "Premature optimization is the root of all evil" ~ Donald Knuth

So, it really doesn't matter when you make your code run 0.15ms faster when a single SQL query takes 80ms. Micro optimizations are the last resort when you've got the perfect application design and still need more performance from certain modules/functions.

Premature optimizations come with the following drawbacks:

- Your development time gets increased.
- The time required to test the application gets increased.
- You invest more time fixing bugs that otherwise wouldn't be there.

If we talk about PHP, you could use the tool like [XDebug](http://www.xdebug.org/) which can determine which areas of your application are eating up your application's performance. By the end of profiling, you'd be surprised to find that your application is taking more time executing database queries, which let's say is 100ms than the trivial `str_replace` calls which take only 0.5ms. So, it's better to optimize your queries and application first than to optimize less important stuff such as replacing function calls. Sure, these things are equally important. There's no denying, but it's more important to get the core things right. You don't need to focus so much on the low-level performance optimizations.

In order to avoid premature optimizations, this is what you can do. In which, you can design your application first, then code your application according to the design and then profile/benchmark the resulting code to see which parts should be optimized. A simple and elegant design is often easier to optimize at this stage, and profiling may reveal unexpected performance problems that would not have been addressed by premature optimization.

# In closing

Optimizations are important but as a developer, you have to balance things out. So, taking care of the application design along with the profiling it time-to-time can go a long way and in the end, you might end up with an application that wouldn't require a whole lot of optimizations. Which of course saves time and energy altogether.



