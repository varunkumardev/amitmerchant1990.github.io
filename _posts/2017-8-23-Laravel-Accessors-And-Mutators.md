---
layout: post
title: Laravel - Accessors & Mutators
categories: [PHP, Laravel]
---

Accessors and mutators allow you to format Eloquent attribute values when you retrieve or set them on model instances. I'll explain how you can you use them into your app.

## Accessors

There comes a time when we need some database fields to be fetched with some modifications without making changes after processing the query. So, for example I have a `DateTime` field called `reporting_date` into my table say `inventory`. And now, while fetching the records from this particular table I want only date from this particular field removing the time. 

Normal flow to achieve this would to get all the records, run a forloop on them and apply necessary logic on `reporting_date` field. This is sort of cumbersome.

In [Laravel](https://laravel.com), to achieve this we have [Accessors](https://laravel.com/docs/5.4/eloquent-mutators#accessors-and-mutators) which you can define in the table's model.

So, for our case we can define an accessor for `reporting_date` field like below

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Inventory extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'inventory';

    public function getReportingDateAttribute($value)
    {
        $createDate = new \DateTime($value); //2017-08-14 20:58:37
        return $createDate->format('Y-m-d');
    }
}

``` 

As you can see, I have defined a `getReportingDateAttribute()` function on `Inventory` model where `ReportingDate` is the "studly" cased name of the column `reporting_date` which we wish to access. I have written the logic to retieve only date from the `DateTime` field.

Here, the original value of the column is passed to the accessor, allowing you to manipulate and return the value. To access the value of the accessor, you may simply access the `reporting_date` attribute on a model instance:

```php
<?php
$inventory = App\Inventory::find(5);

$reportingDate = $inventory->reporting_date; //2017-08-14
```

## Mutators

Similar to an Accessor, a Mutator can be used to modify the value of particular field before saving it into the database everytime an insert or an update query gets executed.

So for example, if I want `tax` field of table `orders` to be saved before saving into the database with some calculations, I'll define a Mutator for the same like below

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Order extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    public function setTaxAttribute($value)
    {
        $tax = ($tax * 20)/100;
        $this->attributes['tax'] = tax;
    }
}
```

Here, The mutator will receive the value that is being set on the attribute, allowing you to manipulate the value and set the manipulated value on the Eloquent model's internal `$attributes` property. So, for example, if we attempt to set the `tax` attribute to 15:

```php
<?php
$order = App\Order::find(10);

$order->tax = 15;
```

In this example, the `setTaxAttribute()` function will be called with the value 15. The mutator will then apply necessary calculations on tax and set its resulting value in the internal `$attributes` array.


## Conclusion

Accessors and Mutators are really great functionalities provided by Laravel to get and set model properties if used adequetly. It can also enhance the performance of the app as they process the model values on database level.

Hope you enjoy this article.

Happy coding!

> Send a pull request [here](https://github.com/amitmerchant1990/amitmerchant1990.github.io/edit/master/_posts/2017-8-23-Laravel-Accessors-And-Mutators.md) if you find any typo or need any correction.
