---
layout: post
title: Get up and running with Laravel blazing fast using Sail 
image: /cdn/get-up-and-running-with-laravel-really-fast-using-sail.png
categories: [Laravel]
---

Imagine you just bought a new computer and the next thing you want to do is create a brand new Laravel application in your brand new machine.

The usual way to do this is to install a server (Apache or Nginx) PHP, MySQL, and a lot of other software yourself. Not to forget a lot of required [PHP extensions](https://www.php.net/manual/en/extensions.alphabetical.php) as well. That's a lot of work do to if you ask me. On top of this, if you are stuck somewhere in this process, god saves you!

To remove this overhead, Taylor Otwell has just released a brand new command-line interface called Sail for Laravel.

## What is Sail?

Quoting the [official documentation](https://laravel.com/docs/8.x/sail)...

> Laravel Sail is a light-weight command-line interface for interacting with Laravel's default [Docker](https://www.docker.com/) development environment.

In a nutshell, Sail is just a convenient interface to interact with the Docker container that runs a Laravel application.

Sail provides an easy way to get started with Laravel without all the overhead I mentioned previously. The good thing about this is even though Sail is built on top of Docker, you wouldn't require prior Docker experience.

## Get started with Sail

Sail comes bundled with all new Laravel applications so you may start using it immediately. 

To get started with it, the only requirement is you should have [Docker Desktop](https://www.docker.com/products/docker-desktop) on your (macOS and Linux) machine and you are good to go!

> **Note:** Using Sail on Windows machine requires slightly tweaked workflow. You can check it out [here](https://laravel.com/docs/8.x/installation#getting-started-on-windows).

Next, you can create a new Laravel application with Sail using the following command.

```bash
$ curl -s https://laravel.build/example-app | bash
```

Once run, the command will create a new Laravel application in a directory named "example-app". You can change the name of the application by replacing "example-app" with your desired name in the URL above.

After the project has been created, you can navigate to the application directory and start Sail using the following command.

```bash
$ cd example-app

$ ./vendor/bin/sail up
```

Running this command the first time will build application containers on your machine. So, it might take a while. The subsequent attempts to start Sail will be much faster.

Once the application's Docker containers have been started, you can access the application in your web browser at: [http://localhost](http://localhost/).

And that's about it! You have your brand new Laravel application running without a lot of fuss.

## Starting and stopping Sail

We have seen the `sail up` command to start Docker containers but you can also start all of the Docker containers in the background. To do this, you may start Sail in "detached" mode like so.

```bash
$ ./vendor/bin/sail up -d
```

To stop all of the containers, you may simply press Control + C to stop the container's execution. Or, if the containers are running in the background, you may use the `down` command like so.

```bash
$ ./vendor/bin/sail down
```

## In closing

Since Sail is just Docker, you can customize nearly everything about it. To do so, you can customize the `docker-compose.yml` file that is stored at the root of your project.

Apart from this, using Sail, you can [run various commands](https://laravel.com/docs/8.x/sail#executing-sail-commands) against your application such as arbitrary PHP commands, Artisan commands, Composer commands, and Node / NPM commands. You can [run tests](https://laravel.com/docs/8.x/sail#running-tests), [interact with databases](https://laravel.com/docs/8.x/sail#interacting-with-sail-databases), redis and a lot of [other things](https://laravel.com/docs/8.x/sail#previewing-emails).

You can learn about Sail further at its [official documentation](https://laravel.com/docs/8.x/sail).