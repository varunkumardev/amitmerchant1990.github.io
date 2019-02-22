---
layout: post
title: Get all admin users as an array in Magento 2
categories: [PHP, Magento2]
---

Today, while working with a project which happens to be bulit on top of [Magento 2](https://devdocs.magento.com/#/individual-contributors), I needed to find a way to get the list all the admin users as an array.

The obvious way to achieve this in Magento 2 is to use the `\Magento\User\Model\ResourceModel\User\Collection` collection using following code

```php
$objectManager = \Magento\Framework\App\ObjectManager::getInstance();
$adminUsers = $objectManager->get('\Magento\User\Model\ResourceModel\User\Collection')->toOptionArray();
```

But upon debugging, I've found that the `toOptionArray()` is not implemented in this particular collection natively and so I've left with an array with empty value and label in it.

To overcome this issue, I've tried another approach. In this, I've [injected](https://devdocs.magento.com/guides/v2.0/extension-dev-guide/depend-inj.html) `\Magento\User\Model\ResourceModel\User\CollectionFactory` into the constructor like below

```php
public function __construct(
    ...
    \Magento\User\Model\ResourceModel\User\CollectionFactory $userCollectionFactory
)
{
    $this->userCollectionFactory = $userCollectionFactory;
}
```

And then created the following function which returns an array of admin users,

```php
private function getAdminUsers()
{
    $adminUsers = [];

    foreach ($this->userCollectionFactory->create() as $user) {
        $adminUsers[] = [
            'value' => $user->getId(),
            'label' => $user->getName()
        ];
    }

    return $adminUsers;
}
```

Here, Calling the create() method on `$this->userCollectionFactory` [factory](https://devdocs.magento.com/guides/v2.0/extension-dev-guide/factories.html) gives you an instance of its specific class and in turn returns the admin users. 

On thing to not here is, When you reference a factory in a class constructor, Magento’s [object manager](https://devdocs.magento.com/guides/v2.0/extension-dev-guide/object-manager.html) generates the factory class if it does not exist. So, in order to see above code in action I needed to use following command which will re-generate classes factories:

```bash
$ php bin/magento s:d:c
``` 

And that is how I've solved this specific issue.
