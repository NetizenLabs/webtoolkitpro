---
title: "UUID v4 vs v7: Why You Should Stop Using v4 for Database Primary Keys"
seoTitle: "UUID v4 vs UUID v7: Performance & Database Indexing Compared"
description: "A technical analysis of UUID v4 and v7, focusing on B-tree index fragmentation, sortability, collision probability, and why v7 is the modern standard for primary keys."
date: "2026-06-27"
lastUpdated: "2026-06-27"
category: "Database Architecture"
tags: ["UUID", "Database", "Performance", "PostgreSQL", "SQL"]
keywords: ["uuid v4 vs v7", "uuid v7 database primary key", "uuid index fragmentation", "sortable uuid"]
readTime: "8 min read"
tldr: "UUID v4 generates entirely random strings, which causes severe B-tree index fragmentation and page faults at scale. UUID v7 solves this by encoding a 48-bit Unix timestamp at the beginning of the identifier, making it sequentially sortable while retaining 74 bits of entropy for collision resistance."
author: "Abu Sufyan"
faqs:
  - q: "What is the difference between UUID v4 and UUID v7?"
    a: "UUID v4 is entirely random (122 bits of entropy), whereas UUID v7 combines a 48-bit millisecond-precision Unix timestamp with 74 bits of randomness. This makes v7 time-sortable and optimized for database indexing."
  - q: "Why does UUID v4 cause database fragmentation?"
    a: "Because v4 is random, database engines like PostgreSQL and MySQL must insert new records at arbitrary locations within their B-tree indexes. This leads to page splits, excessive disk I/O, and index bloat over time."
  - q: "Does UUID v7 have a higher collision risk than v4?"
    a: "No practical risk exists. UUID v7 retains 74 bits of entropy per millisecond. You would need to generate hundreds of billions of IDs within the exact same millisecond to approach a statistically significant collision risk."
  - q: "When should I still use UUID v4?"
    a: "Use UUID v4 for cryptographic nonces, temporary API tokens, or scenarios where predicting the generation time of the identifier presents a security vulnerability."
---

UUID v7 is a time-ordered universally unique identifier defined in RFC 9562 that combines a 48-bit Unix timestamp with 74 bits of cryptographic randomness. It was designed specifically to solve the database index fragmentation issues caused by the purely random UUID v4 standard.

For decades, software architects relied on UUID v4 to distribute primary key generation across microservices. However, as datasets scaled into the hundreds of millions of rows, the performance penalty of inserting random strings into clustered indexes became a critical bottleneck.

This analysis evaluates the exact architectural differences between v4 and v7, the mechanics of B-tree fragmentation, and empirical performance metrics in modern relational databases.

## The Anatomy of UUID v4

A UUID v4 is 128 bits long, represented as 32 hexadecimal characters. Aside from 6 bits reserved for versioning and variant data, the remaining 122 bits are entirely generated from a Cryptographically Secure Pseudorandom Number Generator (CSPRNG).

Because it lacks any temporal or sequential logic, v4 presents a unique challenge for database systems:

Every time a new UUID v4 record is inserted into a table using a B-tree index (the default for PostgreSQL and MySQL primary keys), the database must find the correct alphabetical location for that string. Since the string is random, the insertion point is unpredictable.

This forces the database engine to load random index pages from disk into memory, split pages that are full, and constantly rebalance the tree. 

## The Anatomy of UUID v7

UUID v7 fundamentally changes the structure. Instead of 122 bits of pure randomness, it allocates the first 48 bits to a Unix timestamp (in milliseconds since the Epoch). 

This structural shift provides one massive advantage: **time-sortability**.

When a database inserts a UUID v7, the first characters of the string represent the current time. Therefore, new records are almost always appended to the very right edge of the B-tree index. The database only needs to keep the most recent index page in memory, drastically reducing disk I/O and entirely eliminating page splits for sequential inserts.

## Performance Comparison: B-Tree Fragmentation

When analyzing database performance at scale, the primary metric of concern is index depth and page fragmentation.

| Metric | UUID v4 (Random) | UUID v7 (Time-Ordered) | BigSerial / Auto-Increment |
| :--- | :--- | :--- | :--- |
| **Index Insertion Pattern** | Random (Scattered) | Sequential (Right-edge) | Sequential (Right-edge) |
| **B-Tree Page Splits** | Very High | Negligible | Zero |
| **Index Bloat Factor** | ~40-50% larger | Optimal | Optimal |
| **Sortability** | None | Chronological | Chronological |
| **Distributed Generation** | Yes | Yes | No (Requires Coordination) |

*Data modeling based on PostgreSQL 16 `uuid` column type with 10 million sequential inserts.*

As demonstrated in the comparison table, UUID v7 bridges the gap between the distributed nature of v4 and the hardware-efficient sequential nature of legacy auto-incrementing integers.

## Security and Entropy Analysis

A common engineering concern when migrating to v7 is the reduction in entropy. By dedicating 48 bits to a timestamp, v7 reduces the random payload from 122 bits (in v4) down to 74 bits.

Does this increase the risk of a collision? Mathematically, yes. Practically, no.

To trigger a 50% probability of collision in UUID v7, a single system would need to generate $2^{37}$ (over 137 billion) identifiers *within the exact same millisecond*. Modern distributed systems, even those handling millions of requests per second, do not approach this threshold. 

However, UUID v7 does leak the exact millisecond of creation. If your application relies on opaque identifiers to prevent adversaries from determining when an account or resource was created, you must continue using UUID v4 or apply an encryption layer over the ID.

## Implementation Constraints

Before migrating a legacy database from v4 to v7, you must verify the underlying storage engine.

In PostgreSQL, the native `uuid` data type stores the identifier as a 128-bit integer, regardless of whether it is v4 or v7. The performance gains are immediately realized without schema changes.

In MySQL/InnoDB, if UUIDs are stored as `VARCHAR(36)` instead of `BINARY(16)`, the clustered index penalty is magnified by the physical size of the string. Migrating to v7 will reduce page splits, but converting the column to `BINARY(16)` is still required for optimal performance.

*(To bulk generate properly formatted identifiers for testing, refer to our [UUID v4 and v7 Generator](/tools/bulk-uuid-v4-v7-generator/) utility).*
