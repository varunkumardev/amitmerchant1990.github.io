---
layout: post
title: Null coalescing assignment operator in PHP
image: /cdn/null-coalescing.png
categories: [PHP]
---

When PHP 7.0 [released](https://www.php.net/manual/en/migration70.new-features.php), it has added many nice things in PHP's toolbelt of utilities. One of the things among this was *Null coalescing assignment operator (??)*.

So basically, the operator can be used for the scenarios where you need to check if the variable is set or not before assigning it to an another variable. For instance, check the following code which you might be writing pre PHP 7.0 era.

```php
<?php
// Pre PHP 7.0

$user = [
    'name' => 'Amit', 
    'job' => 'Developer'
];


if (!isset($user['job'])) {
    $user['job'] = 'Blogger'; 
}

print_r($user);
//Array([name] => Amit [job] => Developer)
```

The above code code can be reduced to following in PHP 7.0 by using null coalescing assignment operator like so.

```php
<?php
// From PHP 7.0

$user = [
    'name' => 'Amit'
];

$user['job'] = $user['job'] ?? 'Blogger'; 

print_r($user);
//Array([name] => Amit [job] => Blogger)
```

Essentially, the null coalescing assignment operator returns its first operand if it exists and is not `NULL`; otherwise it returns its second operand.

You can further make it more tidier by writing it as short-hand version like so.

```php
$user['job'] ??= 'Blogger'; 
```

As you can see in the example above, it’s now matter of just one line when you need to accomplish something like above. Looks pretty neat and clean, no?
