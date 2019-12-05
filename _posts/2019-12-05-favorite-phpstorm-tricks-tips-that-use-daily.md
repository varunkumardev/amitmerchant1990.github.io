---
layout: post
title: My favorite PhpStorm tricks and tips that I use daily
categories: [PHP, Miscellaneous]
image: /cdn/phpstorm-tricks-tips.png
---

Jetbrain's [PhpStorm](https://www.jetbrains.com/phpstorm/) is my goto IDE when it comes to the PHP developement. Be it Laravel, Symphony or Magento. It's like a gold standard. The kind of intelligent features it offers is unmatchable and almost irrplaceable by any IDE of this level.

So, here in this article, I'm going to list down some of my favorite features, tricks and tips of PhpStorm that I use in day-to-day and made my programming life a breeze.

## Reformat the source code

I often end up with a ugly looking code. So, what I do the end of the day is reformat my code using PhpStorm's handy little reformatting shortcut.

To do this, all you need to do is by selecting the part of the code and hit <kbd>Cmd ⌘</kbd> + <kbd>⌥ Option</kbd> + <kbd>L</kbd> (Or <kbd>Ctrl + Alt + L</kbd> on Windows/Linux). This will reformat the selected part of the code in a jiffy. Or if you don't select a code fragment, PhpStorm will reformat the whole file. 

## Selection extending & shrinking

Argubly one of my favorite features of PhpStorm is code selection extending and shrinking with just the stroke of buttons. All you have to do is press <kbd>⌥ Option</kbd> + <kbd>Up</kbd> (<kbd>Ctrl</kbd>+ <kbd>W</kbd> on Windows/Linux) to extend the selection from the cursor’s location to the encompassing code contexts.

Press <kbd>⌥ Option</kbd> + <kbd>Down</kbd> (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>W</kbd>) to shrink the selection.

## Auto initialize class properties

It's often a prcatice among the developers to use arguments passed into constructors to be used by the rest of the class. PhpStorm can create these properties from the constructor’s method signature with only a few key strokes. In order to do so, you just need to put the cursor a certain argument for which you want to initialize a class property and press <kbd>⌥ Option</kbd> + <kbd>Return</kbd>. This will invoke an intention actions menu from which you'll need tp select `Initialize fields` option. You will be prompted to choose which fields you want to initialize. Once selected, PhpStorm will create a new private property for the chosen field and name it after it's corresponding argument, as well as initialize it with a value in the constuctor's definition.

![Initialize class properties](/cdn/initialize-class-properties.png)

## Favorite files

I often end up in situations where I need to go back to certain file every now and then. So, what I do this, I favorite those file for a quick usage. 

In order to favorite a file, you need to right click on the title of the file which will invoke an intention menu. From there, select `Add To Favorites`. This will promt you to create a new favorite list. Once created, your file will get added in the list as a favorite. You can now access the file by pressing <kbd>Cmd ⌘</kbd> + <kbd>2</kbd> which will open the Favorites tool window. And from there you can chose your favorited files under the specified list.

## Annotations

This little feature always comes to rescue for me. As I'm working in a team of many developers, I've often find myself wondering who's written "this" code. Annotations are a useful way to quickly glance through the current author of each and every line if your project is configured through Git.

For this all you need to do is, place cursor in the file gutter and right click. You'll need to select "Annotations" from the opened menu. This will expand the gutter with names of authors for each of the line of the file like below. 

![Annotations](/cdn/annotations.png)

Additionally, upon hovering on the line in the gutter, PhpStorm will you a commit message for that particular line in a tooltip. Pretty handy, right?

## Compare to clipboard

Sometimes you have several different versions of files or folders related to your project locally, or you’ve just downloaded it from a remote source. In this case it’s crucial to work with the most up-to-date copy. If you need to merge changes and synchronise folders,  then it can become even more complicated, as well as difficult to perform manually without any support.

PhpStorm, in this case, provides a handy little featire called "Compare to Clipboard". Basically, you need to copy the file content with which you want to compare file in PhpStorm. To compare a file with the clipboard contents, open the file in the editor, right-click the editor pane and choose Compare with Clipboard from the context menu. 

![Compare to Clipboard](/cdn/clipboard.png)

This will open a Difference Viewer which shows all the differences and highlights the source code. You can move between changes and perform actions by clicking the icons.

## Refactor the code

Refactoring code in PhpStorm is a cakewalk. Essentially, if you want to improve your source code without creating a new functionality, refactoring helps you keep your code solid, dry, and easy to maintain. For instance, you can extract a method out of piece of code without even bothering about which arguments will it need. For this, select the code that you want to refactor to another function, right click then select `Refector > Extract > Method`. 

![refector code](/cdn/refactor-code.png)

You'll then be presented with a pop up where you need to give method name(with all the suggested arguments) and you're done! You just refactored the code with few keystrokes. 

## Convert array to short syntax

To convert arrays using the traditional `array()` syntax to the shorthand `[]` syntax, place the cursor on the array and hit <kbd>⌥ Option</kbd> + <kbd>Return</kbd>(<kbd>Alt</kbd> + <kbd>Enter</kbd>) to invoke the intention actions dialogue then select the `Convert array to short syntax` option.

![Convert array to short syntax](/cdn/array-short-syntax.png)

If the array has nested arrays, PhpStorm will recursively update all the child arrays. Pretty nifty!

## In closing

These are my few favorite features which I absolutely love and I hope are not the least. PhpStorm continues to amaze me with its capabilities every day. There will be something to learn everyday. So, this list is going to be updated over time. Until next time!
