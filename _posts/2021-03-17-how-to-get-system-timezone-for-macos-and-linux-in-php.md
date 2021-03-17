---
layout: post
title: How to get system timezone for macOS and Linux in PHP
image: /cdn/how-to-get-system-timezone-for-macos-and-linux-in-php.png
categories: [PHP]
---

Oftentimes you would want to retrieve the user's timezone to perform a certain task. And how would you retrieve it? One way to do it in PHP is by retrieving the timezone set on the user's system.

## Fetch timezone for Linux

So, for instance, if you want to fetch the timezone for Linux systems, you can write a function like so.

```php
function fetchTimeZoneLinux()
{
    if (file_exists('/etc/timezone')) {
        return ltrim(exec('cat /etc/timezone', $_, $exitCode));
        // Asia/Kolkata
    }

    return exec('date +%Z', $_, $exitCode);
    // IST
}
```

Let's break it down.

The function would first check if the file `/etc/timezone` exists which holds the system's current timezone. If this file exists, then we can use the [exec](https://www.php.net/manual/en/function.exec.php) function to return the system's timezone. In my case, it's *"Asia/Kolkata"*.

But if in case, the `/etc/timezone` is not present on the system, you can use the `date +%Z` command to retrieve the [alphabetic timezone abbreviation](https://en.wikipedia.org/wiki/List_of_time_zone_abbreviations). In my case, it returned *"IST"* which is "Indian Standard Time".

## Fetch timezone for macOS/Darwin

The way of getting the system timezone in [macOS](https://en.wikipedia.org/wiki/MacOS) is a little different. You would need the following function to fetch the timezone like so.

```php
function fetchTimeZoneDarwin()
{
    if (file_exists('/etc/localtime')) {
        return ltrim(
            exec(
                "-f 8,9 : /bin/ls -l /etc/localtime | /usr/bin/cut -d '/' -f 8,9", 
                $_, 
                $exitCode
            )
        );
        // Asia/Kolkata
    }
}
```

As you can tell, you would be using the `/etc/localtime` file to get the system's timezone since it's holding the timezone information in macOS.