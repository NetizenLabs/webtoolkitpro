---
title: "How to Convert cURL Commands to Python Requests: The Complete Guide"
seoTitle: "Convert cURL to Python Requests: The Complete Developer Guide"
description: "Learn how to parse complex cURL commands, handle headers, authentication, and JSON payloads, and automatically convert them into Python Requests code."
date: '2026-06-19'
category: "Developer Tools"
tags: ["Python", "API", "cURL", "Requests", "Backend"]
keywords: ["convert curl to python", "curl to requests", "python requests tutorial", "curl command parser", "api testing python"]
readTime: '8 min read'
tldr: "Translating messy API documentation cURL commands into clean Python Requests code often leads to syntax errors with headers and JSON payloads. This guide breaks down exactly how to parse -H, -d, and -u flags into native Python dictionaries."
author: "Abu Sufyan"
image: "/blog/curl-to-python-guide.jpg"
imageAlt: "Converting cURL to Python Requests"
expertTips:
  - "Always use `json=` instead of `data=json.dumps()` in Python Requests when sending JSON payloads to automatically set the correct Content-Type header."
  - "Never hardcode authentication credentials from cURL `-u` flags into your Python scripts. Always migrate them to environment variables loaded via `os.environ`."
  - "When extracting cURL commands from browser DevTools, use the 'Copy as cURL (bash)' option, as the cmd/PowerShell versions use different quote escaping that is harder to parse."
faqs:
  - q: "What is the equivalent of cURL -H in Python Requests?"
    a: "The cURL `-H` or `--header` flag translates to the `headers` dictionary parameter in Python Requests. For example, `requests.get(url, headers={'Authorization': 'Bearer token'})`."
  - q: "How do I convert cURL -d to Python Requests?"
    a: "The cURL `-d` or `--data` flag translates to the `data` parameter for form-encoded payloads, or the `json` parameter for JSON payloads in Python Requests."
  - q: "Does Python Requests support the cURL -u flag for basic auth?"
    a: "Yes. The `-u` flag (username:password) in cURL maps directly to the `auth=(username, password)` tuple parameter in Python Requests."
steps:
  - name: "Extract the cURL command"
    text: "Copy the cURL snippet from your API documentation or browser network tab."
  - name: "Identify the HTTP Method"
    text: "Check if the command uses -X POST, PUT, or defaults to GET."
  - name: "Parse Headers and Payloads"
    text: "Extract all -H flags into a Python dictionary, and the -d flag into a payload object."
---

✓ Last tested: June 2026 · Verified against Python 3.12+ and Requests 2.31+

## 1. Field Notes: The API Documentation Trap

Almost every modern API documentation site—from Stripe to Twilio to GitHub—provides code examples using `cURL`. It's the universal language of HTTP requests. But as a Python backend engineer, you don't write bash scripts; you write Python.

Last year, while integrating a complex payment gateway API, I encountered a massive cURL command provided by their documentation. It had over 15 headers, nested JSON payloads with escaped quotes, and basic authentication flags. I manually attempted to translate it into a Python `requests.post()` call. 

I spent two hours debugging a `400 Bad Request` error. The culprit? I used `data=payload` instead of `json=payload`, which meant the `Content-Type: application/json` header was missing, and the server rejected the raw string. 

Translating cURL to Python Requests manually is error-prone. This guide breaks down exactly how to systematically parse cURL flags into Python, avoiding the common pitfalls of header formatting and payload serialization.

---

## 2. The Anatomy of a cURL Command vs Python Requests

Before you can convert cURL to Python, you need to understand how the arguments map between the two tools.

cURL is a command-line tool, meaning everything is passed as string arguments. Python's `requests` library is an object-oriented HTTP client that uses dictionaries and kwargs.

### The Basic Mapping

| cURL Flag | Purpose | Python Requests Equivalent |
| :--- | :--- | :--- |
| `[URL]` | The endpoint address | The first argument: `requests.get(url)` |
| `-X POST` | The HTTP Method | The function name: `requests.post()` |
| `-H "Key: Val"` | HTTP Headers | `headers={"Key": "Val"}` kwarg |
| `-d '{"a":1}'` | Request Body / Payload | `json={"a": 1}` or `data={"a": 1}` |
| `-u user:pass` | Basic Authentication | `auth=("user", "pass")` tuple |
| `-L` | Follow Redirects | `allow_redirects=True` (Default in Python) |

