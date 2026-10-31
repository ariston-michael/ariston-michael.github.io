"use client";
import { useState } from "react";
export function MotionToggle() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-pressed={paused}
      onClick={() => {
        const next = !paused;
        document.documentElement.dataset.motion = next ? "paused" : "running";
        setPaused(next);
      }}
    >
      {paused ? "Motion paused" : "Pause ambient motion"}
    </button>
  );
}
