---
title: "UUID v4 vs v7: Why Every Developer Should Switch in 2026"
description: "Is UUID v4 dead? Discover why UUID v7 is the new standard for database primary keys, how it solves index fragmentation, and when to make the switch."
date: "2026-05-18"
category: "Engineering"
tags: ["UUID", "Database Design", "Backend Engineering", "PostgreSQL", "Performance"]
keywords: ["uuid v4 vs v7", "uuid v7 explained", "why use uuid v7", "uuid v7 online generator", "database primary key uuid", "RFC 9562 UUID standards", "PostgreSQL UUID v7 performance", "B-Tree index fragmentation UUID"]
readTime: "15 min read"
tldr: "UUID v4 has long been the default primary key for modern web systems. However, its complete randomness is a performance liability in production databases, causing B-Tree index fragmentation and severe insert performance degradation at scale. The newly standardized UUID v7 (RFC 9562) solves this by prefixing a chronologically-sorted 48-bit Unix timestamp. This simple shift provides the distributed unique benefits of UUIDs while matching the elite insertion performance of sequential integers."
author: "Abu Sufyan"
image: "/blog/uuid-v4-vs-v7-comparison.jpg"
imageAlt: "Chart showing database performance difference between random UUIDs and time-ordered UUIDs"
expertTips: [
  "When migrating a legacy database from UUID v4 to v7, you do not need to rewrite your schemas. Both are standard 128-bit values and can reside in the same native UUID columns without structural changes.",
  "Be aware that UUID v7 exposes the exact millisecond creation time of the database record. If you are generating public identifiers that must remain completely private (such as password reset tokens or secret share links), stick to UUID v4 or high-entropy cryptographically secure random bytes.",
  "Always configure your database indexes to utilize index fill-factor tweaks (around 80-90%) when writing heavy concurrent volumes to older UUID tables, though UUID v7 natively eliminates the need for this by appending new records sequentially at the end of the B-Tree."
]
faqs: [
  {
    q: "How does UUID v7 prevent index fragmentation in databases?",
    a: "Modern databases utilize B-Tree indexes to organize primary keys. When you insert a random UUID v4, the key can belong anywhere inside the tree structure, forcing the database engine to open random pages in memory. If a target index page is full, the engine must perform a 'page split,' moving half the data to a new page and rewriting index references. This causes heavy disk write operations. UUID v7 prefixes a 48-bit millisecond timestamp, ensuring that every newly created key is lexicographically larger than the previous one. New inserts are written sequentially at the very end of the B-Tree index, completely eliminating page splits and keeping your database cache healthy."
  },
  {
    q: "What is the risk of collision in UUID v7 compared to UUID v4?",
    a: "Practically identical. While UUID v4 contains 122 bits of pure randomness, UUID v7 allocates 48 bits for the Unix timestamp and 74 bits for random entropy. Under the Birthday Paradox, the mathematical probability of a collision occurring between two UUID v7 identifiers generated within the exact same millisecond is so small that it would require generating billions of keys per second for hundreds of years to have a 1% chance of a collision. In practice, it is completely collision-proof."
  },
  {
    q: "Is UUID v7 officially standardized?",
    a: "Yes. In May 2024, the Internet Engineering Task Force (IETF) officially published RFC 9562, which supersedes the legacy RFC 4122 standard. RFC 9562 establishes UUID v7 as the standardized time-ordered format, alongside newer formats like v6 (reorganized timestamp for database sorting compatibility) and v8 (custom formats)."
  },
  {
    q: "Can I use UUID v7 in legacy database engines that only support standard UUIDs?",
    a: "Yes. To the database engine (such as PostgreSQL, MySQL, SQL Server, or SQLite), a UUID is just a 128-bit raw binary array (or a standard 36-character hexadecimal string). The database does not care how the bits inside that array are configured. You can generate UUID v7 values on your application server and write them directly into standard UUID fields."
  }
]
steps: [
  {
    name: "Extract Millisecond Epoch",
    text: "Fetch the current system Unix timestamp in millisecond precision (48 bits of total data)."
  },
  {
    name: "Generate Random Entropy",
    text: "Fill the remaining segments with 74 bits of cryptographically secure random bytes to guarantee collision immunity."
  },
  {
    name: "Enforce Version and Variant",
    text: "Inject the version identifier (bit values '0111' for v7) and the standard RFC variant bits to ensure RFC 9562 compliance."
  },
  {
    name: "Write to Primary Key",
    text: "Serialize the completed 128-bit array into standard hexadecimal representation and write directly to your database table."
  }
]
---

## 1. The Architecture of UUID: From RFC 4122 to RFC 9562

For decades, software architects relied on **RFC 4122** (published in 2005) to generate Universally Unique Identifiers (UUIDs). Among the defined formats, **UUID v4** emerged as the undisputed standard for web systems. Composed of 122 bits of pure randomness, UUID v4 provided a decentralized, collision-proof method for generating primary keys without requiring a central coordinating authority.