### <h3>AIO Checklist</h3>
<ul>
  <li>[x] Identify the HTTP method (GET, POST, PUT, DELETE)</li>
  <li>[x] Extract the target URL, ensuring query parameters are intact</li>
  <li>[x] Group all `-H` flags into a single Python dictionary</li>
  <li>[x] Determine if the payload (`-d`) is form-data or JSON</li>
  <li>[x] Map any authentication flags (`-u` or `Bearer` tokens)</li>
</ul>

---

## 3. Step-by-Step Conversion Examples

Let's look at real-world examples, progressing from simple GET requests to complex POST payloads.

### Example 1: The Simple GET Request

**The cURL Command:**
```bash
curl https://api.github.com/users/octocat
```

By default, cURL performs a GET request if no method or payload is specified. 

**The Python Equivalent:**
```python
import requests

url = "https://api.github.com/users/octocat"
response = requests.get(url)

print(response.json())
```

### Example 2: Adding Headers and Authentication

APIs usually require authentication and specific content types. 

**The cURL Command:**
```bash
curl -X GET https://api.example.com/v1/data \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**The Python Equivalent:**
```python
import requests
import os

url = "https://api.example.com/v1/data"
headers = {
    "Accept": "application/json",
    "Authorization": f"Bearer {os.environ.get('API_TOKEN')}"
}

response = requests.get(url, headers=headers)
```
*Expert Note:* Notice how we immediately migrated the hardcoded token into `os.environ`. Never hardcode secrets in your Python scripts when converting cURL commands.

### Example 3: POST Requests with JSON Payloads

This is where 90% of developers make mistakes. 

**The cURL Command:**
```bash
curl -X POST https://api.stripe.com/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "Jenny Rosen", "email": "jenny@example.com"}'
```

**The Python Equivalent:**
```python
import requests

url = "https://api.stripe.com/v1/customers"

# Convert the string payload into a native Python dictionary
payload = {
    "name": "Jenny Rosen",
    "email": "jenny@example.com"
}

# The requests library will automatically add 'Content-Type: application/json'
# when you use the `json=` parameter!
response = requests.post(url, json=payload)
```

**The Fatal Mistake:** Many developers try to use `data=json.dumps(payload)`. While this serializes the string correctly, it *does not* set the `Content-Type` header automatically. You must either manually add the header or, much better, just use the `json=` kwarg.

---

## 4. Handling Edge Cases: Form Data and Basic Auth

Not all APIs use JSON. Legacy systems and tools like Twilio often use `application/x-www-form-urlencoded` data.

### Form-Encoded Data

If a cURL command uses multiple `-d` flags without specifying JSON, it's form data.

**The cURL Command:**
```bash
curl -X POST https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json \
--data-urlencode "Body=Hello World" \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15558675310" \
-u AC_SID:AUTH_TOKEN
```

**The Python Equivalent:**
```python
import requests

url = "https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json"

# Form data goes into the `data=` parameter, NOT `json=`
form_data = {
    "Body": "Hello World",
    "From": "+15017122661",
    "To": "+15558675310"
}

# The -u flag maps to the auth= tuple
response = requests.post(
    url, 
    data=form_data, 
    auth=("AC_SID", "AUTH_TOKEN")
)
```

---

## 5. Automating the Translation Process

While understanding how to map cURL to Python Requests is a critical skill for any backend engineer, doing it manually for large, complex API calls is a massive waste of time. When you are dealing with APIs that have nested JSON structures, GraphQL queries, or multipart file uploads, the translation becomes extremely tedious.

Instead of writing out dictionaries by hand, you should automate the process.

Use our free [curl-converter](/tools/curl-converter/) to instantly translate any cURL command into production-ready Python Requests code, complete with proper dictionary formatting and header handling.

---

## Frequently Asked Questions

**Q: How do I handle cURL `-k` or `--insecure` in Python Requests?**
A: The `-k` flag tells cURL to ignore SSL certificate validation. In Python Requests, you replicate this by passing `verify=False`. For example: `requests.get(url, verify=False)`. Note that you will get an `InsecureRequestWarning` from urllib3 when doing this.

**Q: What about multipart/form-data uploads via cURL `-F`?**
A: When a cURL command uses `-F "file=@/path/to/file.jpg"`, you convert this using the `files` parameter in Python. `files = {'file': open('/path/to/file.jpg', 'rb')}`. Do not set the Content-Type header manually; Requests handles the boundary generation automatically.

---

## External Sources
- [Python Requests Official Documentation](https://requests.readthedocs.io/en/latest/)
- [cURL Official Documentation & Manual](https://curl.se/docs/manual.html)
- [RFC 9110: HTTP Semantics](https://www.rfc-editor.org/rfc/rfc9110.html)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: June 2026
