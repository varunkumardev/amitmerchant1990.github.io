---
layout: post
title: Match expression - An alternative to switch statement in PHP 8
image: /cdn/match-expression-alternative-switch-statement-php8.png
categories: [PHP]
---

The [switch statement](https://www.php.net/manual/en/control-structures.switch.php) in PHP is great when you want check condition on the same expression without incorporating many `if` statements altogether.

This is a basic *if-else* comparison on a same expression.

```php
<?php

if ($i == 'apple') {
    echo 'i is apple';
} elseif ($i == 'cake') {
    echo 'i is cake';
} else {
    echo 'i is pizza';
}
```

And this how the equivalent `switch` statement of previous example would look like

```php
<?php

switch ($i) {
    case 'apple':
        echo 'i is apple';
        break;
    case 'cake':
        echo 'i is cake';
        break;
    default:
        echo 'i is pizza';
}
```

Now, this looks fine in comparison to the *if-else* statement as you don't have to explicitly compare the expression explicitly. But it's still sort of verbose and PHP 8 wants to change that using **"Match expression"**.

## Match expression

An alternative for `switch` statement called "Match expression" has been accepted in [this RFC](https://wiki.php.net/rfc/match_expression_v2).

From the RFC...

> The RFC proposes adding a new match expression that is similar to switch but with safer semantics and the ability to return values.

So, if we want to rewrite the previous example using match expression, it would look like so.

```php
<?php

echo match ($i) {
    'apple' => 'i is apple',
    'cake' => 'i is cake',
    default => 'i is pizza',
};
```

As you can see, the match expression has made the code quite compact and concise as opposed to `switch` statement. Apart from this visual benefit, match expression has many other benefits over `switch` statement.

### Strict comparison

As opposed to `switch` statement, the match expression uses strict comparison (===). So, following example with `switch` statement...

```php
switch ('foo') {
    case 0:
      $result = "Oh no!\n";
      break;
    case 'foo':
      $result = "This is what I expected\n";
      break;
}
echo $result;
//> Oh no!
```

...Would return from `case 0` as it would compare `'foo' == 0`. The similar example with match expression would work just as expected.

```php
echo match ('foo') {
    0 => "Oh no!\n",
    'foo' => "This is what I expected\n",
};
//> This is what I expected
```

### No issue of forgetting 'break'

The `switch` fallthrough has been a large source of bugs in many languages. Each case must explicitly break out of the switch statement or the execution will continue into the next case even if the condition is not met.

```php
switch ($pressedKey) {
    case Key::RETURN_:
        save();
        // Oops, forgot the break
    case Key::DELETE:
        delete();
        break;
}
```

The match expression resolves this problem by adding an implicit break after every arm.

```php
match ($pressedKey) {
    Key::RETURN_ => save(),
    Key::DELETE => delete(),
};
```

### Multiple comma-separated conditions

Multiple conditions can be comma-separated to execute the same block of code.

```php
echo match ($x) {
    1, 2 => 'Same for 1 and 2',
    3, 4 => 'Same for 3 and 4',
};
```

## No need to return value from each cases

Using match expression, it's no longer needed to return values from each cases. So, where you'd need to store a value in each case like so...

```php
switch (1) {
    case 0:
        $result = 'Foo';
        break;
    case 1:
        $result = 'Bar';
        break;
    case 2:
        $result = 'Baz';
        break;
}
```

...Would get simplified with match expression.

```php
echo match (1) {
    0 => 'Foo',
    1 => 'Bar',
    2 => 'Baz',
};
//> Bar
```

## Caveat

There is one caveat with match caveat right now and that, as you may probably guessed, is it would only be used with one-liner results. So, the cases when you'd want to use multiple line case blocks, you'd need to stick to switch statement.

You can learn more about the feature [here](https://wiki.php.net/rfc/match_expression_v2).