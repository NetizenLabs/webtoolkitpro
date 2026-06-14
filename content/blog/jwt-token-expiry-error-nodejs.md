---
title: "JWT Token Expiry Error Fix — Node.js 2026"
slug: "jwt-token-expiry-error-nodejs"
meta-description: "Fix JWT TokenExpiredError in Node.js and Express. Learn how to handle server clock skew, implement refresh tokens, and use the jsonwebtoken library correctly."
meta-keywords: "jwt token expiry error fix nodejs, TokenExpiredError, JWT clock skew, Express JWT fix, refresh token nodejs, verify jwt express, jsonwebtoken expiry"
canonical: "https://wtkpro.site/blog/jwt-token-expiry-error-nodejs/"
article:published_time: "2026-05-31"
article:modified_time: "2026-06-14"
article:author: "Abu Sufyan"
article:section: "Developer Tools"
article:tag: "Node.js, JWT, Express, Debugging"
og:title: "Fix JWT TokenExpiredError in Node.js and Express"
og:description: "Fix JWT TokenExpiredError in Node.js and Express. Covers clock skew, refresh token logic, and robust error handling."
og:image: "https://wtkpro.site/blog/jwt-token-expiry-error-nodejs.jpg"
og:type: "article"
twitter:card: "summary_large_image"
robots: "index, follow"
---

