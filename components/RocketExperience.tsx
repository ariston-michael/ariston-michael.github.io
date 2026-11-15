"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { MOTION_CHANGE_EVENT } from "@/lib/motion";

const modules = [
  { name: "Command module", target: "introduction", caption: "Introduction", y: 0, h: 104, path: "M40 100 L40 75 Q42 39 80 6 Q118 39 120 75 L120 100 Z", detail: "M57 71 H103 M63 80 H97 M72 26 H88 M40 94 H120" },
  { name: "Payload", target: "projects", caption: "Selected work", y: 104, h: 102, path: "M40 2 H120 V98 H40 Z", detail: "M46 8 H114 V90 H46 Z M63 26 H97 V65 H63 Z M70 34 H90 M70 42 H90 M80 65 V86" },
  { name: "Upper stage", target: "experience", caption: "Experience", y: 206, h: 102, path: "M40 2 H120 V98 H40 Z", detail: "M40 13 H120 M40 87 H120 M49 20 V80 M111 20 V80 M65 48 H95 M80 33 V63" },
  { name: "Middle stage", target: "education", caption: "Education / skills", y: 308, h: 106, path: "M40 2 H120 V102 H40 Z", detail: "M40 14 H120 M40 90 H120 M52 28 V77 M60 28 V77 M100 28 V77 M108 28 V77 M73 43 H87 V61 H73 Z" },
  { name: "Lower stage", target: "about", caption: "About / achievements", y: 414, h: 108, path: "M40 2 H120 V102 H40 Z M40 20 L13 78 V107 L40 91 M120 20 L147 78 V107 L120 91", detail: "M40 14 H120 M40 90 H120 M53 26 V78 M107 26 V78 M69 39 H91 V66 H69 Z" },
  { name: "Engine", target: "contact", caption: "Contact", y: 522, h: 84, path: "M40 2 H120 V15 H40 Z M59 15 H101 L113 68 Q80 82 47 68 Z", detail: "M59 25 H101 M56 35 H104 M53 46 H107 M50 57 H110 M66 76 V82 M80 79 V86 M94 76 V82" },
] as const;

const subscribeHydration = () => () => {};

