---
title: "Decode JWT Tokens Without a Library — 2026 Guide"
seoTitle: "Decode JWT Tokens Without a Library — 2026 Guide"
description: "Decode JWT tokens in plain JavaScript without installing any package. Step-by-step guide covering base64url decoding, claim inspection, and signature verification."
date: '2026-05-31'
category: "Developer Tools"
tags: ["JWT", "JavaScript", "Authentication", "Security"]
keywords: ["how to decode JWT token without library", "decode jwt token without library", "javascript jwt decode", "jwt payload", "decode jwt plain javascript"]
readTime: '8 min read'
tldr: "You don't need npm packages like jwt-decode to read a JWT token. A JWT is simply three base64url strings. You can split it, fix the padding, and decode the payload natively using JavaScript's atob() and JSON.parse()."
author: "Abu Sufyan"
image: "/blog/decode-jwt-javascript.jpg"
imageAlt: "JavaScript code showing how to decode a JWT token"
expertTips:
  - "Never trust the decoded payload of a JWT for authorization without first verifying the signature on the backend."
  - "Use `decodeURIComponent(escape(atob(str)))` to correctly handle UTF-8 characters when decoding base64 in the browser."
  - "Always check the `exp` (expiry) claim locally to prevent unnecessary API calls with expired tokens."
faqs:
  - q: "Can I decode a JWT without the secret key?"
    a: "Yes. The header and payload of a JWT are merely base64url encoded, not encrypted. Anyone can decode and read the contents of a JWT without needing the secret key."
  - q: "Is a decoded JWT safe to display to users?"
    a: "Yes, provided the JWT doesn't contain sensitive information like passwords or PII. You should never store highly sensitive data in a JWT payload anyway."
  - q: "What is the difference between HS256 and RS256 in JWTs?"
    a: "HS256 is a symmetric algorithm using a single secret key to both sign and verify. RS256 is asymmetric, using a private key to sign the token and a public key to verify it."
  - q: "How do I check if a JWT is expired in JavaScript?"
    a: "Extract the `exp` claim from the payload and multiply it by 1000 (since it's in seconds). Compare it against `Date.now()`. If `exp * 1000 < Date.now()`, the token is expired."
steps:
  - name: "Split the Token"
    text: "Divide the token string into its header, payload, and signature components using the dot (.) delimiter."
  - name: "Base64URL Decode"
    text: "Replace URL-safe characters and add padding before using atob() to decode the base64 string."
  - name: "Parse the JSON"
    text: "Use JSON.parse() to convert the decoded string into a readable JavaScript object containing the claims."
---

✓ Last tested: May 2026 · Verified against RFC 7519

# How to Decode a JWT Token Without Any Library

## 1. Field Notes: The Phantom Auth Bug

It was 2023, and I was debugging a legacy React application that kept unexpectedly logging users out. The app relied on a third-party authentication service that issued JSON Web Tokens (JWTs).

The console was flooded with `401 Unauthorized` errors, but the tokens *looked* fine. They were present in `localStorage`, and the network requests were sending them in the `Authorization: Bearer` header.

My first instinct was to `npm install jwt-decode` to inspect the token's expiry. But the project had a strict dependency policy, and every new package required a security review that could take days.

I realized: *A JWT token is just three base64url strings separated by dots.* You don't need `jwt-decode`, `jsonwebtoken`, or any npm package to read it. I opened the Chrome DevTools console and wrote a quick snippet to slice the token, decode the base64 payload using `atob()`, and parse the JSON. 

```javascript
const payload = JSON.parse(atob(token.split('.')[1]));
console.log(new Date(payload.exp * 1000));
```

The issue became immediately clear: the `exp` (expiry) claim was set to just 5 minutes, but the frontend was trying to refresh the token every 10 minutes. The fix was a one-line configuration change. This experience taught me a valuable lesson: understand the underlying data structures before reaching for a library.

A JSON Web Token (JWT) is a compact, URL-safe token format defined in RFC 7519. It consists of three parts: `Header.Payload.Signature`, each base64url-encoded.

---

