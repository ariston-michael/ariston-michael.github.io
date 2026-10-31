"use client";
import { useSyncExternalStore } from "react";

const eventName = "portfolio-motion-change";
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
}
function getSnapshot() {
  return document.documentElement.dataset.motion === "paused";
}
function getServerSnapshot() {
  return false;
}

export function MotionToggle() {
  // Read the shared document preference so client-side navigation preserves
  // agreement between the button label and the actual animation state.
  const paused = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return (
    <button
      className="motion-toggle"
      type="button"
      aria-pressed={paused}
      onClick={() => {
        document.documentElement.dataset.motion = paused ? "running" : "paused";
        window.dispatchEvent(new Event(eventName));
      }}
    >
      {paused ? "Motion paused" : "Pause ambient motion"}
    </button>
  );
}
