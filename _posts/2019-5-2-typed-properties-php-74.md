---
layout: post
title: PHP 7.4 will support first-class property type declarations
categories: [PHP]
---

With the [introduction](https://www.php.net/manual/en/migration70.new-features.php) of scalar type declaration and return type declarion in PHP 7.0, the language's type system got improved at some extent. Although it's great to have some layer of strictness, it's still missing the support to declare typed properties. But from PHP 7.4, it seems, it's going to change because according to [this accepted RFC](https://wiki.php.net/rfc/typed_properties_v2), PHP 7.4 will be getting support for first-class property type declarations.

Without the typed properties, you have to use getter and setter methods in order to enforce strict types on the class properties like below:

```php
class Post 
{    
    private $id;

    private $title;
 
    public function __construct(
        int $id, 
        string $title
    ) 
    {
        $this->id = $id;
        $this->title = $title;
    }
 
    public function getId(): int 
    {
        return $this->id;
    }

    public function setId(int $id): void 
    {
        $this->id = $id;
    }
 
    public function getName(): string 
    {
        return $this->name;
    }

    public function setName(string $name): void 
    {
        $this->name = $name;
    }
}
```

But with the introduction of typed properties, you'll no longer require additional methods just to ensure the type-safety of properties. This means writing less code and more performance gain. The above code would be reduced to this without loosing type-safety of the properties:


```php
class Post 
{    
    private int $id;

    private string $title;
 
    public function __construct(
        int $id, 
        string $title
    ) 
    {
        $this->id = $id;
        $this->title = $title;
    }
}
```

Learn more about this here: https://wiki.php.net/rfc/typed_properties_v2