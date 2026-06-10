---
title: "SSL Certificate Expired — How to Check and Fix 2026"
seoTitle: "SSL Certificate Expired? How to Check & Fix Errors in 2026"
description: "Check if your SSL certificate is expired and fix it before Google flags your site as insecure. Covers Let's Encrypt renewal, Cloudflare SSL, and common errors."
date: '2026-06-05'
category: "Security Tools"
tags: ["Security", "SSL", "TLS", "DevOps"]
keywords: ["ssl certificate checker expired how to fix", "ssl certificate expired", "net err_cert_date_invalid", "renew lets encrypt"]
readTime: '6 min read'
tldr: "An expired SSL certificate results in a severe 'Connection is not private' browser warning, killing user trust and SEO. Diagnose the issue by checking the expiration date, ensure port 80/443 are open, and renew via Let's Encrypt Certbot or your CDN dashboard."
author: "Abu Sufyan"
image: "/blog/ssl-certificate-expired-check-fix.jpg"
imageAlt: "Browser warning showing NET::ERR_CERT_DATE_INVALID"
expertTips:
  - "Always automate Let's Encrypt renewals via a cron job (`0 0 1 * * certbot renew --quiet`). Certificates expire every 90 days."
  - "If you use Cloudflare, ensure your SSL mode is set to 'Full (Strict)' to prevent infinite redirect loops while keeping end-to-end encryption."
  - "Do not ignore mixed content warnings. Even if your SSL is valid, loading HTTP images on an HTTPS page will break the secure padlock icon."
faqs:
  - q: "What happens when an SSL certificate expires?"
    a: "Browsers like Chrome and Safari will block users from accessing the site, displaying a massive red warning (`NET::ERR_CERT_DATE_INVALID`). Search engines will also drop your rankings."
  - q: "Is Let's Encrypt SSL good enough?"
    a: "Yes. Let's Encrypt provides domain-validated (DV) certificates using the same 256-bit encryption as paid certificates. Unless you are a bank needing Extended Validation (EV), it is the industry standard."
steps:
  - name: "Identify the Error"
    text: "Confirm the exact error code (e.g., ERR_CERT_DATE_INVALID vs ERR_CERT_AUTHORITY_INVALID)."
  - name: "Check Expiry"
    text: "Use an SSL checker to see exactly when the certificate expired and who issued it."
  - name: "Renew/Replace"
    text: "Run your renewal script on the server, or issue a new certificate via your hosting dashboard."
---

✓ Last tested: June 2026 · Verified against TLS 1.3 standards

## 1. Field Notes: The Black Friday Blackout

<!--
  SECTION PURPOSE: The Personal Hook
-->

It was Black Friday 2023. At 11:45 PM on Thursday, a frantic client called me: "The website is hacked! Nobody can buy anything."

I checked the site. It wasn't hacked. The screen showed the dreaded `NET::ERR_CERT_DATE_INVALID` error. Their paid SSL certificate had quietly expired at 11:30 PM. The internal team thought the billing department had auto-renewed it. They hadn't.

While the billing team was asleep, I ssh'd into the server, bypassed the old paid certificate provider entirely, installed `certbot`, and provisioned a free Let's Encrypt certificate in 3 minutes. The site came back online 5 minutes before midnight. 

The lesson? Never rely on manual SSL renewals. Automate it, and actively monitor your expiry dates.

---

## 2. Why SSL Certificates Expire and How to Get Ahead of It

SSL (TLS) certificates do not last forever by design. Security standards require periodic rotation of cryptographic keys to prevent long-term compromise. 

*   **Paid Certificates:** Usually expire after 1 year.
*   **Let's Encrypt:** Expire strictly after 90 days.

If you don't renew them before the expiration date, browsers intercept the connection and block the user to protect them from man-in-the-middle attacks.

---

## 3. How to Renew a Let's Encrypt Certificate

If you manage your own VPS (Ubuntu/Nginx/Apache), you likely use Certbot. 

To manually renew a certificate that is close to expiry (or already expired):
```bash
sudo certbot renew
```

**Crucial Automation:** You should never run this manually. Set up a cron job to run it automatically. Certbot will only actually renew certificates that are within 30 days of expiry.

```bash
# Add this to crontab -e
0 3 * * * /usr/bin/certbot renew --quiet --post-hook "systemctl reload nginx"
```

---

## 4. How to Fix SSL Errors by Hosting Provider

### Cloudflare
If you are using Cloudflare, SSL is usually handled at the Edge. If you see an SSL error:
1. Go to SSL/TLS -> Overview.
2. Ensure your SSL mode is **Full (Strict)** if your origin server has an SSL cert. If your origin server SSL expired, Cloudflare will throw a 526 error.
3. Fix: Generate a Cloudflare Origin Certificate (valid for 15 years) and install it on your server.

### Vercel / Netlify
These platforms handle Let's Encrypt renewals automatically. If an SSL error occurs here, it is usually a DNS misconfiguration. Ensure your A Records and CNAMEs match their requirements precisely.

---

## 5. Common SSL Certificate Errors and What They Mean

| Error Code | What it Means | How to Fix It |
|---|---|---|
| `ERR_CERT_DATE_INVALID` | The certificate has expired. | Renew the certificate immediately. |
| `ERR_CERT_AUTHORITY_INVALID` | The certificate was self-signed or the issuer is not trusted. | Install a certificate from a trusted CA like Let's Encrypt. |
| `ERR_CERT_COMMON_NAME_INVALID` | The certificate does not match the domain (e.g., cert is for `site.com` but you visited `www.site.com`). | Issue a new cert that covers both the root and `www` subdomains. |

---

Don't wait for your customers to tell you your site is broken. Use our free [SSL/TLS Certificate Checker](/tools/ssl-checker/) to instantly audit your certificate chain, expiry dates, and TLS protocol support →

---

## 6. Recommended Providers (Affiliate)

If you are looking to purchase a multi-year SSL certificate or upgrade your domain registrar, we highly recommend:
- **[Namecheap](https://namecheap.pxf.io/wtkpro)**: They offer some of the most affordable PositiveSSL and EV certificates on the market, along with excellent domain registration services.
- **[Cloudflare](https://cloudflare.com/)**: For automated edge SSL management and a robust Web Application Firewall.

---

## External Sources
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: June 2026
