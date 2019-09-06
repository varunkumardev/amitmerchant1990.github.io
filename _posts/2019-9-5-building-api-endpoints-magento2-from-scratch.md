---
layout: post
title: Building API endpoints in Magento2 from scratch
categories: [Magento2]
---

Magento is known for its developer-friendly approach for buliding things around its platform. Everything is well-defined and readily available in the framework. This also includes creation of RESTful APIs right within the framework. In this article, I'm going to explain how you can create an API endpoint in Magento 2 and how you can consume or disribute the same.

## Create a `webapi.xml` file

To configure a web API for a service, you define XML elements and attributes in the `app/code/Magento/<MODULE>/etc/webapi.xml` file, where `<MODULE>` is the module name. This would be your first and foremost step to build a RESTful API. The file will be used to define the endpoint URL, the interface that it will be using by providing it as a service and resources it will use. For instance, let's say I want to build an API to import an invoice which will accept a CSV file and process it down further. For this the `webapi.xml` would look like this.

`app/code/AmitMerchant/Invoice/etc/webapi.xml`

```xml
<?xml version="1.0"?>
<routes xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:module:Magento_Webapi:etc/webapi.xsd">
    <route url="/V1/invoice/import" method="POST">
        <service class="AmitMerchant\Invoice\Api\InvoiceInterface" method="import"/>
        <resources>
            <resource ref="anonymous"/>
        </resources>
    </route>
</routes>
```

Let's breakdown the XML. The `route` tag will define the endpoint URL. In our case it would be something like http://amit.magento/rest/V1/invoice/import. Next, the `service` tag will define the interface and the method of interface that this endpoint will be using. In our case it will be `AmitMerchant\Invoice\Api\InvoiceInterface` and the method `import`. `resource` will define a resource to which the caller must have access. Here, we have provided `anonymous` as "ref" because we want our endpoint to grant access to guest users or you can provide a Magento resource, such as `Magento_Customer::group` if you want some sort of authentication on the endpoint.


## Create `AmitMerchant\Invoice\Api\InvoiceInterface` interface

As mentioned in the `webapi.xml` we now need to create `AmitMerchant\Invoice\Api\InvoiceInterface` which would look like this:

`app/code/AmitMerchant/Invoice/Api/InvoiceInterface.php`

```php
namespace AmitMerchant\Invoice\Api;

interface InvoiceInterface
{
    /**
     * Import invoice
     */
    public function import();
}
```

## Bind `AmitMerchant\Invoice\Api\InvoiceInterface` to a model

Next we need to bind the `AmitMerchant\Invoice\Api\InvoiceInterface` to a model where we'll write the business logic to process the CSV file that we'll get over the endpoint. We'll bind this into the module's `di.xml` file.

`app/code/AmitMerchant/Invoice/etc/di.xml`

```xml
<?xml version="1.0"?>

<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <preference for="AmitMerchant\Invoice\Api\InvoiceInterface" type="AmitMerchant\Invoice\Model\Invoice" />
</config>
```

As you can see above, we have bind `AmitMerchant\Invoice\Api\InvoiceInterface` to the `AmitMerchant\Invoice\Model\Invoice` class.

## Create `AmitMerchant\Invoice\Model\Invoice` class

We'll now implement `import` method in this class which will process the the CSV file posted over this endpoint.

`app/code/AmitMerchant/Invoice/Model/Invoice.php`

```php
namespace AmitMerchant\Invoice\Model;
use AmitMerchant\Invoice\Api\InvoiceInterface;
use Magento\Framework\App\Request\Http;

class Invoice extends \Magento\Framework\Model\AbstractModel implements InvoiceInterface
{
    /**
     * @var \Magento\Framework\App\Request\Http
     */
    protected $_request;

    public function __construct(
        Http $request
    )
    {
        $this->_request = $request;
    }

    /**
     * Import invoice from API
     */
    public function import() 
    {   try {
            $invoiceImportFile = $this->_request->getFiles();

            // logic to process the CSV file further

            return json_encode(['success' => true]);
        } catch (\Exception $e) {
            return json_encode(['success' => false]);
        }
    }
}
```

As you can see, we can use Magento's `Magento\Framework\App\Request\Http` to get the request parameters including files. This is the same object that we use in controllers. In order to get request parameters, you'd rather use `$this->_request->getParams()` instead. And finally you can return the response from the API which can be handled ultimately.

And that's about how to create an API endpoint from scratch in Magento2.

Until next time!