However, web systems have evolved dramatically since 2005. In modern, high-throughput database environments, the complete randomness of UUID v4 has transformed from a structural strength into a massive **performance bottleneck**.

To solve this, the Internet Engineering Task Force (IETF) officially published **RFC 9562**, formally replacing RFC 4122. This new specification establishes **UUID v7** as the modern standard, combining the unique, distributed generation benefits of UUIDs with the high-performance index mechanics of sequential integers.

---

## 2. Binary Bit-Layout Blueprints: UUID v4 vs. UUID v7

To understand why UUID v7 outperforms its predecessor, we must examine their underlying binary layouts. Both formats produce a 128-bit number (represented as a 36-character string grouped by hyphens: `8-4-4-4-12`).

### 1. The Random UUID v4 Layout
UUID v4 relies entirely on pseudo-random generation:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           random_a                            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          random_a             |  ver  |       random_b        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  var  |                       random_c                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           random_c                            |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

*   **Version bits (`ver`):** Always set to `0100` (binary for `4`).
*   **Variant bits (`var`):** Always set to `10` (standard RFC variant).
*   **Total Random Entropy:** **122 bits**.

---

### 2. The Time-Ordered UUID v7 Layout
UUID v7 reorganizes these same 128 bits, prefixing a sequential time element:

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           unix_ts_ms                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|          unix_ts_ms           |  ver  |       rand_a          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|  var  |                       rand_b                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                           rand_b                          |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

*   **`unix_ts_ms` (48 bits):** The current system Unix timestamp in millisecond precision.
*   **Version bits (`ver`):** Set to `0111` (binary for `7`).
*   **`rand_a` & `rand_b` (74 bits):** Cryptographically secure pseudo-random bytes.
*   **Total Random Entropy:** **74 bits**.

> [!TIP]
> **Lexicographical Sortability:** Because the most significant 48 bits represent a steadily increasing timestamp, UUID v7 is **chronologically sortable**. When sorted alphabetically or byte-by-byte, UUID v7 strings arrange themselves in the exact order they were generated!

---

## 3. Database Deep-Dive: B-Tree Index Fragmentation & Page Splits

Why does sorting make such a massive difference in database performance? The answer lies in the **B-Tree index structure**.

### The B-Tree Insertion Mechanics
Relational databases (such as PostgreSQL and MySQL) use B-Tree indexes to keep primary keys sorted for fast lookup times.
When inserting records with a sequential integer (`1, 2, 3...`) or a time-ordered key like **UUID v7**:
1.  The database engine navigates to the final page at the right-most edge of the index tree.
2.  It appends the new record sequentially.
3.  **Result:** The operation is fast, and the index pages remain highly dense (100% full) in physical disk blocks.

```
[Sequential Inserts (UUID v7)]
Index Page 1 [ A1 -> A2 -> A3 ] ──> Index Page 2 (Append Only) [ A4 -> A5 -> A6 ] 
```

### The UUID v4 Page Split Disaster
When you insert a random **UUID v4** key, the database must write it to a random location in the B-Tree index:
1.  The engine locates the specific page in the middle of the tree where the random key belongs.
2.  If that index page is already full, the engine cannot write the key. It must perform a **Page Split**:
    *   It allocates a brand-new page on disk.
    *   It moves 50% of the index data from the old page to the new page.
    *   It inserts the new key into the split block.
    *   It rewrites all surrounding parent node references.
3.  **Result:** Massive disk write overhead, empty space fragmentation across pages, and buffer pool pollution that causes query times to spike.

```
[Random Inserts (UUID v4 Page Split)]
Index Page 1 [ Full: 10 -> 20 -> 30 ]
   └─ Insert 15 triggers split! ──> Index Page 1 [ 10 -> 15 ] AND Page 3 [ 20 -> 30 ]
```

---

## 4. Mathematical Collision Probabilities (Birthday Paradox)

A common developer concern is: *"Does reducing the random bits from 122 down to 74 increase the risk of key collisions?"*

Let’s solve this using the **Birthday Paradox** probability equation:

$$p(n) \approx 1 - e^{-\frac{n^2}{2 \times 2^d}}$$

Where:
*   $n$ is the number of keys generated.
*   $d$ is the number of random entropy bits.

In UUID v7, we have $d = 74$ bits of random entropy **per millisecond**.
If a massive global microservice cluster generates **1,000,000 keys per millisecond** (1 billion writes per second):

$$p(10^6) \approx 1 - e^{-\frac{10^{12}}{2 \times 2^{74}}} \approx 1 - e^{-\frac{10^{12}}{3.77 \times 10^{22}}} \approx 2.6 \times 10^{-11}$$

The mathematical probability of a single collision occurring within that millisecond is **1 in 38 billion**. If you maintain this extreme load for 100 consecutive years, the probability of a collision remains virtually $0\%$.

---

## 5. Polyglot Implementations: Native Code Blueprints

