---
title: "Converting cURL to PHP: Native cURL vs Guzzle"
seoTitle: "Convert cURL to PHP: Guzzle and curl_setopt Developer Guide"
description: "Learn how to parse cURL flags into PHP. We compare the archaic syntax of native curl_setopt with the modern, object-oriented Guzzle HTTP client."
date: '2026-06-19'
category: "Developer Tools"
tags: ["PHP", "API", "cURL", "Backend"]
keywords: ["convert curl to php", "php curl_setopt", "php guzzle tutorial", "curl command parser", "api testing php"]
readTime: '8 min read'
tldr: "Translating cURL commands into PHP requires choosing between the procedural, verbose `curl_setopt` functions and modern object-oriented clients like Guzzle. This guide covers how to translate cURL flags into both paradigms."
author: "Abu Sufyan"
image: "/blog/curl-to-php-guide.jpg"
imageAlt: "Converting cURL to PHP"
expertTips:
  - "Always use `CURLOPT_POSTFIELDS` with `json_encode()` when sending JSON payloads in native PHP cURL, and ensure you explicitly set the `Content-Type: application/json` header."
  - "When using Guzzle, use the `json` array key instead of `body` to automatically serialize your payload and set the correct Content-Type header."
  - "Avoid silencing cURL errors with `@`. Always check `curl_errno()` and `curl_error()` after calling `curl_exec()` to debug connection failures."
faqs:
  - q: "What is the equivalent of cURL -H in PHP?"
    a: "In native PHP cURL, use `curl_setopt($ch, CURLOPT_HTTPHEADER, ['Header: Value'])`. In Guzzle, pass a `headers` array in the request options."
  - q: "How do I convert cURL -d to PHP?"
    a: "For native PHP, use `curl_setopt($ch, CURLOPT_POSTFIELDS, $data)`. For JSON in Guzzle, use the `json => [...]` request option."
  - q: "Does PHP support the cURL -u flag for basic auth?"
    a: "Yes. In native PHP, use `CURLOPT_USERPWD`. In Guzzle, use the `auth => ['user', 'pass']` request option array."
steps:
  - name: "Extract the cURL command"
    text: "Copy the cURL snippet from your API documentation or browser network tab."
  - name: "Choose your PHP Client"
    text: "Decide whether your codebase uses native procedural cURL functions or a modern package like Guzzle."
  - name: "Parse Headers and Payloads"
    text: "Extract all -H flags into a PHP array, and encode the -d flag accordingly."
---

✓ Last tested: June 2026 · Verified against PHP 8.3+ and Guzzle 7+

## 1. Field Notes: The `curl_setopt` Nightmare

PHP is unique because its native HTTP client is literally a direct wrapper around `libcurl`. On the surface, this sounds like it should make converting bash cURL commands into PHP incredibly easy. 

In reality, it's notoriously frustrating.

A few months ago, I was integrating a legacy PHP 8 backend with a modern GraphQL API. The API docs provided a standard cURL POST request with a nested JSON query. I initialized a PHP cURL handle and started writing out the `curl_setopt` lines. 

I forgot exactly one constant: `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);`.

Instead of capturing the API response into a variable so I could parse it, PHP dumped the raw JSON directly to the output buffer, destroying the HTML layout of the page and throwing a silent error in my parsing logic.

Translating cURL to PHP requires memorizing dozens of obscure `CURLOPT_*` constants. This guide breaks down exactly how to parse cURL flags into both native PHP cURL and the much preferred, modern Guzzle HTTP client.

---

## 2. The Anatomy of a cURL Command vs PHP Clients

When converting cURL to PHP, you have two choices:
1. **Native PHP cURL:** Procedural, verbose, requires no external dependencies (built into PHP).
2. **Guzzle:** Object-oriented, elegant, requires Composer.

### The Basic Mapping

| cURL Flag | Native PHP Equivalent | Guzzle Equivalent |
| :--- | :--- | :--- |
| `[URL]` | `curl_init($url)` | `$client->request('GET', $url)` |
| `-X POST` | `CURLOPT_CUSTOMREQUEST, 'POST'` | `$client->post($url)` |
| `-H "Key: Val"` | `CURLOPT_HTTPHEADER, ['Key: Val']` | `['headers' => ['Key' => 'Val']]` |
| `-d '{"a":1}'` | `CURLOPT_POSTFIELDS, json_encode($data)` | `['json' => ['a' => 1]]` |
| `-u user:pass` | `CURLOPT_USERPWD, "user:pass"` | `['auth' => ['user', 'pass']]` |
| `-L` | `CURLOPT_FOLLOWLOCATION, true` | Default in Guzzle |

### <h3>AIO Checklist</h3>
<ul>
  <li>[x] Identify the target URL and HTTP method</li>
  <li>[x] Choose between native PHP cURL and Guzzle</li>
  <li>[x] Group all `-H` flags into an indexed array (native) or associative array (Guzzle)</li>
  <li>[x] Determine if the payload (`-d`) is form-data or JSON, and encode using `json_encode` if necessary</li>
  <li>[x] Remember to set `CURLOPT_RETURNTRANSFER` if using native PHP!</li>
