---
layout: post
title: Prevent spammy form submissions by bots using this Honeypot technique in PHP
image: /cdn/prevent-form-spamming-by-bots-using-this-honeypot-technique-in-php.png
categories: [PHP]
---

In modern web applications, one of the pain points everyone faces at some point is spam submissions to forms by automated bots. 

* TOC*
{:toc}

What happens is malicious entities or back actors submit unwanted information through online forms to phish or send abusive messages. So, there is no real human who is filling out the form. Instead, the bots will fill every field of the form with completely random data (which are eventually of no use) and submits the form.

There are a few ways to fix this kind of attack. One of the many ways is to use CAPTCHA. Essentially, A CAPTCHA is a type of challenge-response test used in forms to determine whether or not the user is human. But I'm not going to talk about it as this involves the use of a third-party CAPTCHA service such as [Google CAPTCHA](https://www.google.com/recaptcha/about/).

Instead, I'm going to talk about a really simple yet effective technique called ***"Honeypot"*** using which you can prevent spam submissions without using third party services.

## What is Honeypot?

Quoting the [definition from Wikipedia](https://en.wikipedia.org/wiki/Honeypot_(computing)),

> In computer terminology, a honeypot is a computer security mechanism set to detect, deflect, or, in some manner, counteract attempts at unauthorized use of information systems.

So, in a nutshell, you would put "something" in your system (a form in our case) which can be used to counteract the spammy submissions. Let's understand how we can do it.

## How to implement a Honeypot?

Most of the bots which are used to filling up forms are kind of dumb. They try to fill every field on the form and submits it. This is where we can set our trap.

To set up a honeypot, all you will need to do is set a `hidden` field on the form which doesn't have any value. And when the user submits the form, you'd check if that hidden field's value is still blank or null in the backend. That is because a real human will never fill the hidden field while the automated bot will fill even that field as well.

So, if the specified field is submitted with a value, you know you can discard the form submission and move with the normal flow if it doesn't have any value.

So, for instance, let's say I have this form.

```html
<form action="/action_page.php">
  <label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="John"><br>
  <label for="lname">Last name:</label><br>
  <input type="text" id="lname" name="lname" value="Doe"><br><br>
  <input type="submit" value="Submit">
</form>
```

To make this spam-proof, I can add a Honeypot field like so. 

```html
<form action="/action_page.php" method="post">
    <input type="hidden" name="dont_fill_this" value> <!-- Honeypot field -->
    <label for="first_name">First name:</label>
    <input type="text" id="first_name" name="first_name" value="">
    <label for="last_name">Last name:</label>
    <input type="text" id="last_name" name="last_name" value="">
    <input type="submit" value="Submit">
</form>
```

## Verify in the backend

In the backend, you can verify if the form is submitted by a bot or human-like so.

```php
if (isset($_POST)) {

    if (!empty($_POST['dont_fill_this'])) {
        // this is bot submission
    }

    // continue with handling the 
    // rest of the form submission
}
```

It's as simple as it gets. It's quite easy to implement as you can see and no third-party library involved at all which also makes the overall user experience more fluid as it doesn't get into the user's way and is quite non-intrusive unlike CAPTCHAs or other third-party tools.