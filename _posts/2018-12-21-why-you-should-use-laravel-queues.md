---
layout: post
title: Why you should use Laravel Queues
categories: [PHP, Laravel]
---

There comes times when you wouldn't want your end users staring at white screens or that intimidating loaders for a long time. For instance when user registers to your site, you must have configured your website to send a welcome email or a confirmation email upon registering. So, that operation should be snappy and for that purpose you'd actually want to reduce the amount of time your app takes while sending the email to the user. [Laravel Queues](https://laravel.com/docs/5.7/queues) comes to the recue for achieving such kind of time consuming tasks.

## What are Laravel Queues?

> Laravel queues provide a unified API across a variety of different queue backends, such as Beanstalk, Amazon SQS, Redis, or even a relational database. Queues allow you to defer the processing of a time consuming task, such as sending an email, until a later time. Deferring these time consuming tasks drastically speeds up web requests to your application.

So, what Laravel Queues basically does is, it stacks up time consuming tasks, create their jobs and dispatches them when they are intended to be. This way the user won't notice lag in their overall experience when performing such time consuming operation.

The queue configuration file is stored in `config/queue.php`. In this file you will find connection configurations for each of the queue drivers that are included with Laravel, which includes a database, [Beanstalkd](https://kr.github.io/beanstalkd/), [Amazon SQS](https://aws.amazon.com/sqs/), [Redis](http://redis.io/), and a synchronous driver that will execute jobs immediately (for local use). A null queue driver is also included which simply discards queued jobs.

Let's take a practical example to learn more about Laravel Queues.

{:.you-may-like}
> You may also like: [Re-using query constraints in Laravel Eloquent - Global vs. Local scopes](/laravel-eloquent-global-local-scope/)

## Send an email when user registers

Here in this example, We'll create a queue for sending a welcome email when a user register onto the site. We're going to use `database` queue driver for creating jobs in this case. For this, first of all we need to create a database table which will hold jobs that are going to be created. To generate a migration that creates this table, run the `queue:table` Artisan command. Once the migration has been created, you may migrate your database using the `migrate` command:


```bash
php artisan queue:table

php artisan migrate
```

This will create a table named "jobs" of the following strucure:

``` 
CREATE TABLE  `databaseName`.`jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8_unicode_ci NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_reserved_reserved_at_index` (`queue`,`reserved`,`reserved_at`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
```

## Create a `Mailable` class 

Now, we'll create a mailable class which will be used to send emails. The mailable class is responsible for sending emails using a mailer that's configured in the config/mail.php file. In fact, Laravel already provides an artisan command that allows us to create a base template.

```bash
php artisan make:mail SendEmail
```

That should create a blank email template at `app/Mail/SendEmail.php`, as shown in the following snippet.

```php
namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct()
    {


    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.test');
    }
}
```

## Create a queue job

After this, we'll need to generate a queue job class for sending the register email. We'll use following artisan command that will create queue job file with Queueable.

```bash
php artisan make:job SendRegisterEmail
``` 

This command will create a `SendRegisterEmail.php` file under "Jobs" directory.

`app/Jobs/SendRegisterEmail.php`

```php
namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use App\Mail\SendEmail;
use Mail;

class SendRegisterEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $email = new SendEmail();
        Mail::to($this->details['email'])->send($email);
    }
}
```

Now, we can utilize this job to send an email when user registers. For this, let's create a simple route:

```php
Route::get('email-test', function(){
	$user['email'] = 'test@test.com';

    dispatch(new App\Jobs\SendRegisterEmail($user));
});
```

As you can see above, in order dispatch the created job we need to use `dispatch` helper. The only argument you need to pass to the `dispatch` helper is an instance of the job.

You can even delay the dispatching of the job by using the `delay` method on your job instance. The delay method is provided by the `Illuminate\Bus\Queueable` trait, which is included by default on all generated job classes. For example, let's specify that a job should not be available for processing until 10 minutes after it has been dispatched. You can achieve same thing like below:

```php
Route::get('email-test', function(){
	$user['email'] = 'test@test.com';

    $job = (new App\Jobs\SendRegisterEmail($user))
                    ->delay(Carbon::now()->addMinutes(10));

    dispatch($job);
});
```

## In closing

Laravel Queues are extremely powerful. One such task where you can utilize Queues is when users want to generate reports and send them via mail. If used concisely, Queues turned out to be a great tool to accomplish time heavy tasks. But sometimes if used poorly, they can be an overkill.
