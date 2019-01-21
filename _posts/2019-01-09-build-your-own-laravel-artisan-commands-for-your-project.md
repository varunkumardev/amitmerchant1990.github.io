---
layout: post
title: Build your own Laravel artisan commands for your project
categories: [PHP, Laravel]
---

When working on a project, there comes a time when you need to automate certain tasks. In such cases, it is better to use a CLI tool which can be run from the command prompt because using a web APIs for certain tasks is cumbersome. 

Laravel comes with its [Artisan](https://laravel.com/docs/5.7/artisan) CLI tool shipped with the commands that can assist you while you build your application. Under the hood, Artisan's [Command](https://github.com/laravel/framework/blob/5.4/src/Illuminate/Console/Command.php) is using [Symphony command](https://github.com/symfony/symfony/blob/4.2/src/Symfony/Component/Console/Command/Command.php), with some added conveniences and shortcuts. 

Laravel Artisan ships with the commands which can be useful to generate models, controllers, middleware, test cases, and many other types of files for the framework. To view a list of all available Artisan commands, you may use the list command:

```bash
$ php artisan list
```

## Writing your own Laravel commads

Laravel is providing almost all the commands which you'll require in your development workflow, which is great. But if you want, you can also create your own customized Artisan commands in Laravel as per your project needs. 

Let's take an example where you need to send a new year email to all your users on the new year day. You can utilize a custom Artisan command in this case. First of all, we’ll create a mailable class which will be used to send emails. The mailable class is responsible for sending emails using a mailer that’s configured in the `config/mail.php` file. In fact, Laravel already provides an artisan command that allows us to create a base template.

```bash
$ php artisan make:mail SendEmail
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

Now, we'll generate an Artisan command that will be used to send an email to all the users of the `User` collection. For that, you need to use the `make:command` Artisan command. This command will create a new command class in the `app/Console/Commands` directory. The generated command will include the default set of properties and methods that are present on all commands:

```bash
php artisan make:command SendNewYearEmail
```

This command creates a class in the `app/Console/Commands/SendNewYearEmail.php` file. If you open the file, you will see the `$signature` and the `$description` properties, and a handle() method that is the body of your console command.

Let's make changes into the file to look like below:

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class SendNewYearEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendnewyearemail';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send an email to all the users';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
    }
}
```

Here, `$signature` and `$description` properties of the class will be used when displaying your command on the list screen. The `handle` method will be called when your command is executed. You may place your command logic in this method.

Next, register the command in the `app/Console/Kernel.php` file:

```php
protected $commands = [
    Commands\SendNewYearEmail::class,
];
```

Now, all that is left is to implement the logic to send the email to the users which we'll write in `handle` method. For this, first, we'll fetch all the users and loop over them to send them email individiually. To send email, we'll be using the `SendMail` class that we've created earlier. 

```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Mail\SendEmail;
use Mail;

class SendNewYearEmail extends Command
{

    // commented for brevity

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Started sending emails...');

        $users = User::all();

        $email = new SendEmail();

        foreach($users as $user)
        {
            Mail::to($user->email)->send($email);
        }

        $this->info('Email sent to all the users!');
    }
}
```

As you can see above, to send output to the console, use the `line`, `info`, `comment`, `question` and `error` methods. Each of these methods will use appropriate ANSI colors for their purpose. Here in this case, the `info` method will display in the console as green text.

Now, all you need to fire the following artisan command to serve the purpose of the same:

```bash
$ php artisan sendnewyearemail
```

Additionally, you can also gather user input or provide arguments to the command. The `signature` property allows you to define the name, arguments, and options for the command in a single, expressive, route-like syntax. For instance, let's provide an option to the command which will only send email to the active users. So, our `signature` property will be like below:

```php
/**
 * The name and signature of the console command.
 *
 * @var string
 */
protected $signature = 'sendnewyearemail {--active}';
```

And you can utilize `active` option in the `handle` method using `option` method:

```php
/**
 * Execute the console command.
 *
 * @return mixed
    */
public function handle()
{
    $this->info('Started sending emails...');

    if ($this->option('active')) {
        $users = User::Where('active', '=', '1')->get();
    } else {
        $users = User::all();
    }

    $email = new SendEmail();

    foreach($users as $user)
    {
        Mail::to($user->email)->send($email);
    }

    $this->info('Email sent to all the users!');
}
```

## Conclusion

There are a lot of things you can achieve using Artisan commands. As shown in the above tutorial, you can automate things like sending email with just one command. The possibilities are endless. Let me know if you need any corrections or improvements in the article in comments below or you can just send me a PR by modifying [this file](https://github.com/amitmerchant1990/amitmerchant1990.github.io/blob/master/_posts/2019-01-09-build-your-own-laravel-artisan-commands-for-your-project.md).
