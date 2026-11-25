"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { rocketModules as modules } from "@/lib/rocket";
import { MOTION_CHANGE_EVENT } from "@/lib/motion";

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
      const landing = document.querySelector<HTMLElement>(".launch-vehicle");
      if (landing) {
        const hull = landing.querySelector(".vehicle-hull")!.getBoundingClientRect();
        const separation = quiet || reassembled.current ? 0 : Math.max(0, Math.min(1, -hull.top / (hull.height * .65)));
        landing.style.setProperty("--launch-separation", String(separation));
      }
      let active = 0;
      const drawingBottom = scene.current?.querySelector(".rocket-drawing")?.getBoundingClientRect().bottom ?? innerHeight;
      const commandDistance = innerWidth <= 900 ? innerHeight * .85 - drawingBottom : scrollY;
      const stages = modules.map((item, index) => {
        const top = document.getElementById(item.target)?.getBoundingClientRect().top ?? innerHeight;
        const distance = index === 0 ? commandDistance : innerHeight * .85 - top;
        const progress = quiet || reassembled.current ? 0 : Math.max(0, Math.min(1, distance / (innerHeight * .65)));
        if (top < innerHeight * .55) active = index;
        return progress;
      });
      // Expand joints cumulatively so a separating lower stage never crosses
      // the still-attached engine. Both directions derive from the same scroll.
      const expansion = stages.slice(0, -1).reduce((sum, progress) => sum + progress * 12, 0);
      let precedingGap = 0;
      stages.forEach((progress, index) => {
        const el = pieces.current[index];
        if (el) {
          el.style.setProperty("--separation", String(progress));
          el.style.setProperty("--dx", `${progress * (index % 2 ? 35 : -35)}px`);
          el.style.setProperty("--dy", `${precedingGap - expansion / 2}px`);
        }
        precedingGap += progress * 12;
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
    document.querySelector<HTMLElement>(".launch-vehicle")?.style.setProperty("--launch-separation", "0");
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
            const assemblyScale = el ? Number.parseFloat(getComputedStyle(el).getPropertyValue("--assembly-scale") || "1") : 1;
            const visualY = offsets.current[index].y + Number.parseFloat(el?.style.getPropertyValue("--dy") || "0") * assemblyScale;
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