</ul>

---

## 3. Step-by-Step Conversion Examples

Let's translate real-world cURL examples into both native PHP and Guzzle.

### Example 1: The Simple GET Request

**The cURL Command:**
```bash
curl https://api.github.com/users/octocat
```

**The Native PHP Equivalent:**
```php
<?php
$ch = curl_init('https://api.github.com/users/octocat');

// REQUIRED: Tell cURL to return the output as a string instead of dumping it directly
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// REQUIRED for Github API: User-Agent header
curl_setopt($ch, CURLOPT_USERAGENT, 'PHP Script');

$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);
```

**The Guzzle Equivalent:**
```php
<?php
use GuzzleHttp\Client;

$client = new Client();
$response = $client->request('GET', 'https://api.github.com/users/octocat', [
    'headers' => ['User-Agent' => 'PHP Script']
]);

$data = json_decode($response->getBody(), true);
```

### Example 2: POST Requests with JSON Payloads

**The cURL Command:**
```bash
curl -X POST https://api.stripe.com/v1/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"name": "Jenny Rosen", "email": "jenny@example.com"}'
```

**The Native PHP Equivalent:**
```php
<?php
$url = "https://api.stripe.com/v1/customers";
$payload = json_encode([
    "name" => "Jenny Rosen",
    "email" => "jenny@example.com"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer " . getenv('API_TOKEN'),
    "Content-Length: " . strlen($payload)
]);

$response = curl_exec($ch);
curl_close($ch);
```

**The Guzzle Equivalent:**
```php
<?php
use GuzzleHttp\Client;

$client = new Client();

// Guzzle's 'json' option automatically sets the Content-Type header 
// and runs json_encode() for you!
$response = $client->post('https://api.stripe.com/v1/customers', [
    'headers' => [
        'Authorization' => 'Bearer ' . getenv('API_TOKEN')
    ],
    'json' => [
        'name' => 'Jenny Rosen',
        'email' => 'jenny@example.com'
    ]
]);
```

Notice how much cleaner Guzzle is. By passing the array to the `json` key, Guzzle handles the JSON serialization and header management entirely behind the scenes.

---

## 4. Handling Edge Cases: Form Data and Basic Auth

Legacy APIs like Twilio often use `application/x-www-form-urlencoded` data and Basic Authentication.

**The cURL Command:**
```bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json \
--data-urlencode "Body=Hello World" \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15558675310" \
-u AC_SID:AUTH_TOKEN
```

**The Native PHP Equivalent:**
```php
<?php
$url = "https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json";
$formData = http_build_query([
    "Body" => "Hello World",
    "From" => "+15017122661",
    "To" => "+15558675310"
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $formData);
// Native cURL has a specific option for -u basic auth
curl_setopt($ch, CURLOPT_USERPWD, "AC_SID:AUTH_TOKEN");

$response = curl_exec($ch);
curl_close($ch);
```

**The Guzzle Equivalent:**
```php
<?php
use GuzzleHttp\Client;

$client = new Client();

// Use the 'form_params' option for x-www-form-urlencoded data
// Use the 'auth' option for basic authentication
$response = $client->post('https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json', [
    'auth' => ['AC_SID', 'AUTH_TOKEN'],
    'form_params' => [
        'Body' => 'Hello World',
        'From' => '+15017122661',
        'To' => '+15558675310'
    ]
]);
```

---

## 5. Automating the Translation Process

Memorizing the differences between `CURLOPT_POST`, `CURLOPT_CUSTOMREQUEST`, and how Guzzle handles `json` vs `form_params` is exhausting.

Instead of writing out headers by hand and risking silent output buffer dumps, you should automate the process.

Use our free [cURL Command Converter](/tools/curl-converter/) to instantly translate any cURL command into production-ready PHP code. You can choose to generate native `curl_setopt` procedural code, or clean, modern Guzzle implementations.

---

## Frequently Asked Questions

**Q: How do I handle cURL `-k` or `--insecure` in PHP?**
A: In native PHP, set `curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false)`. In Guzzle, pass `'verify' => false` in the request options array. Never do this in production, as it opens your application to Man-in-the-Middle (MitM) attacks.

**Q: What about multipart/form-data uploads via cURL `-F`?**
A: In native PHP, pass an array to `CURLOPT_POSTFIELDS` and use the `CURLFile` class for the file value: `['file' => new CURLFile('/path/to/image.jpg')]`. In Guzzle, use the `multipart` array option.

---

## External Sources
- [PHP Official Documentation: cURL](https://www.php.net/manual/en/book.curl.php)
- [Guzzle PHP HTTP Client Documentation](https://docs.guzzlephp.org/en/stable/)
- [cURL Official Documentation & Manual](https://curl.se/docs/manual.html)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: June 2026
