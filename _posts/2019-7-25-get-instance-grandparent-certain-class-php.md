---
layout: post
title: Get grandparent instance of certain class in PHP
categories: [PHP]
---

Recently, I stumbled upon a scenario where I had to extend a class. Let's say the class I was extending was `Acme\Core\App\Item` into `Amit\Core\App\Item`. And `Acme\Core\App\Item` was eventually extending a class `Magento\Backend\Block\Widget\Grid\Extended`. 

Now, `Acme\Core\App\Item` has a protected method called `_prepareColumns()` which I'm overriding into `Amit\Core\App\Item`. But the thing here is, `_prepareColumns()` of class `Acme\Core\App\Item` is calling a parent class' function (i.e. `Magento\Backend\Block\Widget\Grid\Extended`) `_prepareColumns()` using keyword `parent`.

```php  
namespace Acme\Core\App

class Item extends \Magento\Backend\Block\Widget\Grid\Extended
{
    protected function prepareColumns()
    {
        // code commmented for brevity
        return parent::_prepareColumns();
    }
}
```

I had to somehow utilize that method in my method which I had overrided earlier. But, I could not use `parent` because that would simply through a fatal error because there exists no method called `_prepareColumns()` in class `Acme\Core\App\Item`.

```php  
namespace Amit\Core\App

class Item extends \Acme\Core\App\Item
{
    protected function prepareColumns()
    {
        // code commmented for brevity
        return parent::_prepareColumns(); // Results in a fatal error
    }
}
```

Turn out, in such scenario you need to use call the grandparent of the class instead of using `parent::`. But how? Take the short method I wrote to figure it out.

```php
/**
 * Get the grand parent class of the specified class
 *
 * @param $currentClass
 * @return string
*/
private function get_grandparent_class($currentClass)
{
    if (is_object($currentClass)) {
        $currentClass = get_class($currentClass);
    }

    return get_parent_class(get_parent_class($currentClass));
}
```

As you can see, the method actually returns us the instance of the grandparent class of `Amit\Core\App\Item` class which is the instance of `Magento\Backend\Block\Widget\Grid\Extended` which we intend to get eventually. And now we can use this instance instead of `parent::` in above code.

```php  
namespace Amit\Core\App

class Item extends \Acme\Core\App\Item
{
    protected function prepareColumns()
    {
        // code commmented for brevity
        $grandparent = $this->get_grandparent_class($this);
        return $grandparent::_prepareColumns(); // This will work fine now.
    }

    /**
     * Get the grand parent class of the specified class
     *
     * @param $currentClass
     * @return string
    */
    private function get_grandparent_class($currentClass)
    {
        if (is_object($currentClass)) {
            $currentClass = get_class($currentClass);
        }

        return get_parent_class(get_parent_class($currentClass));
    }
}
```
