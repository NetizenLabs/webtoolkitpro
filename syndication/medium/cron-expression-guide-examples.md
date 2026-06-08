# Cron Expression Guide — Examples & Generator 2026

✓ Last tested: June 2026 · Verified against standard Vixie Cron implementation

## 1. Field Notes: The Timezone Trap



Early in my career, I deployed a database backup script using a cron job set to `0 2 * * *` (2:00 AM daily). I wanted the backup to happen during the lowest traffic window for our US-based users.

A week later, the database crashed at 9:00 PM EST due to IO exhaustion. Why? The AWS EC2 instance was running in UTC. 2:00 AM UTC is 9:00 PM EST—smack in the middle of prime time. 

The lesson? A cron expression is just a string of characters. It has no concept of geography. You must always align your cron schedules to the server's local timezone configuration, which in 2026 should always be UTC.

---

## 2. Cron Expression Syntax — The 5 Fields Explained

A standard cron expression consists of five fields separated by spaces. (Some systems, like AWS CloudWatch or Quartz, use 6 fields to include seconds or years, but standard Linux cron uses 5).

```text
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of the week (0 - 7) (0 and 7 are both Sunday)
│ │ │ └──── Month (1 - 12)
│ │ └────── Day of the month (1 - 31)
│ └──────── Hour (0 - 23)
└────────── Minute (0 - 59)
```

### Special Characters
*   `*` (Asterisk): Matches all values. (e.g., `*` in the hour field means "every hour").
*   `,` (Comma): Separates items in a list. (e.g., `1,15` in the minute field means "at minute 1 and 15").
*   `-` (Hyphen): Defines a range. (e.g., `9-17` in the hour field means "between 9 AM and 5 PM").
*   `/` (Slash): Specifies increments. (e.g., `*/10` in the minute field means "every 10 minutes").

---

## 3. 20 Ready-to-Use Cron Expression Examples

Stop guessing. Here are the most common schedules you will actually use in production.

### High Frequency
*   **Every minute:** `* * * * *`
*   **Every 5 minutes:** `*/5 * * * *`
*   **Every 15 minutes:** `*/15 * * * *`
*   **Every 30 minutes:** `*/30 * * * *`

### Hourly Schedules
*   **Every hour, on the hour:** `0 * * * *`
*   **Every 2 hours:** `0 */2 * * *`
*   **At minute 15 past every hour:** `15 * * * *`

### Daily Schedules
*   **Midnight every day:** `0 0 * * *`
*   **Every day at 2:30 AM:** `30 2 * * *`
*   **Every day at 8:00 AM and 8:00 PM:** `0 8,20 * * *`

### Weekly Schedules
*   **Every Sunday at midnight:** `0 0 * * 0`
*   **Every Monday at 9:00 AM:** `0 9 * * 1`
*   **Monday through Friday at 5:00 PM (Business close):** `0 17 * * 1-5`
*   **Weekends only, at noon:** `0 12 * * 0,6`

### Monthly / Yearly Schedules
*   **First day of every month at midnight:** `0 0 1 * *`
*   **15th of every month at 3:00 AM:** `0 3 15 * *`
*   **January 1st at midnight (Happy New Year):** `0 0 1 1 *`

---

## 4. Cron in Kubernetes — What's Different?

If you are writing a Kubernetes `CronJob` manifest, the syntax is identical to standard Linux cron. However, Kubernetes adds a crucial behavior parameter: `concurrencyPolicy`.

If your job takes 10 minutes to run, but your cron is scheduled every 5 minutes (`*/5 * * * *`), Kubernetes will overlap the pods. You must set `concurrencyPolicy: Forbid` in your YAML if your script cannot handle concurrent executions safely.

---

## 5. Common Cron Expression Mistakes

1.  **The Day/Date OR Trap:** If you write `0 0 1 * 1`, you might think this means "Run at midnight on the first of the month, BUT ONLY if it's a Monday." Wrong. It means "Run on the first of the month, OR if it is a Monday."
2.  **Using Seconds:** Writing `0 * * * * *` (6 fields) will crash standard crontab, as it expects 5 fields.
3.  **Environment Variables:** Scripts run by cron execute in a highly restricted shell. Your `~/.bashrc` is not loaded. Always use absolute paths to node/python binaries inside your scripts.

---

Need to translate a complex schedule into cron syntax? Use our free [Cron Expression Generator](https://wtkpro.site/) to build and validate your schedule instantly →

---

## External Sources
- [Ubuntu Cron How-To](https://help.ubuntu.com/community/CronHowto)
- [Kubernetes CronJob Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: June 2026

---

*Originally published on [WebToolkit Pro](https://wtkpro.site/blog/cron-expression-guide-examples/). Explore our suite of 145+ free, privacy-first developer utilities at [wtkpro.site](https://wtkpro.site/).*