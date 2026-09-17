import { useState } from "react";

import { nextCount } from "./counter";

export function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="shell">
      <section className="card" aria-labelledby="template-heading">
        <p className="eyebrow">Verified starter</p>
        <h1 id="template-heading">Python + React project template</h1>
        <p>
          Start with a strict Python backend, a typed React SPA, and one
          verification contract.
        </p>
        <button
          type="button"
          onClick={() => setCount((current) => nextCount(current))}
        >
          Verification count: {count}
        </button>
      </section>
    </main>
  );
}
