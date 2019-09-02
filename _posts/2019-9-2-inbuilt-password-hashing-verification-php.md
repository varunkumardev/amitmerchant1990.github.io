---
layout: post
title: In-built password hashing and verification in PHP
categories: [PHP]
---

Passwords are an integral part of today's authentication based web applications. In fact, Passwords have been used since ancient times. Sentries would challenge those wishing to enter an area to supply a password or watchword, and would only allow a person or group to pass if they knew the password. In modern web application passwords are used in combination with usernames to authenticate users. So, basically, we'd need to fields in order to store username and password for each user both of which are supplied by user at the time of signing up to the web application.

Now, as the passwords are sensitive data it'd be foolish to store them as a plaintext in the database. To prevent this, we can use the technique to transform the password into data that cannot be converted back to the original password. This mechanism is known as hashing. Hashing of a password essentially involves applying cryptographic hash functions such as MD5 or SHA-1 to the password(which are practically irreversible to get back in original form) and storing the resulted hash into the database.

Luckily, from PHP5 and later, we've a password hashing function comes in-built in library which we can use to build a strong authentication systems.

## Hash password using `password_hash`

When user signup to the site, he/she will provide a password which would be in a plaintext form. Now, while saving the user data includig the password we can use [password_hash](https://www.php.net/manual/en/function.password-hash.php) creates a new password hash using a strong one-way hashing algorithm which we can now store directly into the database. `password_hash` mainly accepts three parameters. The first on being the plain password, the second being the hashing algorithm constant and third and optional one being an associative array containing options.

```php
password_hash ( string $password , int $algo [, array $options ] ) : string
```

The following algorithms are currently supported:

* `PASSWORD_DEFAULT` - Use the bcrypt algorithm (default as of PHP 5.5.0). Note that this constant is designed to change over time as new and stronger algorithms are added to PHP. For that reason, the length of the result from using this identifier can change over time. Therefore, it is recommended to store the result in a database column that can expand beyond 60 characters (255 characters would be a good choice).
* `PASSWORD_BCRYPT` - Use the `CRYPT_BLOWFISH` algorithm to create the hash. This will produce a standard crypt() compatible hash using the "$2y$" identifier. The result will always be a 60 character string, or `FALSE` on failure.
* `PASSWORD_ARGON2I` - Use the Argon2i hashing algorithm to create the hash. This algorithm is only available if PHP has been compiled with Argon2 support.
* `PASSWORD_ARGON2ID` - Use the Argon2id hashing algorithm to create the hash. This algorithm is only available if PHP has been compiled with Argon2 support.

`password_hash` returns the hashed password, or `FALSE` on failure. The used algorithm, cost and salt are returned as part of the hash. Therefore, all information that's needed to verify the hash is included in it. Check out example usage of the same below.

```php
<?php
echo password_hash('mysecretpassword', PASSWORD_DEFAULT);
?>
```

This will generate below hash for the supplied password.

```
$2y$10$n4xlP3HHKlAdRZoGnP7SUe6TdmeR/RqeG5VuFTYTB4Q07KqEZRZF2
```

You can provide an optional associative array which can include the custom "cost" for the given algorithm. Take below for example.

```php
<?php
/**
 * In this case, we want to increase the default cost for BCRYPT to 12.
 * Note that we also switched to BCRYPT, which will always be 60 characters.
 */
$options = [
    'cost' => 12,
];
echo password_hash('mysecretpassword', PASSWORD_BCRYPT, $options);
``` 

Here in above example, we want to increase the default cost for `BCRYPT` to 12. In addition to this, you can use [this supported options](https://www.php.net/manual/en/password.constants.php) for different algorithms. If you don't provide option array a random salt will be created and the default cost will be used to generate the passwords.

## Verify password using `password_verify`

Now, when user tries to login to the site he/she will provide a plaintext password. We can find that user's details using username from the database which will also contain the hash of the password we've generated using `password_hash`. We can verify this plaintext password using [password_verify](https://www.php.net/manual/en/function.password-verify.php) by providing both plain password and its related hash to it. The function will return `TRUE` if the password and hash match, or `FALSE` otherwise.

```php
password_verify ( string $password , string $hash ) : bool
```

As I mentioned earlier, `password_hash()` returns the algorithm, cost and salt as part of the returned hash. Therefore, all information that's needed to verify the hash is included in it. This allows the verify function to verify the hash without needing separate storage for the salt or algorithm information. The function is also safe against [timing attacks](https://en.wikipedia.org/wiki/Timing_attack).

```php
<?php
// Hash generated using password_hash
$hash = '$2y$10$n4xlP3HHKlAdRZoGnP7SUe6TdmeR/RqeG5VuFTYTB4Q07KqEZRZF2';

if (password_verify('mysecretpassword', $hash)) {
    echo 'Password is valid!';
} else {
    echo 'Invalid password.';
}
?>
```

This would print following it the password matches with the given `$hash`.

```
Password is valid!
```

## In closing

So, as we've seen, PHP have made storing and verifying passwords extremely easy and painless. It was certainly painful in previous versions of PHP but it's better late than never. 

Until next time!