[Home](https://wtkpro.site/) / [Blog](https://wtkpro.site/blog/) / JWT Token Expiry Error Fix — Node.js 2026

# Fix JWT TokenExpiredError in Node.js and Express

**How to eliminate false-positive token expiries by configuring clock tolerance and handling Unix timestamps correctly.**

*Published May 31, 2026 · Last updated June 14, 2026 · By [Abu Sufyan](https://github.com/abusufyan-netizen), Full-Stack Systems Engineer*

---

## Quick Answer

To fix a `TokenExpiredError` in Node.js, you must add a `clockTolerance` configuration to your `jsonwebtoken.verify()` method. This accounts for minor system clock drift between the server that generated the token and the server validating it. Additionally, ensure you are setting your `exp` (expiration) claim in Unix seconds (not milliseconds), and return a specific `401` error code to trigger a silent token refresh on the frontend.

👉 **[Try the JWT Decoder Generator free →](/tools/jwt-decoder-generator/)** — Safely decode and inspect your token's exact `exp` timestamp in your browser to verify your Node.js signing logic.

---

## Why This Happens (In-Depth Analysis)

At 2 AM on a Tuesday, during a standard microservices deployment, users began getting randomly logged out in the middle of long-form data entry. The Node.js error logs were flooded with this exact stack trace:

```text
JsonWebTokenError: jwt expired
    at /app/node_modules/jsonwebtoken/verify.js:152:21
```

The tokens were set to expire in 15 minutes (`expiresIn: '15m'`), and the React client was programmed to silently refresh them at 14 minutes. It should have been a seamless experience. Why was the token expiring *before* the 15 minutes were up?

The root cause was **Server Clock Skew**.

JWTs (JSON Web Tokens) are stateless. The `exp` claim is a static timestamp embedded within the token payload. When an API server validates a JWT, it compares the `exp` timestamp against its own local system clock.

In a distributed microservice architecture, server clocks are rarely in perfect sync. Even with NTP (Network Time Protocol) running across your AWS or Vercel infrastructure, a drift of 1 to 5 seconds is highly common. If the Authentication Server (which generates the token) is running 5 seconds behind the API Server (which validates the token), a token that technically has 4 seconds of life remaining will be rejected by the API Server as "expired."

By default, the popular `jsonwebtoken` library is aggressively exact to the millisecond. It does not forgive clock drift.

Furthermore, a secondary issue often arises from JavaScript's native date handling. JavaScript's `Date.now()` returns milliseconds, but the official JWT RFC 7519 specification mandates that the `exp` claim must be in **seconds** since the Unix epoch. Passing milliseconds into the `exp` claim will cause immediate `TokenExpiredError` failures depending on how the receiving library parses the integer limit.

---

## How to Fix It (Step-by-Step Tutorial)

### 1. Add `clockTolerance` to `verify()`

Update your authentication middleware to accept a margin of error for the expiration time. A `clockTolerance` of 30 seconds is the industry standard recommendation.

```javascript
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'UNAUTHORIZED' });

  // Add clockTolerance (in seconds) to handle server time drift
  jwt.verify(token, process.env.JWT_SECRET, { clockTolerance: 30 }, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          error: 'TOKEN_EXPIRED',
          message: 'Access token has expired',
          expiredAt: err.expiredAt
        });
      }
      return res.status(403).json({ error: 'INVALID_TOKEN' });
    }
    
    req.user = user;
    next();
  });
};
```

### 2. Standardize Unix Timestamps

If you are manually passing an `exp` claim into your `jwt.sign()` method rather than using the `expiresIn` string shortcut, you must use `Math.floor()` to strip the milliseconds.

```javascript
// ❌ BAD: Returns milliseconds, causing immediate expiration or overflow
const badToken = jwt.sign({ userId: 123, exp: Date.now() + 3600000 }, secret);

// ✅ GOOD: Divide by 1000 to convert to Unix seconds
const goodToken = jwt.sign({ 
  userId: 123, 
  exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
}, secret);
```

### 3. Implement Silent Refresh Logic (Axios Interceptor)

Once your backend correctly returns the specific `TOKEN_EXPIRED` error payload, your frontend must intercept this response and attempt a silent refresh using a long-lived refresh token stored in an `HttpOnly` cookie.

```javascript
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Check for the exact error code we set in Express
    if (error.response?.status === 401 && error.response.data?.error === 'TOKEN_EXPIRED' && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to get a new token via the refresh endpoint
        const res = await axios.post('/api/auth/refresh', {}, { withCredentials: true });
        const newToken = res.data.accessToken;
        
        // Update header and retry the original request
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Refresh token is also expired or invalid; force logout
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
```

### Faster way: use the JWT Decoder Generator

When debugging "jwt expired" errors, you need to verify exactly what timestamp is embedded inside the payload. Instead of writing custom console logs in your Node.js server, simply copy the token from your browser's Network tab and paste it into the [JWT Decoder Generator](/tools/jwt-decoder-generator/). This tool runs entirely offline in your browser, decoding the payload instantly and converting the Unix timestamp into a human-readable local time string, allowing you to quickly spot timezone or millisecond conversion errors.

---

## Edge Cases Most Guides Miss

**The Next.js Edge Runtime Clock Sync**
If you are deploying your API to Vercel Edge functions or Cloudflare Workers, you must be aware that the `Date.now()` execution time inside a V8 Isolate is often frozen at the exact millisecond the HTTP request arrived, to protect against Spectre timing attacks. This can cause bizarre edge cases where multiple synchronous token verifications within the same request lifecycle yield identical timestamp validations, occasionally bypassing intended rapid-expiry checks.

**RS256 vs HS256 Expiry Hijacking**
Using the default `HS256` symmetric algorithm means all microservices share the same secret key. If a secondary server is compromised, an attacker can generate a new token with an artificially inflated `exp` timestamp set 100 years in the future. To prevent this, always upgrade to `RS256` (Asymmetric Cryptography). The Auth server signs the token with a Private Key, and API servers only verify it using a Public Key, making token forging impossible.

---

## Comprehensive FAQ

### What is the default JWT expiry in the Node.js jsonwebtoken package?
By default, the `jsonwebtoken` package does not set an expiration unless you explicitly pass the `expiresIn` option during the `sign()` call. If omitted entirely, the generated token is valid indefinitely and can only be invalidated through a stateful database blocklist.

### How do I set JWT expiry to exactly 24 hours?
You can pass the string `expiresIn: '24h'` in the `sign()` method options. Alternatively, you can calculate the exact Unix timestamp for 24 hours from now (`Math.floor(Date.now() / 1000) + 86400`) and manually inject it into the payload's `exp` claim.

### Can I extend a JWT's expiration without re-authenticating the user?
No. A signed JWT's payload cannot be modified or extended. Altering the `exp` claim alters the payload structure, which entirely invalidates the cryptographic signature. You must issue a brand new JWT access token, typically by exchanging a valid refresh token at your auth endpoint.

### What is the recommended lifespan for an access token?
Access tokens should have a very short lifespan, typically between 10 to 15 minutes. Because access tokens are stateless and cannot be easily revoked without significant backend overhead, a short lifespan minimizes the vulnerability window if the token is compromised via XSS or network sniffing.

---

## About the Author

**Abu Sufyan** — Full-stack software engineer specializing in Node.js microservices, OAuth2.0 architectures, and secure state management. Founder of WebToolkit Pro. [GitHub](https://github.com/abusufyan-netizen)

---

**Related tools:**
- [JWT Decoder Generator](/tools/jwt-decoder-generator/) — Securely inspect your JSON Web Tokens offline.
- [Base64 Encoder/Decoder](/tools/base64-encode-decode/) — Quickly encode or decode standard Base64 payloads utilized in JWT headers.

---

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "JWT Token Expiry Error Fix — Node.js 2026",
  "description": "Fix JWT TokenExpiredError in Node.js and Express. Learn how to handle server clock skew, implement refresh tokens, and use the jsonwebtoken library correctly.",
  "datePublished": "2026-05-31",
  "dateModified": "2026-06-14",
  "author": {
    "@type": "Person",
    "name": "Abu Sufyan",
    "url": "https://github.com/abusufyan-netizen"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WebToolkit Pro",
    "url": "https://wtkpro.site"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://wtkpro.site/blog/jwt-token-expiry-error-nodejs/"
  }
}
```

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the default JWT expiry in the Node.js jsonwebtoken package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By default, the jsonwebtoken package does not set an expiration unless you explicitly pass the expiresIn option during the sign() call. If omitted entirely, the generated token is valid indefinitely and can only be invalidated through a stateful database blocklist."
      }
    },
    {
      "@type": "Question",
      "name": "How do I set JWT expiry to exactly 24 hours?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can pass the string expiresIn: '24h' in the sign() method options. Alternatively, you can calculate the exact Unix timestamp for 24 hours from now (Math.floor(Date.now() / 1000) + 86400) and manually inject it into the payload's exp claim."
      }
    },
    {
      "@type": "Question",
      "name": "Can I extend a JWT's expiration without re-authenticating the user?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A signed JWT's payload cannot be modified or extended. Altering the exp claim alters the payload structure, which entirely invalidates the cryptographic signature. You must issue a brand new JWT access token, typically by exchanging a valid refresh token at your auth endpoint."
      }
    },
    {
      "@type": "Question",
      "name": "What is the recommended lifespan for an access token?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Access tokens should have a very short lifespan, typically between 10 to 15 minutes. Because access tokens are stateless and cannot be easily revoked without significant backend overhead, a short lifespan minimizes the vulnerability window if the token is compromised via XSS or network sniffing."
      }
    }
  ]
}
```
