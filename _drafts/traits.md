## Interesting aspects of using Traits in PHP

Traits in PHP is a way of re-using the code. Basically, Traits are assitive copy-paste mechanism provided by the language itself. Using Traits, developers can reduce the limitations of single inheritence based languages such as PHP. I have written a dedicated article about it if you want to check it out.

Here in this article, I want to talk about a few interesting things about Traits which I think is useful if you work with Traits regularly.

# Use of `use` is different for Traits

Normally, When used for namespaces, the "use" keyword treats the argument as an absolute path. So, take following for example.

```php
<?php

namespace Foo\Bar;
use Foo\TestClass;

?>
```

Here, `use` will load the entire `\Foo\TestClass` (the initial `\` is optional) class as an absole path. But in case of Traits, the `use` keyword will treat the argument relative to the current namespace. Take following for example.

```php
<?php

namespace Amit\Module;

class SomeClass 
{
    use Foo\SomeTrait;   // This will be \Amit\Module\Foo\SomeTrait
}

?>
```

In the example above, the `use` keyword will treat the Trait in question as `\Amit\Module\Foo\SomeTrait`.

