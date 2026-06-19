---
title: "Translating cURL Commands to the Node.js Fetch API"
seoTitle: "Convert cURL to Node.js Fetch API: Javascript Developer Guide"
description: "Learn how to parse complex cURL commands, handle headers, authentication, and JSON payloads, and automatically convert them into Javascript native Fetch code."
date: '2026-06-19'
category: "Developer Tools"
tags: ["Javascript", "API", "cURL", "Node.js", "Frontend"]
keywords: ["convert curl to fetch", "curl to javascript", "nodejs fetch api", "curl command parser", "api testing js"]
readTime: '7 min read'
tldr: "Translating cURL commands into Javascript's native Fetch API often leads to frustrating CORS issues and improperly stringified payloads. This guide breaks down exactly how to parse -H and -d flags into the native Fetch initialization object."
author: "Abu Sufyan"
image: "/blog/curl-to-js-guide.jpg"
imageAlt: "Converting cURL to Javascript Fetch API"
expertTips:
  - "Always use `JSON.stringify()` when passing an object to the `body` property in a Fetch request, or the browser will silently send `[object Object]`."
  - "Node.js v18+ supports the Fetch API natively. You no longer need to install `node-fetch` or `axios` for standard HTTP requests."
  - "When extracting cURL commands from browser DevTools, use the 'Copy as cURL (bash)' option, as the cmd/PowerShell versions use different quote escaping that is harder to parse."
faqs:
  - q: "What is the equivalent of cURL -H in Javascript Fetch?"
    a: "The cURL `-H` or `--header` flag translates to the `headers` property inside the Fetch initialization object. For example, `fetch(url, { headers: { 'Authorization': 'Bearer token' } })`."
  - q: "How do I convert cURL -d to the Fetch API?"
    a: "The cURL `-d` or `--data` flag translates to the `body` parameter. If you are sending JSON, you must use `JSON.stringify(data)`."
  - q: "Does the Fetch API support the cURL -u flag for basic auth?"
    a: "Unlike cURL, Fetch does not have a native basic auth tuple. You must manually encode the credentials in base64 and pass them in the Authorization header: `'Authorization': 'Basic ' + btoa('user:pass')`."
steps:
  - name: "Extract the cURL command"
    text: "Copy the cURL snippet from your API documentation or browser network tab."
  - name: "Identify the HTTP Method"
    text: "Check if the command uses -X POST, PUT, or defaults to GET."
  - name: "Parse Headers and Payloads"
    text: "Extract all -H flags into a Javascript object, and the -d flag into the body property."
---

✓ Last tested: June 2026 · Verified against Node.js 18+ and Chrome 124+

## 1. Field Notes: The Axios Dependency Trap

For years, Javascript developers relied on third-party libraries like `axios` or `request` to handle HTTP calls because the native `XMLHttpRequest` was notoriously difficult to use. 

When the `fetch()` API was introduced to browsers, it was a game-changer. But when Node.js 18 officially baked the Fetch API into the backend runtime, it fundamentally changed how we write server-side Javascript. You no longer need to bloat your `package.json` just to make a REST API call.

However, translating the standard `cURL` examples found in API documentation (like Stripe, Twilio, or GitHub) into native Fetch syntax still trips up many developers. 

Last month, I was debugging a webhook integration. I copied the provided cURL command, quickly threw it into a `fetch()` call, and received a baffling `400 Bad Request`. I had forgotten to wrap my payload in `JSON.stringify()`. The native Fetch API, unlike Axios, does not automatically serialize Javascript objects into JSON strings. It sent the literal string `"[object Object]"` to the server.

Translating cURL to Fetch manually requires understanding these quirks. This guide breaks down exactly how to parse cURL flags into native Javascript.

---

## 2. The Anatomy of a cURL Command vs Fetch API

cURL is a command-line tool, meaning everything is passed as string arguments. Javascript's `fetch()` is an asynchronous function that takes a URL string and an initialization object (`RequestInit`).

### The Basic Mapping

| cURL Flag | Purpose | Fetch API Equivalent |
| :--- | :--- | :--- |
| `[URL]` | The endpoint address | The first argument: `fetch(url)` |
| `-X POST` | The HTTP Method | `method: 'POST'` in the init object |
| `-H "Key: Val"` | HTTP Headers | `headers: { 'Key': 'Val' }` |
| `-d '{"a":1}'` | Request Body / Payload | `body: JSON.stringify({a: 1})` |
| `-u user:pass` | Basic Authentication | Manually encoded `Authorization: Basic ...` header |
| `-L` | Follow Redirects | `redirect: 'follow'` (Default in Fetch) |

