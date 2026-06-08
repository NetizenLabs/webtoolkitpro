# SSL Certificate Expired — How to Check and Fix 2026

✓ Last tested: June 2026 · Verified against TLS 1.3 standards

## 1. Field Notes: The Black Friday Blackout



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

Don't wait for your customers to tell you your site is broken. Use our free [SSL/TLS Certificate Checker](https://wtkpro.site/) to instantly audit your certificate chain, expiry dates, and TLS protocol support →

---

## External Sources
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: June 2026

---

*Originally published on [WebToolkit Pro](https://wtkpro.site/blog/ssl-certificate-expired-check-fix/). Explore our suite of 145+ free, privacy-first developer utilities at [wtkpro.site](https://wtkpro.site/).*