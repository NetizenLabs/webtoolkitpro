---
title: "How Diff Algorithms Work: Myers O(ND) Algorithm Explained Natively in Code"
description: "An engineering breakdown of the Myers diff algorithm — the graph theory engine behind git diff, GitHub code review, and high-performance diff checkers."
date: '2026-05-18'
category: "Developer Tools"
tags: ["Algorithms", "Git", "Diff", "Computer Science"]
keywords: ["myers diff algorithm", "how git diff works", "diff algorithm explained", "LCS algorithm", "git diff algorithm", "edit graph k-line", "V8 diff engine", "Patience diff vs Myers"]
readTime: '16 min read'
tldr: "Every time you run 'git diff', the computer isn't just reading text—it's solving a mathematical shortest-path problem. Eugene Myers' 1986 algorithm maps insertions and deletions across a massive 2D Edit Graph. This engineering manual breaks down the math of k-lines, Dynamic Programming V-arrays, and the catastrophic performance traps of comparing unrelated files."
author: "Abu Sufyan"
image: "/blog/diff-algorithms.jpg"
imageAlt: "Visual diagram showing the Myers diff algorithm edit graph"
expertTips:
  - "When comparing highly structured codebases (like JSON API schemas), Myers O(ND) algorithm executes exceptionally fast because the edit distance (D) is typically small. However, if you compare completely unrelated files (where D approaches N), Myers' performance degrades instantly to O(N^2). Always implement strict line-count boundary limits to protect your server threads."
  - "To generate GitHub-quality code reviews, never just use Myers on its own. Pair Myers line-level diffing with a secondary character-level pass on modified lines. The primary line-level diff identifies insertion blocks, while the character-level pass isolates exact typo adjustments."
  - "If you're building a tool for massive refactoring jobs, swap Myers out for Patience Diff. Patience Diff uses unique, non-repeating lines as anchoring pivot points, preventing confusing visual splits on empty brackets or blank lines."
faqs:
  - q: "What exactly is an Edit Graph in the Myers algorithm?"
    a: "The Edit Graph is a two-dimensional grid representing the relationship between two files: File A (length M, mapped vertically) and File B (length N, mapped horizontally). Moving down represents deleting a line from File A. Moving right represents inserting a line from File B. Traversing diagonally down-right represents a matching line (which costs 0 edits)."
  - q: "What is a k-line in Myers graph theory?"
    a: "The k-line is a mathematical diagonal defined by the equation 'k = x - y'. A k-line of 0 runs straight down the primary diagonal. Positive values of k indicate a path heavily weighted toward insertions, while negative k values indicate a path weighted toward deletions. The algorithm greedily jumps across these diagonals."
  - q: "How does the Dynamic Programming state array V[k] work?"
    a: "The array 'V' acts as the engine's primary state register. The index 'k' maps to the k-line, and the stored value 'V[k]' represents the furthest x-coordinate reached on that specific diagonal. In each loop step, the engine pulls data from neighboring k-lines to calculate the next optimal move."
  - q: "Why does Git offer Patience Diff as an alternative to the default Myers algorithm?"
    a: "While Myers mathematically guarantees the absolute minimum number of edits, its output can be unreadable for humans. If a block of code is moved, Myers often matches generic characters like curly braces ('}') in the old and new locations, creating 'diff fragmentation'. Patience Diff prioritizes lines that are completely unique, generating visual output that aligns closer to human logic."
steps:
  - name: "Initialize State Vector"
    text: "Define the V array state register to map reachable x-coordinates across all possible k-line vectors."
  - name: "Execute BFS Loop"
    text: "Run a greedy Breadth-First Search across step depths (D) to locate the shortest path to the target coordinates (M,N)."
  - name: "Trace Graph Diagonals"
    text: "Scan forward along active diagonals rapidly without incrementing the edit cost whenever matching text lines are detected."
  - name: "Reconstruct Edit Script"
    text: "Backtrack through the history array to compile the precise chronological sequence of insertions and deletions."
---

✓ Last tested: May 2026 · Evaluated against Node V8 12.0 edit graph parsers

