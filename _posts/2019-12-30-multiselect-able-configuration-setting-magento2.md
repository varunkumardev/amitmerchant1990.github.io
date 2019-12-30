---
layout: post
title: Multiselect-able configuration setting in Magento2
categories: [Magento2]
---

The other day, there was a situation where I needed to implement a multiselect configuration setting in my [Magento2](https://devdocs.magento.com) application. So, I thought of documenting the process. So, the scenario was to implement a setting which enlist all the product attribute set and all those can be multiselect-able. Here's how I did it.

## Creating setting in the Admin area

In order to create a new setting in admin area, you'll need to add the following into the `system.xml` file of your module which resides under `etc/adminhtml`.

```xml
<field id="product_attribute_set" translate="label comment" type="multiselect" 
sortOrder="41" showInDefault="1" showInWebsite="1" showInStore="1">
    <label>Product Attribute Set</label>
    <source_model>Magento\Catalog\Model\Product\AttributeSet\Options</source_model>
</field>
```

As you can see, in order to make the setting multiselect-able, you'll have to set `type` attribute as _"multiselect"_. Apart from this, you'll need to provide a class which will be used to render the options. In my case, it's `Magento\Catalog\Model\Product\AttributeSet\Options` which will render products' attribute set. This is how it would look like.

{% include image.html file="configuration-demo.png" description="Product Attribute Set" %}

## Consuming the setting

In order access the setting further in your application, you could use `\Magento\Framework\App\Config\ScopeConfigInterface` and fetch it like so. This is how I did it.

```php
public function __construct(
    \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
){
    $this->scopeConfig = $scopeConfig;
}

public function getAttributeSetConfig()
{
    $productAttributeSet = $this->scopeConfig->getValue('amitmerchant/general/product_attribute_set');
    
    return explode(',', $productAttributeSet);
}
```

Notice, the option will get returned as a comma separated value. So, you'll need to use [`explode`](https://www.php.net/manual/en/function.explode.php) or something like that to use it fluently.

