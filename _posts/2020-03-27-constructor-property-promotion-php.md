---
layout: post
title: Constructor property promotion could be coming to PHP
image: /cdn/constructor-property-promotion.png
categories: [PHP]
---

Have you ever felt the class properties that you're using in the constructor are essentially repeated multiple times? i.e At the declaration, in the constructor parameters and while doing assignment in the constructor. For instance, take the following example.

```php
<?php

class User 
{
  private int $id;
  private string $name;

  public function __construct(
    int $id,
    string $name,
  ) {
    $this->id = $id;
    $this->name = $name;
  }
}

?>
```

As you can see, we've been repeating the properties `$id` and `$name` multiple times in the few lines of code. That is simply too much of a boilerplate code, right? This can be simplified. How, you ask?

Well, there's this [RFC](https://wiki.php.net/rfc/constructor_promotion) in PHP which, if approved, can make the above code really shorter. The mechanism which is discussed in the RFC is called **"Constructor property promotion"**.

## Constructor Property Promotion

Essentially, the [said RFC](https://wiki.php.net/rfc/constructor_promotion) proposes to introduce a short hand syntax, which allows combining the definition of properties and the constructor. This is in fact inspired by a similar language called [Hack](https://docs.hhvm.com/hack/classes/constructors#constructor-parameter-promotion).

Here's how the previous example could be written using constructor property promotion.

```php
<?php

class User 
{
  public function __construct(
    private int $id,
    private string $name,
  ) {
    //
  }
}

?>
```

As you can see, all we have to do here is put a visibility modifier in front of the constructor parameter and everything else in the previous example is done automatically, including the actual creation of the property. This approach makes the code less complicated and less prone to the errors.

You'll still be able to use the current method of declaring properties like we're doing from all these years like so.


```php
<?php

class User 
{
    private string $email;

    public function __construct(
        private int $id,
        private string $name,
        string $email
    ) {
        $this->email = $email;
    }
}

?>
```

There will, however, be a few contriants on using this method. For instance,

- You'll be able to use this in constructors only. No method property promotion is allowed.
- Not applicable to `abstract` contructors.
- Properties of type `callable` can not be used for property promotion.
- [Nullable types](https://www.amitmerchant.com/nullable-types-php71/) can not be used for property promotion.

You can read more about the RFC [here](https://wiki.php.net/rfc/constructor_promotion).