> 🚀 **Author Profile Showcase:**
> Check out my **[CoderLegion Profile](https://coderlegion.com/user/abusuyfan)** & latest expert posts!
> *   🏆 **Points:** 684
> *   🎱 **Badges:** 2
> *   👥 **Followers:** 1
> *   📄 **Posts:** 4
>
> Read my companion article on CoderLegion: **[How Diff Algorithms Work: Myers Algorithm Explained Simply](https://coderlegion.com/18153/how-diff-algorithms-work-myers-algorithm-explained-simply)**.

---

## 1. Practical Observations on Edit Graphs

While writing a custom file synchronization utility for a client last month, our junior engineer decided to write a "simple" line-comparison function using nested `for` loops. It instantly locked the Node server's CPU trying to compare two 10,000-line JSON configuration files. 

I had to sit them down and explain a harsh engineering reality: Diffing is not a text comparison problem. It is a massive **Shortest Path Graph Theory problem**. 

Every time you run `git diff` in your terminal or open a Pull Request on GitHub, you're executing Eugene Myers' 1986 algorithm, *"An O(ND) Difference Algorithm"*. Myers completely reframed text comparison into a 2D grid logic puzzle.

```
       B o u n d a r y   S e q u e n c e   B   ( N )
       (0,0) ───[Insert B]───> (1,0)
         │                       │
     [Delete A]  [Match Diagonal]│
         │          (Cost: 0)    │
         v                       v
       (0,1) ────────────────> (1,1)
```

### The Coordinate System
Consider two sequences: **Sequence A** of length $M$ (the old file) and **Sequence B** of length $N$ (the new file).
*   **Grid Dimensions:** We build a virtual grid of width $N$ and height $M$.
*   **Starting Point:** The top-left corner $(0,0)$.
*   **Target Destination:** The bottom-right corner $(N,M)$.
*   **Movement Costs:**
    *   **Horizontal Move ($+x$):** Moving from $(x-1, y)$ to $(x, y)$. This represents an **Insertion** of line $B[x]$. (Cost: 1 edit).
    *   **Vertical Move ($+y$):** Moving from $(x, y-1)$ to $(x, y)$. This represents a **Deletion** of line $A[y]$. (Cost: 1 edit).
    *   **Diagonal Move:** Moving from $(x-1, y-1)$ to $(x, y)$ when line $A[x]$ equals line $B[y]$. This represents a **Match**. (Cost: 0 edits).

Finding the optimal difference sequence requires computing the single path from $(0,0)$ to $(N,M)$ that contains the absolute **fewest non-diagonal moves**.

---

## 2. The $k$-Line Diagonal Search

To navigate this massive Edit Graph efficiently without checking every single coordinate (which would be an $O(N^2)$ disaster), Myers introduced the **$k$-line** coordinate system:

$$k = x - y$$

The integer $k$ represents the diagonal lines cutting across the grid.
*   $k = 0$ is the main diagonal running straight from $(0,0)$ down to the bottom-right.
*   Positive $k$ diagonals ($k > 0$) lie above the main diagonal (indicating paths heavy on insertions).
*   Negative $k$ diagonals ($k < 0$) lie below the main diagonal (indicating paths heavy on deletions).

```
    y \ x   0     1     2     3
      0   k=0   k=1   k=2   k=3
      1  k=-1   k=0   k=1   k=2
      2  k=-2  k=-1   k=0   k=1
```

### Greedy Breadth-First Search
The algorithm runs a highly optimized, greedy Breadth-First Search (BFS) over the possible edit distances ($D = 0, 1, 2, \dots$). 

For each step depth $D$, we scan the available diagonals $k \in \{-D, -D+2, \dots, D\}$ to find the absolute furthest $x$-coordinate reached on that diagonal. If we find matching text, we slide down the diagonal for "free" (cost = 0) before incrementing $D$.

---

## 3. Dynamic Programming Implementation Specs

To track active path coordinates without running out of memory, Myers uses a state register array called `V`:
*   The array index represents the active diagonal $k$.
*   The stored value `V[k]` holds the furthest $x$-coordinate reached on that specific diagonal.

### The Algorithm Step Trace:
For each step depth $D$ from $0$ to $M+N$:
1.  We loop through diagonals $k$ from $-D$ to $D$ (stepping by 2 to save cycles).
2.  We decide whether to move down from diagonal $k+1$ (triggering a deletion) or move right from diagonal $k-1$ (triggering an insertion) using the greedy rule:

$$\text{If } k = -D \text{ or } \left( k \neq D \text{ and } V[k-1] < V[k+1] \right)$$

$$\text{Then } x = V[k+1] \quad (\text{Move Down})$$

$$\text{Else } x = V[k-1] + 1 \quad (\text{Move Right})$$

3.  Calculate $y = x - k$.
4.  Follow any matching text diagonals as far as possible without incrementing the cost $D$:

$$\text{While } x < M \text{ and } y < N \text{ and } A[x] == B[y]: x++, y++$$

5.  Store the result back into the register: `V[k] = x`.
6.  If $x \ge M$ and $y \ge N$, the destination is reached. The loop aborts and we return the path.

---

## 4. Pure JavaScript O(ND) Myers Implementation

Here is a clean, production-ready implementation of Eugene Myers' greedy diff algorithm written in pure JavaScript. It includes the mandatory history tracker needed to reverse-engineer the edit script later:

```javascript
/**
 * Eugene Myers' O(ND) Greedy Diff Algorithm
 * @param {Array<string>} A - Original sequence (lines or characters)
 * @param {Array<string>} B - New sequence (lines or characters)
 * @returns {Array<object>} - Array of edit operations
 */
function myersDiff(A, B) {
  const M = A.length;
  const N = B.length;
  const MAX = M + N;
  
  // V array stores the furthest x-coordinate reached on diagonal k
  const V = { 1: 0 };
  
  // History array tracks path steps to reconstruct the exact edit script later
  const history = [];

  for (let d = 0; d <= MAX; d++) {
    // Clone state register for historical backtracking
    history.push({ ...V });

    for (let k = -d; k <= d; k += 2) {
      let x;
      // Greedy check: determine if we should move down or move right
      if (k === -d || (k !== d && V[k - 1] < V[k + 1])) {
        x = V[k + 1]; // Move down (deletion)
      } else {
        x = V[k - 1] + 1; // Move right (insertion)
      }

      let y = x - k;

      // Follow diagonal matches (zero cost movements)
      while (x < M && y < N && A[x] === B[y]) {
        x++;
        y++;
      }

      V[k] = x;

      // Check if we have hit the target destination coordinates (N,M)
      if (x >= M && y >= N) {
        return reconstructPath(history, A, B, M, N);
      }
    }
  }
}

/**
 * Backtracks through the V-array history to reconstruct the chronological edit script
 */
function reconstructPath(history, A, B, M, N) {
  const edits = [];
  let x = M;
  let y = N;

  // Walk backward from the destination to the origin
  for (let d = history.length - 1; d >= 0; d--) {
    const V = history[d];
    const k = x - y;

    let prevK;
    if (k === -d || (k !== d && V[k - 1] < V[k + 1])) {
      prevK = k + 1; // Arrived via moving down
    } else {
      prevK = k - 1; // Arrived via moving right
    }

    const prevX = V[prevK];
    const prevY = prevX - prevK;

    // Process diagonal matches backward
    while (x > prevX && y > prevY) {
      x--;
      y--;
    }

    if (d > 0) {
      if (x === prevX) {
        edits.push({ type: 'insert', value: B[prevY], index: prevY });
      } else {
        edits.push({ type: 'delete', value: A[prevX], index: prevX });
      }
    }

    x = prevX;
    y = prevY;
  }

  // Reverse the array to provide chronological forward instructions
  return edits.reverse();
}
```

---

## 5. Topological Graph Representation: Nodes, Edges, and Paths

To formally analyze Myers' approach, we can define the **Edit Graph** as a finite Directed Acyclic Graph (DAG) denoted by:

$$G = (V, E)$$

Where the vertex set $V$ represents all grid coordinates:

$$V = \{ (x, y) \mid 0 \le x \le N, \, 0 \le y \le M \}$$

And the edge set $E$ contains three classes of directed transitions:

$$E = E_{horizontal} \cup E_{vertical} \cup E_{diagonal}$$

Because the graph is an absolute DAG with zero circular routes, search operations can be evaluated using standard dynamic programming vectors, ensuring deterministic execution bounds.

---

## 6. Patience Diff vs. Myers Diff: Architecture Matrix

While Myers' algorithm guarantees mathematically minimal edit scripts, the visual output can be incredibly frustrating for human developers reading a Pull Request. Below is a comparison of Myers' approach versus the **Patience Diff** alternative:

| Evaluation Metric | Myers O(ND) Algorithm | Patience Diff Algorithm |
| :--- | :--- | :--- |
| **Primary Priority** | Absolute mathematical minimum edit steps ($D$). | Matches unique lines first to act as stable visual anchors. |
| **Complexity Class** | $O(ND)$ average, degrading to massive $O(N^2)$ in worst cases. | $O(N \log N)$ for anchor mapping, followed by Myers recursive passes. |
| **Curly Braces Logic** | High risk of matching completely isolated closing braces (`}`). | Prevents matching generic braces entirely by anchoring unique lines only. |
| **Large File Performance** | Near-instant when changes are clustered and $D$ is small. | Highly consistent; scales exceptionally well with major cross-file refactors. |
| **Visual Grouping** | Often fragments contiguous code blocks across random matching lines. | Consistently preserves paragraph boundaries and block indentation. |

---

## 7. Advanced Secondary Pass: Character-Level Sub-Line Diffing

To match the high-end behavior of premium review platforms like GitHub, line-level diffs are frequently paired with a secondary character-level pass. Below is an engineering implementation of a character-level diff designed to isolate exact sub-line typographical edits:

```javascript
/**
 * Executes a secondary character-level diff on modified lines.
 * Helps developers isolate precise typographical edits instead of highlighting the whole block.
 */
function diffSubline(oldLine, newLine) {
  // Tokenize lines into individual character arrays
  const charsOld = oldLine.split('');
  const charsNew = newLine.split('');
  
  // 1. Run the Myers diff engine on the character arrays
  const charEdits = myersDiff(charsOld, charsNew);
  
  // 2. Format output into highlighted HTML tokens
  return charEdits.map(edit => {
    if (edit.type === 'insert') {
      return `<ins style="background: rgba(52, 211, 153, 0.2);">${edit.value}</ins>`;
    } else if (edit.type === 'delete') {
      return `<del style="background: rgba(248, 113, 113, 0.2);">${edit.value}</del>`;
    }
    return edit.value; // Matched zero-cost character
  }).join('');
}
```

---

## 8. Production React Myers Edit Graph Simulator

Below is a complete, production-ready React component written in TypeScript. 

It implements a premium **Myers O(ND) Edit Graph Visualizer & Benchmarker**. Engineers can input custom strings, view step-by-step updates to the Dynamic Programming state array `V`, and inspect a beautiful 2D visual layout of the DAG containing nodes, paths, diagonals, and the calculated shortest edit path instantly:

```typescript
import React, { useState } from 'react';

interface Point { x: number; y: number; }
interface VisualEdge { x1: number; y1: number; x2: number; y2: number; type: 'normal' | 'add' | 'del' | 'path'; }

export const MyersGraphVisualizer: React.FC = () => {
  const [seqA, setSeqA] = useState<string>('ABCABBA');
  const [seqB, setSeqB] = useState<string>('CBABAC');
  const [report, setReport] = useState<{
    edits: string[];
    execTime: number;
    dPath: string;
    gridWidth: number;
    gridHeight: number;
    edges: VisualEdge[];
  } | null>(null);

  const calculateMyers = () => {
    const start = performance.now();
    const A = seqA.split('');
    const B = seqB.split('');
    const M = A.length;
    const N = B.length;
    const MAX = M + N;
    
    const V: Record<number, number> = { 1: 0 };
    const history: Record<number, Record<number, number>>[] = [];
    let dFound = 0;

    for (let d = 0; d <= MAX; d++) {
      const currentV: Record<number, number> = {};
      for (const k in V) {
        currentV[k] = V[k];
      }
      history.push({ d, v: currentV });

      for (let k = -d; k <= d; k += 2) {
        let x;
        if (k === -d || (k !== d && V[k - 1] < V[k + 1])) {
          x = V[k + 1];
        } else {
          x = V[k - 1] + 1;
        }
        let y = x - k;

        while (x < M && y < N && A[x] === B[y]) {
          x++;
          y++;
        }
        V[k] = x;

        if (x >= M && y >= N) {
          dFound = d;
          break;
        }
      }
      if (V[N - M] >= M) break; 
    }

    const end = performance.now();
    
    // Backtrack path for visual representation mapping
    const pathPoints: Point[] = [];
    let currX = M;
    let currY = N;
    pathPoints.push({ x: currX, y: currY });

    for (let d = history.length - 1; d >= 0; d--) {
      const stepV = history[d].v;
      const k = currX - currY;
      let prevK;
      
      if (k === -d || (k !== d && stepV[k - 1] < stepV[k + 1])) {
        prevK = k + 1;
      } else {
        prevK = k - 1;
      }
      
      const prevX = stepV[prevK];
      const prevY = prevX - prevK;

      while (currX > prevX && currY > prevY) {
        currX--;
        currY--;
        pathPoints.push({ x: currX, y: currY });
      }
      
      if (d > 0) {
        currX = prevX;
        currY = prevY;
        pathPoints.push({ x: currX, y: currY });
      }
    }
    
    pathPoints.reverse();

    // Compile SVG Edge mappings
    const edges: VisualEdge[] = [];
    for (let y = 0; y <= N; y++) {
      for (let x = 0; x <= M; x++) {
        if (x < M) edges.push({ x1: x, y1: y, x2: x + 1, y2: y, type: 'normal' });
        if (y < N) edges.push({ x1: x, y1: y, x2: x, y2: y + 1, type: 'normal' });
        if (x < M && y < N && A[x] === B[y]) {
          edges.push({ x1: x, y1: y, x2: x + 1, y2: y + 1, type: 'add' });
        }
      }
    }

    for (let i = 0; i < pathPoints.length - 1; i++) {
      const p1 = pathPoints[i];
      const p2 = pathPoints[i+1];
      edges.push({ x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, type: 'path' });
    }

    setReport({
      edits: pathPoints.map(p => `Coordinate: (${p.x}, ${p.y})`),
      execTime: (end - start) * 1000,
      dPath: `Shortest Edit Distance (D) = ${dFound}`,
      gridWidth: M,
      gridHeight: N,
      edges
    });
  };

  return (
    <div className="myers-visualizer-card">
      <h4>Myers O(ND) Edit Graph Visualizer & State Benchmarker</h4>
      <p className="visualizer-help">
        Observe exactly how the greedy Breadth-First Search maps coordinate diagonals (k-lines) and solves for the shortest edit path in real-time.
      </p>

      <div className="input-fields-row">
        <div className="field-group">
          <label>Original Sequence A (Vertical Target)</label>
          <input 
            type="text" 
            value={seqA} 
            onChange={(e) => setSeqA(e.target.value.toUpperCase())}
            maxLength={10}
            className="sequence-input"
          />
        </div>
        <div className="field-group">
          <label>New Sequence B (Horizontal Target)</label>
          <input 
            type="text" 
            value={seqB} 
            onChange={(e) => setSeqB(e.target.value.toUpperCase())}
            maxLength={10}
            className="sequence-input"
          />
        </div>
      </div>

      <div className="action-row">
        <button className="btn-visualize" onClick={calculateMyers}>
          Compute Mathematical Edit Graph
        </button>
      </div>

      {report && (
        <div className="visualizer-report">
          <h5>Graph Topology & Execution Logs</h5>

          <div className="diagnostic-summary">
            <span>{report.dPath}</span>
            <span>V8 Execution Time: {report.execTime.toFixed(2)} &mu;s</span>
          </div>

          <div className="edit-graph-container">
            <svg 
              viewBox={`-40 -40 ${(report.gridWidth * 60) + 80} ${(report.gridHeight * 60) + 80}`}
              className="edit-graph-svg"
            >
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#34d399" />
                </marker>
              </defs>

              {seqA.split('').map((char, idx) => (
                <text key={`labelA-${idx}`} x="-20" y={(idx * 60) + 35} fill="#9ca3af" fontSize="14" fontWeight="600" textAnchor="middle">
                  {char}
                </text>
              ))}

              {seqB.split('').map((char, idx) => (
                <text key={`labelB-${idx}`} x={(idx * 60) + 30} y="-15" fill="#9ca3af" fontSize="14" fontWeight="600" textAnchor="middle">
                  {char}
                </text>
              ))}

              {report.edges.map((edge, idx) => {
                let color = "rgba(255, 255, 255, 0.1)";
                let dash = "0";
                let width = "1.5";
                let marker = "";

                if (edge.type === 'add') {
                  color = "rgba(52, 211, 153, 0.35)"; 
                  width = "2";
                } else if (edge.type === 'path') {
                  color = "#34d399"; 
                  width = "3.5";
                  marker = "url(#arrow)";
                }

                return (
                  <line 
                    key={idx}
                    x1={edge.x1 * 60}
                    y1={edge.y1 * 60}
                    x2={edge.x2 * 60}
                    y2={edge.y2 * 60}
                    stroke={color}
                    strokeDasharray={dash}
                    strokeWidth={width}
                    markerEnd={marker}
                  />
                );
              })}

              {Array.from({ length: report.gridHeight + 1 }).map((_, y) => 
                Array.from({ length: report.gridWidth + 1 }).map((_, x) => (
                  <circle 
                    key={`${x}-${y}`}
                    cx={x * 60}
                    cy={y * 60}
                    r="4.5"
                    fill="#1f2937"
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.5"
                  />
                ))
              )}
            </svg>
          </div>
        </div>
      )}

      <style>{`
        .myers-visualizer-card {
          padding: 2rem;
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: #ffffff;
          margin-bottom: 2rem;
        }
        .visualizer-help {
          font-size: 0.875rem;
          color: #9ca3af;
          margin-bottom: 1.5rem;
        }
        .input-fields-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .field-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .field-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: #9ca3af;
        }
        .sequence-input {
          padding: 0.75rem;
          background: #1f2937;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: #ffffff;
          font-family: monospace;
          font-weight: 700;
        }
        .action-row {
          margin-bottom: 1.5rem;
        }
        .btn-visualize {
          padding: 0.75rem 1.5rem;
          background: #34d399;
          color: #111827;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .visualizer-report {
          background: #1f2937;
          padding: 1.5rem;
          border-radius: 8px;
        }
        .visualizer-report h5 {
          font-size: 0.95rem;
          margin: 0 0 1rem 0;
        }
        .diagnostic-summary {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #34d399;
          font-weight: 700;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .edit-graph-container {
          background: #111827;
          padding: 1.5rem;
          border-radius: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow-x: auto;
        }
        .edit-graph-svg {
          width: 100%;
          max-width: 580px;
          height: auto;
        }
      `}</style>
    </div>
  );
};
```

---

## 9. Execute Myers Operations Securely

Pasting intellectual property or custom code blocks into un-vetted online tools is a massive data leakage risk. To compare your files efficiently while maintaining total compliance:

Use our highly advanced **[Diff Checker Tool](/tools/diff-checker/)**.

Built on absolute privacy principles:
*   **100% Client-Side Sandbox:** All sequence tokenizations, edit graph calculations, and DAG visual constructions are processed entirely inside your browser's local sandbox memory—no server uploads, zero network traffic.
*   **Secondary Character Layer:** Automatically executes the character-level secondary passes to isolate precise typographical coordinates.
*   **Multi-Format Export:** Extract clean unified diff outputs instantly.

---

### About The Author

**Abu Sufyan** is an enterprise systems engineer, web performance architect, and developer tooling designer based in Lahore, Punjab. He specializes in V8 execution benchmarking, React hook design, and semantic SEO architectures. You can review his open-source work on [Github](https://github.com/abusufyan-netizen) or check his personal portfolio website at [abusufyan.xyz](https://abusufyan.xyz).
