---
layout: post
title: TIL - Using "Box Model" of Chrome Dev Tools
---

We all know how good is Chrome Dev Tools when it comes to the web debugging capabilities. There are number of features in the Dev Tools which are very useful but we are unaware of.

One such feature which I've discovered today is "Box Model". So, what is it exactly?

_"It's a feature provided by Chrome Dev Tools which show us the visual representation of an element on the HTML page including margins, paddings and borders relative to the other elements."_

![Box Model](https://raw.githubusercontent.com/amitmerchant1990/amitmerchant1990.github.io/master/images/box-model.JPG)

You probably have seen this many times during your daily debugging but did not give it a try cause maybe you were not fully aware about it or just skipped it as it was.

Basically it shows us the following things about the particular element: 

![Box Model Described](https://raw.githubusercontent.com/amitmerchant1990/amitmerchant1990.github.io/master/images/box-model-described.jpg)

As shown in the figure, it shows us the relative margins, paddings, borders through colors. So, everything is represented in different color. The main element being in blue, padding in green, border in brown color and so forth. It also shows the amount of padding/margins in terms of a number at everyside. i.e Top, Bottom, Left and right.

![Box Model 2](https://raw.githubusercontent.com/amitmerchant1990/amitmerchant1990.github.io/master/images/box-model-2.JPG)

In above image, as you can see, an element have 5px padding at every side, 1px of border and no margin on either side. One interesting thing about this Box Model is, you can actually modify any of the number right in it and can see the changes accordingly.

![Box Model Gif](https://raw.githubusercontent.com/amitmerchant1990/amitmerchant1990.github.io/master/images/box-model.gif)

This comes really handy when we want to see the actual behaviour of paddings and margins across the elements rather than just changing them in the CSS randomly. But it's unfortunate that it's very less used tool amongst others even though it gives us more precise representation of elements. So, let's try to use it more from now on.