## 2. What Is Inside a JWT Token?

<div className="bg-gray-100 p-4 rounded-lg my-6">
  <strong>Answer:</strong> A JWT contains three parts separated by dots: the Header (metadata about the token), the Payload (the actual data or claims), and the Signature (used to verify the token hasn't been tampered with).
</div>

### The Header — Algorithm and Type
The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 (HS256) or RSA (RS256).
When base64url encoded, this forms the first part of the JWT.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### The Payload — Claims and Expiry
The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are registered, public, and private claims.

```json
{
  "sub": "1234567890",
  "name": "Abu Sufyan",
  "admin": true,
  "exp": 1717200000
}
```

### The Signature — What It Proves (and What It Doesn't)
To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
The signature is used to verify the message wasn't changed along the way. *It does not encrypt the payload.* Anyone who intercepts the token can read the header and payload, which is why you must never put secrets (like passwords) in a JWT.

---

## 3. How to Decode a JWT in Plain JavaScript (No Library)

You can decode a JWT natively in any modern browser console or Node.js environment (v16+) without installing any dependencies. Here is the step-by-step process.

### Step 1 — Split the Token Into Three Parts

A JWT is delimited by periods (`.`). We can use the JavaScript `String.prototype.split()` method to separate the components.

```javascript
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI... (truncated)";
const [headerB64, payloadB64, signatureB64] = token.split('.');
```

### Step 2 — Base64URL Decode Each Part

JWTs use *Base64URL* encoding, not standard Base64. This means `+` is replaced by `-`, `/` is replaced by `_`, and trailing padding `=` characters are omitted.
To decode it using the browser's `atob()` function, we need to convert it back to standard Base64 by fixing the characters and adding the necessary padding.

```javascript
function base64UrlDecode(str) {
  // Replace non-url compatible chars with base64 standard chars
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  
  // Pad out with standard base64 required padding characters
  const pad = str.length % 4;
  if (pad) {
    if (pad === 1) {
      throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding');
    }
    str += new Array(5 - pad).join('=');
  }

  // Decode base64 to string and handle UTF-8 characters properly
  return decodeURIComponent(escape(atob(str)));
}
```
*Note on Node.js:* If you are in Node.js, you can simply use `Buffer.from(str, 'base64url').toString('utf-8')`.

### Step 3 — Parse the JSON and Read Claims

Once we have the decoded JSON string, we can parse it into a JavaScript object.

```javascript
const payloadStr = base64UrlDecode(payloadB64);
const payloadObj = JSON.parse(payloadStr);

console.log(payloadObj);
// Output: { sub: "1234567890", name: "Abu Sufyan", admin: true, exp: 1717200000 }
```

### Step 4 — Check the exp Claim for Expiry

One of the most common reasons to decode a JWT on the frontend is to check if it's expired before making an API request. The `exp` claim is a Unix timestamp in seconds.

```javascript
function isTokenExpired(payloadObj) {
  if (!payloadObj.exp) return false; // Token doesn't expire
  
  const expiryTimeMs = payloadObj.exp * 1000;
  return Date.now() > expiryTimeMs;
}

console.log("Is token expired?", isTokenExpired(payloadObj));
```

---

## 4. Why You Cannot Verify the Signature Without the Secret

<div className="bg-gray-100 p-4 rounded-lg my-6">
  <strong>Answer:</strong> Verifying a signature requires the cryptographic key used to create it. For symmetric algorithms (HS256), you need the exact same secret. For asymmetric algorithms (RS256), you need the public key corresponding to the private key used for signing. Without the key, you can only *read* the token, not *trust* it.
</div>

It is critical to understand the distinction between decoding and verifying.

| Feature | JWT Decode | JWT Verify |
| :--- | :--- | :--- |
| **Action** | Translates Base64URL to JSON | Re-calculates signature and compares it |
| **Requires Key?** | No | Yes (Secret or Public Key) |
| **Environment** | Frontend (Browser) or Backend | Backend (Server) |
| **Security Risk** | Safe (Just reading data) | Critical (Validates authenticity) |
| **Use Case** | Extracting UI state, checking expiry | Authenticating API requests |

Never authorize an action on the backend based solely on a decoded JWT payload. You must always verify the signature first.

---

## 5. Common JWT Decode Errors and Fixes

When writing your own JWT decoding logic, you might encounter a few common errors.

### "Invalid base64" — Padding Issue Fix
If you pass a raw base64url string to `atob()`, it will throw a `DOMException: The string to be decoded is not correctly encoded.` This happens because `atob()` expects standard Base64 padding (the `=` characters). Always ensure your `base64UrlDecode` function appends the necessary padding, as demonstrated in Step 2.

### "Unexpected token" — Malformed Payload Fix
If `JSON.parse()` throws a `SyntaxError: Unexpected token`, it means the decoded string is not valid JSON. This usually occurs if the token is truncated, corrupted, or if UTF-8 characters were not handled correctly during decoding. Using `decodeURIComponent(escape(atob(str)))` is a robust way to prevent UTF-8 parsing issues in the browser.

### Token Shows Expired But It Shouldn't — Clock Skew Explanation
Sometimes a token appears expired locally but works on the server. This is caused by **clock skew** — your user's local device time is slightly ahead of or behind the server's time. When checking expiry locally, it's best practice to allow a small buffer (e.g., 60 seconds) for clock skew.

```javascript
const CLOCK_SKEW_MS = 60000;
const isExpired = Date.now() > (payloadObj.exp * 1000) + CLOCK_SKEW_MS;
```

---

## 6. JWT Decode vs JWT Verify — Key Differences

To summarize the differences and when to use each approach:

| Action | Environment | Needs Library? | Needs Key? | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Inspect** | Offline/Tools | No | No | Debugging token structure and contents. |
| **Decode** | Frontend | No | No | Reading claims (like User ID or Expiry) for UI logic. |
| **Verify (HS256)** | Backend | Yes | Yes (Secret) | Ensuring the token was signed by your server. |
| **Verify (RS256)** | Backend | Yes | Yes (Public Key)| Ensuring the token was signed by a trusted issuer. |
| **Refresh** | Backend/Frontend| N/A | N/A | Obtaining a new token when the current one expires. |

---

## 7. Best Practices for Handling JWTs in 2026

When working with JSON Web Tokens, adherence to security best practices is non-negotiable.

1.  **Never Store Sensitive Data in the Payload:** JWTs are encoded, not encrypted. Anyone can read the payload. Do not include passwords, social security numbers, or sensitive PII.
2.  **Keep Tokens Short-Lived:** Use an `exp` claim of 15 minutes or less for access tokens. Use secure refresh tokens to maintain sessions.
3.  **Validate on the Backend:** Always use a robust library (like `jsonwebtoken` in Node) on your server to verify the signature before processing requests.
4.  **Avoid `localStorage`:** Storing JWTs in `localStorage` makes them vulnerable to Cross-Site Scripting (XSS) attacks. Store them in memory or in HttpOnly cookies if possible.
5.  **Check Expiry Locally:** Decode the token on the frontend to check the `exp` claim and preemptively refresh it before making an API call.
6.  **Use Asymmetric Keys (RS256):** For distributed systems, use RS256 instead of HS256. It allows other services to verify the token using a public key without exposing the private signing key.

---

Use our free Offline JWT Decoder to inspect tokens instantly without any server round-trips. Use our free [Offline JWT Decoder](/tools/jwt-decoder/) to decode headers and payloads safely in your browser →

Also, check out our [JWT signing guide](/blog/jwt-signing-guide) for backend implementations, our [password entropy tester](/tools/password-entropy-tester/) to ensure strong credentials, and our [hash generator](/tools/hash-generator/) for cryptographic utilities.

---

## External Sources

- [RFC 7519: JSON Web Token (JWT)](https://datatracker.ietf.org/doc/html/rfc7519)
- [OWASP JSON Web Token Cheat Sheet for Java](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
- [MDN Web Docs: atob()](https://developer.mozilla.org/en-US/docs/Web/API/atob)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: May 2026