Implement these high-performance, native generation patterns across your programming stacks:

### 1. Pure Node.js & Javascript (Web Crypto API)
Generate high-fidelity, secure UUID v7 strings without external npm library dependencies:

```javascript
// Native high-performance UUID v7 Generator
function generateUUIDv7() {
  const entropy = new Uint8Array(10);
  crypto.getRandomValues(entropy);

  // Get current Unix time in milliseconds
  const now = Date.now();

  // Write timestamp to high 48 bits (6 bytes)
  const tsHigh = Math.floor(now / 0x100000000);
  const tsLow = now % 0x100000000;

  const bytes = new Uint8Array(16);
  bytes[0] = (tsHigh >> 8) & 0xff;
  bytes[1] = tsHigh & 0xff;
  bytes[2] = (tsLow >> 24) & 0xff;
  bytes[3] = (tsLow >> 16) & 0xff;
  bytes[4] = (tsLow >> 8) & 0xff;
  bytes[5] = tsLow & 0xff;

  // Set random entropy bytes
  bytes.set(entropy, 6);

  // Set Version (0111 -> 7)
  bytes[6] = (bytes[6] & 0x0f) | 0x70;

  // Set Variant (10xx -> RFC Variant)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  // Parse to standard 36-character hexadecimal string
  const toHex = (b) => b.toString(16).padStart(2, '0');
  return [
    Array.from(bytes.slice(0, 4), toHex).join(''),
    Array.from(bytes.slice(4, 6), toHex).join(''),
    Array.from(bytes.slice(6, 8), toHex).join(''),
    Array.from(bytes.slice(8, 10), toHex).join(''),
    Array.from(bytes.slice(10, 16), toHex).join('')
  ].join('-');
}

// Example Output:
console.log(generateUUIDv7()); // "018f972b-8a22-7ebd-ba4d-2a1c6a2e4e1a"
```

### 2. High-Performance PostgreSQL Functions
Most cloud database providers (like Supabase and Neon) support UUID v7 natively. If you are running vanilla PostgreSQL, you can implement this highly optimized native function:

```sql
CREATE OR REPLACE FUNCTION generate_uuid_v7()
RETURNS uuid AS $$
DECLARE
  v_time bytesb;
  v_random bytesb;
  v_timestamp bigint;
BEGIN
  -- 1. Fetch current timestamp in milliseconds
  v_timestamp := extract(epoch from clock_timestamp() * 1000)::bigint;

  -- 2. Convert timestamp to 6-byte hex array
  v_time := decode(lpad(to_hex(v_timestamp), 12, '0'), 'hex');

  -- 3. Generate 10 cryptographically secure random bytes
  v_random := gen_random_bytes(10);

  -- 4. Inject RFC Version 7 and Variant bits
  v_random := set_byte(v_random, 0, (get_byte(v_random, 0) & 15) | 112); -- Set version 7
  v_random := set_byte(v_random, 2, (get_byte(v_random, 2) & 63) | 128); -- Set variant

  -- 5. Combine and return the 128-bit UUID
  RETURN (v_time || v_random)::uuid;
END;
$$ LANGUAGE plpgsql VOLATILE;
```

### 3. Python Generation Block
Utilize the standardized `uuid` or highly optimized compiled C bindings:

```python
import time
import os
import uuid

def generate_uuid_v7() -> uuid.UUID:
    # 1. Fetch millisecond timestamp
    unix_ts_ms = int(time.time() * 1000)
    
    # 2. Extract timestamp bytes (6 bytes)
    ts_bytes = unix_ts_ms.to_bytes(6, byteorder='big')
    
    # 3. Generate 10 random bytes
    rand_bytes = bytearray(os.urandom(10))
    
    # 4. Inject version 7 (0111)
    rand_bytes[0] = (rand_bytes[0] & 0x0F) | 0x70
    
    # 5. Inject variant (10xx)
    rand_bytes[2] = (rand_bytes[2] & 0x3F) | 0x80
    
    # 6. Combine and parse
    return uuid.UUID(bytes=ts_bytes + bytes(rand_bytes))

print(generate_uuid_v7()) # 018f9733-149b-7e61-80f2-f8c5c361e6bb
```

---

## 6. Compare & Generate UUIDs Locally

Struggling to configure database seeds, testing entities, or raw parameters? Generating and testing unique keys manually shouldn’t introduce security leaks.

Use our offline-first **[UUID Generator Tool](/tools/uuid-generator/)**.

Built on absolute zero-network privacy protocols:
*   **Local High-Entropy Generation:** Runs entirely within your browser's Web Crypto sandbox—guaranteeing that generated keys are never exposed to external networks.
*   **Polyglot Settings:** Toggle instantly between UUID v4 (random tracking) and UUID v7 (chronological database-sorted) layouts.
*   **Batch Exporting:** Generate up to 1,000 unique, validated keys in seconds for easy database seeding or bulk imports.
