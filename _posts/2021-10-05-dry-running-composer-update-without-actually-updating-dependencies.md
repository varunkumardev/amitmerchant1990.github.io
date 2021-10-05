---
layout: post
title: Dry running Composer update without actually updating dependencies
image: /cdn/dry-running-composer-update-without-actually-updating-dependencies.png
categories: [Composer]
fluidbox: true
---

It would always be a good idea to cross-verify/confirm a destructive action before you actually perform it. For instance, while giving users the ability to delete something important, let's say the user account, it's a good idea to present them a confirmation popup before he/she deletes the account permanently.

Similarly, the `composer update` is one such action. While it's not so destructive to update the dependencies, it's always good to have the ability to check what would get updated when you run the command because, in some situations, you might not want to update some of the dependencies.

And that's when this handy option called `--dry-run` in [Composer](https://getcomposer.org/) comes to the rescue.

## The `--dry-run` option

Thanks to [this tweet](https://twitter.com/PovilasKorop/status/1444900602182606849?s=20) by Povilas Korop, today I got to know about this `--dry-run` option, which when run along with the `composer update` command, will simulate the command without actually updating the dependencies.

```bash
$ composer update --dry-run
```

When run, you will see all the dependencies being updated just like you would see when you run the `composer update` command. The only difference is it's just a visual cue of which package will get updated to which version without the actual dependency updation.

Here's how it would look like.

[![Dry running composer update](/images/dry-run-composer-update.png)](/images/dry-run-composer-update.png)

As you can tell, it looks exactly like how you would see when `composer update` is run. But under the hood, nothing has been updated.

Apart from this, you can also use the `--dry-run` option with `composer install` to dry running installation of Composer dependencies!