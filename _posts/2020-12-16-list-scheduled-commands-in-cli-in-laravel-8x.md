---
layout: post
title: List scheduled commands in CLI in Laravel 8.x
image: /cdn/list-scheduled-commands-in-cli-in-laravel-8x.png
categories: [Laravel]
fluidbox: true
---

Sometimes, it would be convenient if you get details regarding things right in your terminal. Take for instance, all your scheduled commands that you have defined in your application's `App\Console\Kernel` class' `schedule` method like so.

```php
/**
 * Define the application's command schedule.
 *
 * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
 * @return void
 */
protected function schedule(Schedule $schedule)
{
    $schedule->command('emails:send Amit --force')->daily();
    $schedule->exec('node /home/forge/script.js')->daily();
}
```

Wouldn't it be nice if you could get the an overview of your [scheduled tasks/commands](https://laravel.com/docs/8.x/scheduling#scheduling-artisan-commands) and the details of when they are schduled to run next time, right into your terminal/CLI? Yes, right?

Well, the recent minor release of Laravel has just got that.

## The `schedule:list` commmand

[This PR](https://github.com/laravel/framework/pull/35574) in Laravel [v8.19.0](https://github.com/laravel/framework/releases/tag/v8.19.0) has added a handy `schedule:list` Artisan command that can give an overview of your scheduled tasks and the next time they are scheduled to run.

For instance, when you run `php artisan schedule:list` in the console, it will list down all the scheduled commands in a tabular form like so.

[![](/images/schedule-list-laravel.png)](/images/schedule-list-laravel.png)

As you can tell, the command reveals important information about the commands, their configuration and the next due to run in a nice tabular form.