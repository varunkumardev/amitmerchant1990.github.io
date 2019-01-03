---
layout: post
title: Build your own Laravel artisan commands for your project
---

When working on a project, there comes a time when you need to automate certain tasks. In such cases, it is better to use a CLI tool which can be run from the command prompt because using a web APIs for certain tasks is cumbersome. 

Laravel comes with its [Artisan](https://laravel.com/docs/5.7/artisan) CLI tool shipped with the commands that can assist you while you build your application. Under the hood, Artisan's [Command](https://github.com/laravel/framework/blob/5.4/src/Illuminate/Console/Command.php) is using [Symphony command](https://github.com/symfony/symfony/blob/4.2/src/Symfony/Component/Console/Command/Command.php), with some added conveniences and shortcuts. 

Laravel Artisan ships with the commands which can be useful to generate models, controllers, middleware, test cases, and many other types of files for the framework. o view a list of all available Artisan commands, you may use the list command:

```bash
php artisan list
```
