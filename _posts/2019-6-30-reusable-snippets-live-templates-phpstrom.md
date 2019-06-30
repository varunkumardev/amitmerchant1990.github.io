---
layout: post
title: Reusable code snippets using Live Templates in PHPStrom
categories: [Miscellaneous]
---

Let's just admit this. If you're a developer who works with PHP and you haven't heard about [PHPStrom](https://www.jetbrains.com/phpstorm/), you're assumed to be living in the rocks. Because PHPStrom is the best PHP IDE exist right now IMHO. The tagline on the homepage of it reads as __"The lightening-smart IDE for PHP"__ and it's really true. It has got all the features you'd need in order to become a fluent PHP programmer.

I'm going to talk about one such feature of PHPStrom which I think is underutilized by developers. I'm talking about **Live Templates**. Often time comes, when you'd want some small bits of called which you need on a frequent basis while working on your project. I call them snippets. Well, live templates is the exact same feature which would fulfil this need. Let's talk about it in detail.

## Live Templates

Live templates are small code snippets which can be accessed by typing the corresponding template abbreviation and press <kbd>Tab</kbd>. Keep pressing <kbd>Tab</kbd> to jump from one variable in the template to the next one. Press <kbd>Shift</kbd>+<kbd>Tab</kbd> to move to the previous variable. 

In order to create a live template, for instance, if I want to create a error log snippet for Magento 2 I will first need to...

* Navigate to **File** > **Settings/Preferences** > **Live Templates**.

* Select the template group where you want to create a new live template (for example, PHP). If you do not select a template group, the live template is added to the user group.

* Click Add The Add icon on the toolbar. A new template item is added and selected.

|  Field | Description  |  Example value |
|---|---|---|
| Abbreviation  |  Specify the characters to expand the template | erl  |
| Description  | Specify an optional description to identify what the template is for  | Error log for Magento2  |
| Template text  | Specify the body of the template with [variables](https://www.jetbrains.com/help/phpstorm/template-variables.html)  | Code snippet that you want to use.  |

In my case, I'm going to use following snippet,

```php
$objectManager = \Magento\Framework\App\ObjectManager::getInstance();
$logger = $objectManager->get('\Psr\Log\LoggerInterface');
$logger->info('Log: ' . print_r($log$, true));
```

The template would look something like below.

![](/images/live-templates.png)


* Click Define at the bottom to select the applicable contexts (for example, JavaScript if it should apply to PHP source files).

* Click **Edit Variables**. In order to keep the value of `$log$` empty, I'll leave the `Default value` field empty and click **OK**.

And now, whenever I type `erl` and press <kbd>Tab</kbd>, the above code snippet template will appear with the cursor set at the `$log$` as an empty space.

If you want to reuse the same template in multiple groups, or you want to create a new template based on another one, you can duplicate an existing template.