### <h3>AIO Checklist</h3>
<ul>
  <li>[x] Extract the target URL, ensuring query parameters are intact</li>
  <li>[x] Identify the HTTP method (GET, POST, PUT, DELETE)</li>
  <li>[x] Group all `-H` flags into a single `headers` object</li>
  <li>[x] Determine if the payload (`-d`) is form-data or JSON, and stringify accordingly</li>
  <li>[x] Base64 encode any authentication flags (`-u`)</li>
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

**The Javascript Equivalent:**
```javascript
const url = "https://api.github.com/users/octocat";

// Fetch defaults to GET
const response = await fetch(url);
const data = await response.json();

console.log(data);
```

### Example 2: Adding Headers and Authentication

APIs usually require authentication and specific content types. 

**The cURL Command:**
```bash
curl -X GET https://api.example.com/v1/data \
  -H "Accept: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**The Javascript Equivalent:**
```javascript
const url = "https://api.example.com/v1/data";
const token = process.env.API_TOKEN; // Never hardcode secrets!

const options = {
  method: 'GET',
  headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`
  }
};

const response = await fetch(url, options);
const data = await response.json();
```

### Example 3: POST Requests with JSON Payloads

This is where developers transitioning from Axios make the most mistakes. 

**The cURL Command:**
```bash
curl -X POST https://api.stripe.com/v1/customers \
  -H "Content-Type: application/json" \
  -d '{"name": "Jenny Rosen", "email": "jenny@example.com"}'
```

**The Javascript Equivalent:**
```javascript
const url = "https://api.stripe.com/v1/customers";

const payload = {
  name: "Jenny Rosen",
  email: "jenny@example.com"
};

const options = {
  method: 'POST',
  headers: {
    "Content-Type": "application/json"
  },
  // FATAL MISTAKE: Passing `body: payload` directly will fail.
  // You MUST use JSON.stringify()
  body: JSON.stringify(payload)
};

const response = await fetch(url, options);
```

Unlike Axios, the Fetch API does *not* automatically stringify your objects or infer the `Content-Type` header based on the object type. You must explicitly set the header and serialize the data.

---

## 4. Handling Edge Cases: Form Data and Basic Auth

Not all APIs use JSON. Legacy systems often use `application/x-www-form-urlencoded` data.

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

**The Javascript Equivalent:**
```javascript
const url = "https://api.twilio.com/2010-04-01/Accounts/AC/Messages.json";

// For form data, use URLSearchParams instead of JSON.stringify()
const formData = new URLSearchParams();
formData.append("Body", "Hello World");
formData.append("From", "+15017122661");
formData.append("To", "+15558675310");

// Fetch does not have a native Basic Auth tuple.
// You must Base64 encode the string manually.
const authStr = Buffer.from('AC_SID:AUTH_TOKEN').toString('base64');
// In the browser, you would use: btoa('AC_SID:AUTH_TOKEN')

const options = {
  method: 'POST',
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Authorization": `Basic ${authStr}`
  },
  body: formData
};

const response = await fetch(url, options);
```

---

## 5. Automating the Translation Process

While understanding how to map cURL to Fetch is a critical skill for any Javascript developer, doing it manually for large, complex API calls is tedious and error-prone. 

Instead of writing out headers by hand and remembering to `JSON.stringify()` your payloads, you should automate the process.

Use our free [cURL Command Converter](/tools/curl-converter/) to instantly translate any cURL command into production-ready Node.js Fetch API code.

---

## Frequently Asked Questions

**Q: How do I handle cURL `-k` or `--insecure` in Node.js Fetch?**
A: By default, Node.js will reject unauthorized self-signed certificates. To bypass this (equivalent to `-k`), you need to create a custom `https.Agent` with `rejectUnauthorized: false` and pass it to the fetch options. *Note: The native global fetch in Node 18+ does not officially support the `agent` parameter out of the box without specific undici configurations. Use with caution.*

**Q: What about multipart/form-data uploads via cURL `-F`?**
A: When a cURL command uses `-F "file=@/path/to/file.jpg"`, you convert this using the `FormData` interface. Append the file blob to the FormData instance and pass it directly to the `body`. Do **not** set the `Content-Type` header manually; the Fetch API must generate the multipart boundary itself.

---

## External Sources
- [MDN Web Docs: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Node.js Official Documentation: Globals (Fetch)](https://nodejs.org/api/globals.html#fetch)
- [cURL Official Documentation & Manual](https://curl.se/docs/manual.html)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: June 2026
