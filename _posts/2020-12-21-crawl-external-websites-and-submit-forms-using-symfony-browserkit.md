---
layout: post
title: Crawl external websites and perform actions using Symfony's BrowserKit 
image: /cdn/crawl-third-party-websites-and-submit-forms-using-symfony-browserkit.png
categories: [PHP]
---

There might be some situations where you would want to crawl a third-party website and perform some actions right from your PHP codebase. For instance, submitting forms, logging into your account, clicking links, etc. to add some degree of automation in your workflow.

Thankfully, there's one package from [Symfony](https://symfony.com/) team that got us covered for all such automation. Enter the [BrowserKit](https://symfony.com/doc/current/components/browser_kit.html) package.

* TOC
{:toc}

## The BrowserKit Component

Symfony's [BrowserKit](https://symfony.com/doc/current/components/browser_kit.html) component simulates the behavior of a web browser, allowing you to make requests, click on links, and submit forms programmatically.

It lets you do this by providing a `Symfony\Component\BrowserKit\HttpBrowser` class using which you can create a browser instance and then providing it [HttpClient component](https://symfony.com/doc/current/http_client.html) to it. Let's see how.

## Install `BrowserKit` and `HttpBrowser`

The first thing you would need to do is install `BrowserKit` and `HttpBrowser` components in your project. You can do this using the following commands.

```bash
$ composer require symfony/browser-kit

$ composer require symfony/http-client
```

## Creating browser instance

Once installed, you can now create a browser instance using the `Symfony\Component\BrowserKit\HttpBrowser` to create the client that will make the external HTTP requests like so.

```php
use Symfony\Component\BrowserKit\HttpBrowser;
use Symfony\Component\HttpClient\HttpClient;

$browser = new HttpBrowser(HttpClient::create());
```

Now, you are all set to crawl external websites and perform actions over them. 

## Submitting forms

Once the browser instance is created, you can use it as a *"virtual browser"* to navigate through the website. For instance, you can visit the site by using the `request()` method, click a link using the `clickLink()` method, or submit a form using the `submitForm()` method.

So, if you want to simulate login into your [GitHub](https://github.com/) account, you can do it like so.

```php
$browser = new HttpBrowser(HttpClient::create());

$browser->request('GET', 'https://github.com');

// 'Log in' can be the text content, id, value or name of a <button> or <input type="submit">
$browser->clickLink('Sign in');

// the second optional argument lets you override the default form field values
$browser->submitForm('Sign in', ['login' => '...', 'password' => '...']);

// at this point you're logged into your account
// get the current URL now
$githubHome = $browser->getHistory()->current()->getUri();
```

As you can tell, the browser component interacts with the website content based on the text that this element contains. For instance, it clicks the link with text **"Sign in"**, Submits a form with form name or button name that contains **"Sign in"** text.

Notice also that, you can also pass in form parameters by providing an optional second argument to the `submitForm` method.

## Get current page's content

If you want to get the current page's content, you can do it like so.

```php
$browser->request('GET', 'https://github.com');

print_r(json_decode($this->browser->getResponse()->getContent()));
```

## Go back and forth in your history

The browser requests also allow you to go back and forward in your history like so.

```php
$browser->request('GET', 'https://github.com');

$browser->clickLink('Issues');

$homePage = $client->back();

$issuesPage = $client->back();
```

## Practical usage

If you want to see the practical usage of this component, check Beyond Code's [fathom-analytics-api](https://github.com/beyondcode/fathom-analytics-api) package which is the unofficial Fathom Analytics API. They have used [BrowserKit](https://symfony.com/doc/current/components/browser_kit.html) to simulate the browser behavior in order to get some nice data out of it.

## In closing

There are a lot of use-cases in which you can make use of this amazing package. You can go even further by coupling it with [CssSelector](https://symfony.com/doc/current/components/css_selector.html) and [DomCrawler](https://symfony.com/doc/current/components/dom_crawler.html) components to get the most out of it.

Check out BrowserKit's [offical documentation](https://symfony.com/doc/current/components/browser_kit.html) to learn more about it.