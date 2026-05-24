---
title: "20 Practical Cron Expression Examples for SysAdmins"
description: "Master cron syntax with 20 production-ready cron expression examples for database backups, log rotation, queue management, and server automation."
date: '2026-05-18'
category: "Developer Tools"
tags: ["Cron", "Backend", "DevOps", "Automation", "SysAdmin"]
keywords: ["cron expression examples", "cron job examples", "database backup cron", "laravel queue cron", "github actions schedule", "crontab syntax format", "cron schedule interval", "crontab examples linux", "real world cron examples", "simple cron example format"]
readTime: '9 min read'
tldr: "Writing cron expressions from memory is prone to error. A single misplaced operator can trigger a script to execute every second instead of every month. This guide provides 20 battle-tested, copy-paste cron examples for common infrastructure tasks like database backups, log rotations, and queue management."
author: "Abu Sufyan"
image: "/blog/cron-builders.jpg"
imageAlt: "Cron expression examples shown in a terminal"
expertTips:
  - "When setting up cron jobs that run scripts, always export your PATH environment variable at the top of your crontab file. The cron daemon runs in a highly restricted shell environment and often cannot find binaries like 'node' or 'python' by default."
faqs:
  - q: "What does * * * * * mean in cron?"
    a: "It represents a wildcard trigger that executes your command at every single minute, of every hour, of every day, of every month, and on every day of the week."
  - q: "How do I write a cron expression for every 5 minutes?"
    a: "Use the expression '*/5 * * * *'."
  - q: "How do I schedule a job to run at midnight every day?"
    a: "Use the expression '0 0 * * *'."
---

✓ Last tested: May 2026 · Validated against Vixie Cron (Standard Linux)

## Observations on Scheduling Infrastructure Tasks

While setting up background workers across various projects, I frequently notice how easy it is to misconfigure cron schedules. Despite being a staple of Unix-like systems for decades, the classic five-field syntax is notoriously easy to get wrong. 

In my experience reviewing system configurations, a common pattern emerges: developers rely on memory rather than reference materials, leading to scripts executing either far too often (exhausting server memory) or never at all. 

Instead of guessing, it is generally safer to maintain a trusted library of reference expressions. Below is a compilation of the exact cron schedules I use for standard infrastructure tasks, categorized by their typical use cases.

---

## 1. The 5-Field Standard Matrix

Before copying expressions, it is helpful to review the standard Linux crontab structure:

```
  ┌───────────── Minute (0 - 59)
  │ ┌─────────── Hour (0 - 23)
  │ │ ┌───────── Day of the Month (1 - 31)
  │ │ │ ┌─────── Month of the Year (1 - 12)
  │ │ │ │ ┌───── Day of the Week (0 - 6) (0 is Sunday)
  │ │ │ │ │
  * * * * *  /usr/bin/script.sh
```

## 2. System Backups & Log Rotations

Backups are generally scheduled during off-peak hours to minimize the impact on database performance.

*   **Every day at 2:00 AM:** `0 2 * * *`
    *   *Observation:* Ideal for daily database dumps.
*   **Every Sunday at 3:00 AM:** `0 3 * * 0`
    *   *Observation:* Often used for heavy, weekly full-system snapshots.
*   **First day of every month at midnight:** `0 0 1 * *`
    *   *Observation:* Standard for rotating application logs and generating monthly reports.

## 3. High-Frequency Queue Management

When managing queues (like Redis or RabbitMQ workers), you often need scripts that run continuously.

*   **Every single minute:** `* * * * *`
    *   *Observation:* Standard for heartbeats or triggering queue listeners.
*   **Every 5 minutes:** `*/5 * * * *`
    *   *Observation:* Commonly used for polling third-party APIs where rate limits are a concern.
*   **Every 15 minutes:** `*/15 * * * *`
    *   *Observation:* Useful for syncing less critical data, like updating cached analytics.

## 4. Business Hours Automation

For tasks that should only occur when the team is online (e.g., sending notification digests).

*   **Every weekday at 9:00 AM:** `0 9 * * 1-5`
    *   *Observation:* Triggers morning summary emails Monday through Friday.
*   **Every hour between 9 AM and 5 PM on weekdays:** `0 9-17 * * 1-5`
    *   *Observation:* Useful for monitoring scripts that only need to run during business hours.

## 5. Handling Edge Cases

*   **Run on the 15th of the month at noon:** `0 12 15 * *`
*   **Run every 30 minutes on weekends:** `*/30 * * * 0,6`
*   **Run quarterly (Jan, Apr, Jul, Oct) on the 1st:** `0 0 1 1,4,7,10 *`

## Conclusion

Building a reliable backend architecture requires predictable scheduling. By standardizing the cron expressions used across your team, you reduce the likelihood of accidental overlaps and execution failures. 

---

Validate and customize these expressions visually before deploying them to your servers. Try our client-side [Cron Expression Generator](/tools/cron-generator/) →

---

## External Sources
- [Crontab manual (man 5 crontab)](https://man7.org/linux/man-pages/man5/crontab.5.html)

---

**Abu Sufyan** · Full-stack developer · Founder of WebToolkit Pro
[Github](https://github.com/abusufyan-netizen)

Last updated: May 2026