type Offset = { x: number; y: number };
export function RocketExperience({ children }: { children: ReactNode }) {
  const scene = useRef<HTMLElement>(null);
  const pieces = useRef<(HTMLButtonElement | null)[]>([]);
  const offsets = useRef<Offset[]>(modules.map(() => ({ x: 0, y: 0 })));
  const drag = useRef<{ index: number; x: number; y: number; initial: Offset } | null>(null);
  const reassembled = useRef(false);
  const ready = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const [status, setStatus] = useState("Scroll to separate. Select a module to explore.");

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    const paint = () => {
      frame = 0;
      const quiet = media.matches || document.documentElement.dataset.motion === "paused";
      let active = 0;
      modules.forEach((item, index) => {
        const target = document.getElementById(item.target);
        const distance = index === 0 ? scrollY : innerHeight * .85 - (target?.getBoundingClientRect().top ?? innerHeight);
        const progress = quiet || reassembled.current ? 0 : Math.max(0, Math.min(1, distance / (innerHeight * .65)));
        if ((target?.getBoundingClientRect().top ?? innerHeight) < innerHeight * .55) active = index;
        const el = pieces.current[index];
        if (!el) return;
        el.style.setProperty("--separation", String(progress));
        el.style.setProperty("--dx", `${progress * (index % 2 ? 35 : -35)}px`);
        el.style.setProperty("--dy", `${progress * (index - 2.5) * 13}px`);
      });
      if (scene.current) {
        scene.current.dataset.active = String(active);
        const readout = scene.current.querySelector(".flight-readout");
        if (readout) readout.textContent = `0${active + 1} / ${modules[active].caption}`;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const scroll = () => { reassembled.current = false; schedule(); };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener(MOTION_CHANGE_EVENT, schedule);
    media.addEventListener("change", schedule);
    paint();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", schedule);
      window.removeEventListener(MOTION_CHANGE_EVENT, schedule);
      media.removeEventListener("change", schedule);
    };
  }, []);

  function move(index: number, offset: Offset) {
    const el = pieces.current[index];
    const drawing = el?.parentElement;
    const label = el?.querySelector<HTMLElement>(".module-label");
    if (el && drawing && label && offset.x !== 0) {
      const automaticX = Number.parseFloat(el.style.getPropertyValue("--dx") || "0");
      const rightEdge = Math.max(el.offsetWidth, label.offsetLeft + label.offsetWidth);
      const minimumX = Math.max(-40, 6 - el.offsetLeft - automaticX);
      const maximumX = Math.min(40, drawing.clientWidth - el.offsetLeft - rightEdge - automaticX - 6);
      offset = { ...offset, x: Math.max(minimumX, Math.min(maximumX, offset.x)) };
    }
    offsets.current[index] = offset;
    if (el) {
      // Keep manual displacement bounded inside the reserved drawing column.
      el.style.setProperty("--manual-x", `${offset.x}px`);
      el.style.setProperty("--manual-y", `${offset.y}px`);
    }
  }
  function reconnect(index: number) {
    move(index, { x: 0, y: 0 });
    const el = pieces.current[index];
    el?.style.setProperty("--dx", "0px");
    el?.style.setProperty("--dy", "0px");
    el?.style.setProperty("--separation", "0");
  }
  function reset() {
    reassembled.current = true;
    modules.forEach((_, index) => {
      move(index, { x: 0, y: 0 });
      const el = pieces.current[index];
      el?.style.setProperty("--dx", "0px");
      el?.style.setProperty("--dy", "0px");
      el?.style.setProperty("--separation", "0");
    });
    setStatus("Rocket reassembled. Scroll to resume separation.");
  }

  return <div className="rocket-layout shell">
    <div className="rocket-content">{children}</div>
    <aside ref={scene} className="rocket-flight" aria-label="Interactive rocket diagram">
      <div className="drawing-heading"><span>AM—01</span><span>PORTFOLIO VEHICLE</span><span>FIG. 01</span></div>
      <div className="rocket-drawing">
        <div className="drawing-axis" aria-hidden="true" />
        <span className="sketch-star star-a" aria-hidden="true">✧</span><span className="sketch-star star-b" aria-hidden="true">+</span><span className="sketch-star star-c" aria-hidden="true">✧</span>
        <span className="dimension" aria-hidden="true">STAGE SEPARATION / SIX MODULES</span>
        {modules.map((item, index) => <button
          key={item.target}
          ref={el => { pieces.current[index] = el; }}
          className="rocket-module"
          style={{ "--y": `${item.y}px`, "--h": `${item.h}px`, "--i": index } as CSSProperties}
          aria-label={`0${index + 1} ${item.name}: ${item.caption}. Enter to visit; arrow keys to move; Home to reconnect.`}
          disabled={!ready}
          onClick={() => { if (!drag.current) { const target = document.getElementById(item.target); target?.scrollIntoView({ behavior: "instant" }); target?.setAttribute("tabindex", "-1"); target?.focus({ preventScroll: true }); setStatus(`${item.name} — ${item.caption}`); } }}
          onPointerDown={event => {
            if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
            drag.current = { index, x: event.clientX, y: event.clientY, initial: offsets.current[index] };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            const current = drag.current;
            if (!current || current.index !== index) return;
            move(index, { x: Math.max(-40, Math.min(40, current.initial.x + event.clientX - current.x)), y: Math.max(-30, Math.min(30, current.initial.y + event.clientY - current.y)) });
          }}
          onPointerUp={event => {
            const current = drag.current;
            if (!current) return;
            const distance = Math.hypot(event.clientX - current.x, event.clientY - current.y);
            const el = pieces.current[index];
            const visualX = offsets.current[index].x + Number.parseFloat(el?.style.getPropertyValue("--dx") || "0");
            const visualY = offsets.current[index].y + Number.parseFloat(el?.style.getPropertyValue("--dy") || "0");
            if (Math.hypot(visualX, visualY) < 24) reconnect(index);
            if (distance > 5) { event.preventDefault(); setStatus(`${item.name} repositioned. Home reconnects; Reassemble resets all modules.`); setTimeout(() => { drag.current = null; }, 0); }
            else drag.current = null;
          }}
          onPointerCancel={() => { drag.current = null; move(index, { x: 0, y: 0 }); }}
          onKeyDown={event => {
            const directions: Record<string, Offset> = { ArrowLeft: { x: -8, y: 0 }, ArrowRight: { x: 8, y: 0 }, ArrowUp: { x: 0, y: -8 }, ArrowDown: { x: 0, y: 8 } };
            if (event.key === "Home" || event.key === "Escape") { event.preventDefault(); reconnect(index); setStatus(`${item.name} reconnected.`); }
            else if (directions[event.key]) { event.preventDefault(); const direction = directions[event.key]; move(index, { x: Math.max(-40, Math.min(40, offsets.current[index].x + direction.x)), y: Math.max(-30, Math.min(30, offsets.current[index].y + direction.y)) }); setStatus(`${item.name} repositioned. Press Home to reconnect.`); }
          }}
        ><svg viewBox={`0 0 160 ${item.h}`} aria-hidden="true"><path className="module-outline" d={item.path} /><path className="module-detail" d={item.detail} /></svg><span className="module-label"><span>0{index + 1}</span>{" "}{item.name}</span></button>)}
      </div>
      <div className="flight-readout" aria-hidden="true">01 / Introduction</div>
      <div className="drawing-footer"><span>SCROLL TO SEPARATE ↓</span><button className="reassemble" type="button" onClick={reset} disabled={!ready}><span aria-hidden="true">↺ </span>Reassemble</button></div>
      <p className="drawing-help">Drag to catch · arrows to move · Home to reconnect</p>
      <nav className="stage-index" aria-label="Portfolio sections">{modules.map((item, index) => <a href={`#${item.target}`} key={item.target}><span>0{index + 1}</span> {item.caption}</a>)}</nav>
      <p className="sr-only" role="status">{status}</p>
      <noscript><p className="drawing-help">Six stages. Explore each using the section links.</p></noscript>
    </aside>
  </div>;
}
