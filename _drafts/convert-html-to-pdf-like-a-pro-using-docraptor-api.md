---
layout: post
title: Convert HTML to PDF like a pro using DocRaptor API
image: /cdn/convert-html-to-pdf-like-a-pro-using-docraptor-api.png
categories: [PHP]
---

If you've ever worked on enterprise-level web applications, there's a good chance that you would have in need to convert documents from one format to another such as converting an HTML document to PDF.

For instance, let's say you're working on an e-Commerce application and you want to send invoices to customers. In most of the scenarios, you might have pre-defined HTML documents that you'd fill in dynamically using PHP and convert it to PDF to send it further to the customer.

* TOC
{:toc}

This is where this API called [DocRaptor](https://docraptor.com/) can come to your rescue.

## The DocRaptor API

In a nutshell, using DocRaptor API, you can convert your HTML documents to PDF (or XLS, XLSX). And it not only converts your documents but provides support for [headers](https://docraptor.com/documentation/style#pdf-headers-footers), [page breaks](https://docraptor.com/documentation/style#pdf-page-breaks), [PDF metadata](https://docraptor.com/documentation/style#pdf-metadata), watermarks, [accessible PDFs](https://docraptor.com/documentation/api#api_prince_pdf_profile) effortlessly. DocRaptor also lets you make PDFs with advanced CSS layout tools, including [Flexbox](https://docraptor.com/documentation/style#pdf-flexbox). 

DocRaptor converts HTML to PDF using the industry-leading [Prince PDF engine](http://www.princexml.com/). It s

You can consume DocRaptor API in almost any language using [their respective libraries](https://docraptor.com/documentation). But if you want to get started specifically with PHP, you can install its [PHP library](https://github.com/DocRaptor/docraptor-php) in your project using Composer like so.

```bash
$ composer require docraptor/docraptor
```

Once installed, you can start consuming the API. In its simplest form, you can consume it like so.

```php
$docraptor = new DocRaptor\DocApi();
$docraptor->getConfig()->setUsername("YOUR_API_KEY_HERE");

$doc = new DocRaptor\Doc();
$doc->setTest(true);                                                   
$doc->setDocumentContent("<html><body>Hello World</body></html>");    
//$doc->setDocumentUrl("http://docraptor.com/examples/invoice.html");
$doc->setName("docraptor-php.pdf");                                   
$doc->setDocumentType("pdf");                                         

$create_response = $docraptor->createDoc($doc);

header("Content-type:application/pdf");

echo $create_response;
```

As you can see, to use the API, first you'd need to create an object of `DocRaptor\DocApi` class and set an API key of your DocRaptor account using the `setUsername` method. 

> If you're just trying out the library for the first time, `YOUR_API_KEY_HERE` would work just fine and it will generate the PDF documents with watermarks.

Next, to start using the API and feed your HTML documents, you'd need to create an object of the `DocRaptor\Doc` class. You can then set various configurations over it.

For instance, setting `true` in the `setTest` method makes sure you're consuming the API in the test mode. Next, you can feed the actual HTML in the `setDocumentContent` method. Similarly, you can specify document name and type using `setName` and `setDocumentType` respectively.

And lastly, feed this entire document to `DocRaptor\DocApi` using `createDoc` which will ultimately convert the document and returns it back. And that's about it when it comes to generating a PDF from HTML.

You can similarly convert the same HTML to `xls` or `xlsx` formats by just replacing these options in the `setDocumentType` method.

DocRaptor supports many options for output customization which you can find [over here](https://docraptor.com/documentation/api#api_general).

## Creating Document Asynchronously

Apart from converting documents synchronously as we've seen above, the API also provides a way to convert documents asynchronously if you want to let the process be done in the background.

Below is how you can achieve the same.

```php
$docraptor = new DocRaptor\DocApi();
$docraptor->getConfig()->setUsername("YOUR_API_KEY_HERE"); 

try {

  $doc = new DocRaptor\Doc();
  $doc->setTest(true);                                                   
  $doc->setDocumentContent("<html><body>Hello World</body></html>");     
  $doc->setName("docraptor-php.pdf");                                    
  $doc->setDocumentType("pdf");                                         
  
  $create_response = $docraptor->createAsyncDoc($doc);

  $done = false;
  while (!$done) {
    $status_response = $docraptor->getAsyncDocStatus($create_response->getStatusId());
    echo "doc status: " . $status_response->getStatus() . "\n";
    switch ($status_response->getStatus()) {
      case "completed":
        $doc_response = $docraptor->getAsyncDoc($status_response->getDownloadId());
        $file = fopen("/tmp/docraptor-php.pdf", "wb");
        fwrite($file, $doc_response);
        fclose($file);
        echo "Wrote PDF to /tmp/docraptor-php.pdf\n";
        $done = true;
        break;
      case "failed":
        echo "FALIED\n";
        echo $status_response;
        $done = true;
        break;
      default:
        sleep(1);
    }
  }

} catch (DocRaptor\ApiException $exception) {
  echo $exception . "\n";
  echo $exception->getMessage() . "\n";
  echo $exception->getCode() . "\n";
  echo $exception->getResponseBody() . "\n";
}
```

As you may have noticed, the important piece of code here is using the `createAsyncDoc` method on the `DocRaptor\DocApi` object. You can get the document statuses("completed", "failed" and so on) using the `getAsyncDocStatus` method and ultimately get the async doc using the `getAsyncDoc` method by passing in the Download ID of the document and save it on the file system!

## Hosted Documents

Apart from saving documents on your application's file system, you can also choose to let DocRaptor host your documents. This allows you to provide a URL to your end-users, third party tools like [Zapier](https://zapier.com/) and [Salesforce](https://www.salesforce.com/in/),
or anyone else.

You can find how you can do it by following instructions in [this example](https://github.com/DocRaptor/docraptor-php/blob/master/examples/async_hosted.php) in the official repository.

## Advanced PDF Features

As I mentioned previously, the DocRaptor is using the [Prince PDF engine](http://www.princexml.com/) under the hood. So, you can specify all the option related to prince while building your configuration. 

To get started with it, you'd first need to create an object of [DocRaptor\PrinceOptions](https://github.com/DocRaptor/docraptor-php/blob/master/lib/PrinceOptions.php) like so.

```php
$prince_options = new DocRaptor\PrinceOptions();
```

And then set various [prince related options](https://docraptor.com/documentation/api#api_advanced_pdf) on it. For instance, you want to create PDF using PDF profiles such as **PDF/A-1a**, **PDF/A-3a**, or **PDF/UA-1** (which makes [PDFs accessibilty](https://www.w3.org/TR/WCAG20-TECHS/pdf) compatible), you can set it like so.

```php
$prince_options->setProfile('PDF/A-1a');
```

And after setting all the [price options](https://github.com/DocRaptor/docraptor-php/blob/master/lib/PrinceOptions.php), you can apply it to the original document like so.

```php
$doc->setPrinceOptions($prince_options);
```

## In closing

All in all, I like how DocRaptor offers you a host of customizations to make your documents according to your needs. My personal favorite among all of these is the async generation of documents which is a game-changer when you're creating many documents in parallel or very large documents with lots of assets!

You can learn more about DocRaptor at their [official documentation](https://docraptor.com/documentation).