---
layout: post
title: How to upgrade legacy codebase to use PHP 8.0 features using Rector
image: /cdn/how-to-upgrade-application-codebase-to-use-PHP-8-features-rector.png
categories: [PHP]
---

The newest version of PHP, the PHP 8.0, is coming later this year (November 26, 2020) and it will come packed with many new features such as [constructor property promotion](/constructor-property-promotion-php8/), [match expressions](/match-expression-alternative-switch-statement-php8/), [nullsafe operator](/nullsafe-operator-php/), [attributes](/how-to-use-php-80-attributes/) and a lot others.

If you're planning to upgrade your existing app to PHP 8.0, you've come to the right place where we'll be looking at how you can automatically upgrade your codebase to use these shiny new features of PHP 8.0... the easy way.

There is an open-source library called [Rector](https://github.com/rectorphp/rector) which can help you upgrade your legacy codebase to the newest versions of PHP in a cinch!

In this article, I'll just focus on how you can upgrade your legacy codebase to PHP 8.0. So, stick along.

## Installing Rector

First and foremost, you'll need to install Rector as a development dependency in your project. Install it using the following command.

```bash
$ composer require rector/rector --dev
```

This will install rector in your project and next, you'll need to configure it.

## Configuring Rector

Now, before start upgrading, first, you'll need to configure Rector. To do so, generate a `rector.php` file using the following command.

```bash
$ vendor/bin/rector init
```

This will generate a `rector.php` config file in your project root with some [pre-defined configuration](https://github.com/rectorphp/rector#running-rector) like so.

![](/images/rector-init.png)

## Setting PHP 8.0 Rule Sets

Rector uses something called [rules](https://github.com/rectorphp/rector/blob/master/docs/rector_rules_overview.md) to upgrade the PHP codebase. These ranges from framework-specific rules to different PHP version specific rules.

We'll update the `rector.php` to use [PHP 8.0 specific rule sets](https://github.com/rectorphp/rector/blob/master/config/set/php80.php). To do so, replace the content of `rector.php` content with the following.

```php
<?php

declare(strict_types=1);

use Rector\Php80\Rector\Catch_\RemoveUnusedVariableInCatchRector;
use Rector\Php80\Rector\Class_\AnnotationToAttributeRector;
use Rector\Php80\Rector\Class_\ClassPropertyAssignToConstructorPromotionRector;
use Rector\Php80\Rector\Class_\StringableForToStringRector;
use Rector\Php80\Rector\FuncCall\ClassOnObjectRector;
use Rector\Php80\Rector\FuncCall\TokenGetAllToObjectRector;
use Rector\Php80\Rector\FunctionLike\UnionTypesRector;
use Rector\Php80\Rector\Identical\StrEndsWithRector;
use Rector\Php80\Rector\Identical\StrStartsWithRector;
use Rector\Php80\Rector\NotIdentical\StrContainsRector;
use Rector\Php80\Rector\Switch_\ChangeSwitchToMatchRector;
use Rector\Php80\Rector\Ternary\GetDebugTypeRector;
use Symfony\Component\DependencyInjection\Loader\Configurator\ContainerConfigurator;

return static function (ContainerConfigurator $containerConfigurator): void {
    $services = $containerConfigurator->services();

    $services->set(UnionTypesRector::class);

    $services->set(StrContainsRector::class);

    $services->set(StrStartsWithRector::class);

    $services->set(StrEndsWithRector::class);

    $services->set(StringableForToStringRector::class);

    $services->set(AnnotationToAttributeRector::class);

    $services->set(ClassOnObjectRector::class);

    $services->set(GetDebugTypeRector::class);

    $services->set(TokenGetAllToObjectRector::class);

    $services->set(RemoveUnusedVariableInCatchRector::class);

    $services->set(ClassPropertyAssignToConstructorPromotionRector::class);

    $services->set(ChangeSwitchToMatchRector::class);
};
```

## Start upgrading to PHP 8.0

Once the required configuration is done, you're ready to start upgrading to PHP 8.0. 

For instance, let's say I have this following file `Test.php` in the `src` folder which uses older features like so.

```php
<?php

class Test
{
    private string $name;
    private string $author;

    // This should get converted to using
    // constructor propery promotion
    public function __construct(
        string $name = 'The Alchemist', 
        string $author = 'Paulo Coelho'
    ) {
        $this->name = $name;
        $this->author = $author;
    }

    public function usePromises()
    {
        $fruit = 'apple';

        // This should get converted
        // to use match expressions
        switch ($fruit) {
            case 'apple':
                $finalFruit = 'i is apple';
                break;
            case 'cake':
                $finalFruit = 'i is cake';
                break;
            default:
                $finalFruit = 'i is pizza';
                break;
        }

        return $finalFruit;
    }

    public function run()
    {
        // This should get converted 
        // to use non-capturing exceptions
        try {
            throw new \Exception('foo!');
        } catch (\Exception $e) {
            echo "Exception occurred";
        } 
    }
}
```

Now, to see what Rector will update in this code, you can `dry-run` Rector which will show you a diff of files that it would change. To do so, run the following command.

```bash
$ vendor/bin/rector process src --dry-run
```

Here `src` is the folder that you want to be analyzed by Rector. Once run, the command will show diff and all the rules it used like so.

![](/images/rector-dry-run.png)

![](/images/rector-applied-rules.png)

If you're satisfied with all the changes, you can finally apply all changes in real by dropping `--dry-run` from the previous command and run it like so.

```bash
$ vendor/bin/rector process src
```

And this will change the `Test.php` file to the following state which is using all the PHP 8.0 features. i.e constructor property promotion, match expressions, and non-capturing exception catches.

```php
<?php

class Test
{
    public function __construct(
        private string $name = 'The Alchemist', 
        private string $author = 'Paulo Coelho'
    ){
    }

    public function usePromises()
    {
        $fruit = 'apple';

        $finalFruit = match ($fruit) {
            'apple' => 'i is apple',
            'cake' => 'i is cake',
            default => 'i is pizza',
        };

        return $finalFruit;
    }

    public function run()
    {
        try {
            throw new \Exception('foo!');
        } catch (\Exception) {
            echo "Exception occurred";
        } 
    }
}
```

And that's how you can upgrade any codebase to PHP 8.0 just like that!
