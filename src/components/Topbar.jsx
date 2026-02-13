import { useState } from "react";

export default function Topbar({ onSearch }) {
  const [q, setQ] = useState("");

  return (
    <div className="topbar">
      <input
        placeholder="What do you want to play?"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <button onClick={() => onSearch(q)}>Search</button>
    </div>
  );
}
