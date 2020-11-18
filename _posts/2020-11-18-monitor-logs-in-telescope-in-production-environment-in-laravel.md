---
layout: post
title: Monitor logs in Laravel Telescope in production environment
image: /cdn/monitor-logs-in-telescope-in-production-environment-in-laravel.png
categories: [Laravel]
---

The [Laravel Telescope](https://laravel.com/docs/8.x/telescope) package is great for debugging your application when you're working on your application in the `local` environment. It provides insight into the requests coming into your application, exceptions, log entries, database queries, queued jobs, mail, notifications, cache operations, scheduled tasks, variable dumps, and various other things in this beautiful interface.

![](/images/laravel-telescope.png)

Now all this is great but if you want to use Telescope in your `production` environment, there are some restrictions. For instance, you can *only* monitor exceptions, failed jobs, scheduled tasks, and data with monitored tags in environments other than `local`.

This is due to the fact of how things are being handled in the `TelescopeServiceProvider`'s `register()` method.

```php
public function register()
{
    $this->hideSensitiveRequestDetails();

    Telescope::filter(function (IncomingEntry $entry) {
        if ($this->app->environment('local')) {
            return true;
        }

        return $entry->isReportableException() ||
            $entry->isFailedJob() ||
            $entry->isScheduledTask() ||
            $entry->hasMonitoredTag();
    });
}
```

As you can see, there are a bunch of `or` conditions applied in `Telescope::filter` for environments other than `local` which restricts Telescope to monitor only a handful of things in, let's say, the `production` environment.

For instance, if you want to monitor [logs](https://laravel.com/docs/8.x/logging) using the current configuration, you can't do so. But there's a work around to this.

## Tweak the `register()` method

To start monitoring logs in the `production` environment, all you will need to do is add an additional condition `$entry->type === EntryType::LOG` in the group of existing conditions in the `register()` method of the `TelescopeServiceProvider` like so.

```php
use Laravel\Telescope\EntryType;

return $entry->isReportableException() ||
                   $entry->isFailedRequest() ||
                   $entry->isFailedJob() ||
                   $entry->isScheduledTask() ||
                   $entry->hasMonitoredTag() ||
                   $entry->type === EntryType::LOG;
```

As you can see, this condition checks if the `type` of `Laravel\Telescope\IncomingEntry` is `log` and this will allow Telescope monitor logs. Also, note that you'll need to import the `Laravel\Telescope\EntryType` class as well.

And that's it! This will let the Telescope monitor [logs](https://laravel.com/docs/8.x/logging) in the `production` environment as well. So, you'll be able to see all the log messages getting logged at `http://yourapp.com/telescope/logs`.
