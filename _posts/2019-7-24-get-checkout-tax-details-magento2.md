---
layout: post
title: Fetch and calculate tax details anywhere within Magento 2
categories: [Magento2]
---

Often times comes when you want details related to tax based on the products you currently have anywhere apart from Checkout/Cart page. I'm specifically talking about [Magento 2](https://github.com/magento/magento2) here. For instance, for one of my projects we've a projects page where we use catalog products differently than the Magento's native way and we needed a way to fetch tax details based on the products we have on that page.

{% include affiliates.html %}

So, after some brainstroming and looking into the Magento's core codebase, I've written this little piece which will get you the tax details based on the product's, customer's and address' details.


```php
<?php
class TaxCalculation 
{
    private $taxCalculation;
    
    private $scopeConfig;

    public function __construct(
        \Magento\Tax\Model\Calculation $taxCalculation,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig
    )
    {
        $this->taxCalculation = $taxCalculation;
        $this->scopeConfig = $scopeConfig;
    }

    public function execute()
    {
        // loop of products
        for (;;) {
            $product = $this->product->load($id);
            
            // Tax Calculation
            $productTaxClassId = $product->getTaxClassId();
            $defaultCustomerTaxClassId = $this->scopeConfig->getValue('tax/classes/default_customer_tax_class');

            $request = new \Magento\Framework\DataObject(
                [
                    'country_id' => $countryId,
                    'region_id' => $regionId,
                    'postcode' => $postcode,
                    'customer_class_id' => $defaultCustomerTaxClassId,
                    'product_class_id' => $productTaxClassId
                ]
            );

            // Calculate tax
            $taxInfo = $this->taxCalculation->getResource()->getRateInfo($request);
            
            // Classify different taxes
            if (count($taxInfo['process']) > 0) {
                $taxDetails = []; $i = 0;

                foreach ($taxInfo['process'][0]['rates'] as $key => $rate) {
                    $taxDetails['taxes'][$j]['title'] = $rate['title'];
                    $taxDetails['taxes'][$j]['percent'] = $rate['percent'];
                    $taxDetails['taxes'][$j]['rule_id'] = $rate['rule_id'];
                    $taxDetails['taxes'][$j]['taxAmount'] = ($product->getPrice() * $rate['percent']) / 100;
                }
            }
        }
    }
}
```

Let's break down the code in order to learn it precisely. First of all, we need to run a loop of the available catalog products for which we need to calculate the tax. Next up, we need products' tax class ID and logged-in customer's tax class ID. Which we've done using following lines:

```php
$productTaxClassId = $product->getTaxClassId();
$defaultCustomerTaxClassId = $this->scopeConfig->getValue('tax/classes/default_customer_tax_class');
```

Next, we need to create a vitual request using `\Magento\Framework\DataObject` which comparises of `country_id`, `region_id`, `postcode`, `customer_class_id` and `product_class_id`.

Now, in order to fetch the actual tax details we need to use `\Magento\Tax\Model\Calculation` class which we've injected into the class constructor and using the `getRateInfo` method by passing the `$request` that we previously created.

```php
$taxInfo = $this->taxCalculation->getResource()->getRateInfo($request);
```

And finally, `getRateInfo` will return us the tax details as an array which we can utilize however we want. In my case, I've restructured the tax details again as per my need as you can see in the code.

## In closing

I hope you find this little snippet useful in calculating rather cumbersome tax calculation. Let me know if have questions or find correction into this article.

Until next time!