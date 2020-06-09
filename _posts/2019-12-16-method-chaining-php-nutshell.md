---
layout: post
title: Method chaining in PHP in a nutshell 
image: /cdn/method-chaining-php.png
categories: [PHP]
---

In this short article, I'm going to explain what method chaining is and how it can prove to be useful as an object oriented design pattern.

---

If you have ever worked with popular PHP frameworks, such as Laravel or CodeIgniter, you've surely come across the following pattern of writing APIs.

```php
$user = DB::table('users')->where('name', 'John')->first();
```

As you can see in the above example, this is how you can retrieve a single row/column from a table in Laravel. Notice how the method names(`where`, `first`) are chained together to obtain the final result. This is a method for designing object-oriented APIs, called [Fluent Interface](https://en.wikipedia.org/wiki/Fluent_interface).

Fluent Interfaces implements method chaining by returning the class instance from each method that needs to be chained. In PHP, we can achieve this by returning `$this` from the class methods. Let's understand how method chaining is useful by first looking at the example without method chaining and then after with method chaining.

## Without method chaining

```php
<?php

class Book
{
    private string $name;
    private string $author;

    public function setName(string $name)
    {
        $this->name = $name;

        return $this->name;
    }

    public function setAuthor(string $author)
    {
        $this->author = $author;

        return $this->author;
    }

    public function __toString()
    {
        $bookInfo = 'Book Name: ' . $this->name . PHP_EOL;
        $bookInfo .= 'Book Author: ' . $this->author . PHP_EOL;

        return $bookInfo;
    }
}

$book = new Book();

$book->setName('Harry Potter');
$book->setAuthor('J. K. Rowlings');

echo $book;

// Book Name: Harry Potter
// Book Author: J. K. Rowlings
```

As you can see above, after setting the values to the class properties, we're returning those itself. But here, while setting properties from the object instance, this unnecessarily increases the amount of code needed when interacting with a class or an instance of a class. Let's see how we can optimize this by applying method chaining to the same example.

## With method chaining

```php
<?php

class Book
{
    private string $name;
    private string $author;

    public function setName(string $name)
    {
        $this->name = $name;

        return $this;
    }

    public function setAuthor(string $author)
    {
        $this->author = $author;

        return $this;
    }

    public function __toString()
    {
        $bookInfo = 'Book Name: ' . $this->name . PHP_EOL;
        $bookInfo .= 'Book Author: ' . $this->author . PHP_EOL;

        return $bookInfo;
    }
}

$book = new Book();

$book->setName('Harry Potter')->setAuthor('J. K. Rowlings');

echo $book;

// Book Name: Harry Potter
// Book Author: J. K. Rowlings
```

As you can see, by returning `$this` from the class methods after setting class properties, we've now achieved method chaining which can be used on the object instance, which not only reduces the amount code needed but also improved the readability of the code. It's terse, yet allows you to put more into a single line elegantly. Method chaining also allows for [DRY](http://en.wikipedia.org/wiki/Don%27t_repeat_yourself) approach. 

Another advantage of using method chaining is it's a top-down approach with arguments placed next to the function unlike the nested calls, where tracking down respective function calls to its arguments is demanding.

As for the practical use of method chaining, you would find it in [ CodeIgniter's Active Record use:](http://codeigniter.com/user_guide/database/active_record.html)

```php
$this->db->select('something')->from('table')->where('id', $id);
```

The above looks much cleaner than 

```php
$this->db->select('something');
$this->db->from('table');
$this->db->where('id', $id);
```