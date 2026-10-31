"use client";
import { useEffect } from "react";
import { MOTION_CHANGE_EVENT } from "@/lib/motion";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/** One imperative controller. Stars and SVG stay static server-rendered content. */
export function CosmicMotion() {
  useEffect(() => {
    const field = document.querySelector<HTMLElement>(".starfield");
    if (!field) return;
    const hero = document.querySelector<HTMLElement>(".hero");
    const planet = hero?.querySelector<HTMLElement>(".planet-approach");
    const layers = Array.from(
      field.querySelectorAll<HTMLElement>(".star-layer"),
    );
    const stars = Array.from(
      field.querySelectorAll<HTMLElement>(".star-point"),
      (element) => ({
        element,
        x: parseFloat(element.style.left) / 100,
        y: parseFloat(element.style.top) / 100,
        depth: Number(element.dataset.depth),
        glow: -1,
      }),
    );
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    );
    const narrow = matchMedia("(max-width: 767px)");
    let frame = 0;
    let enabled = false;
    let pointerEnabled = false;
    let inside = false;
    let fieldLeft = 0,
      fieldTop = 0,
      fieldWidth = 1,
      fieldHeight = 1;
    let heroTop = 0,
      heroHeight = 1;
    let targetX = innerWidth / 2,
      targetY = innerHeight / 2;
    let cursorX = targetX,
      cursorY = targetY;
    let offsetX = 0,
      offsetY = 0,
      proximity = 0;
    let progress = 0,
      targetProgress = 0;
    let scaleLimit = 0.065,
      shiftLimit = 12;
    let scrollY = window.scrollY;

    function measure() {
      const rect = field!.getBoundingClientRect();
      fieldLeft = rect.left;
      fieldTop = rect.top + window.scrollY;
      fieldWidth = rect.width;
      fieldHeight = rect.height;
      if (hero) {
        const bounds = hero.getBoundingClientRect();
        heroTop = bounds.top + window.scrollY;
        heroHeight = Math.max(1, bounds.height);
      }
      scaleLimit = narrow.matches ? 0.025 : innerWidth < 1024 ? 0.04 : 0.065;
      shiftLimit = narrow.matches ? 4 : innerWidth < 1024 ? 7 : 12;
      scrollY = window.scrollY;
      updateScroll();
    }
    function schedule() {
      if (enabled && !document.hidden && !frame)
        frame = requestAnimationFrame(render);
    }
    function updateScroll() {
      scrollY = window.scrollY;
      // Progress depends only on the measured hero, never document length.
      targetProgress = clamp((scrollY - heroTop) / (heroHeight * 0.85));
      schedule();
    }
    function render() {
      frame = 0;
      if (!enabled || document.hidden) return;
      cursorX += (targetX - cursorX) * 0.14;
      cursorY += (targetY - cursorY) * 0.14;
      const desiredX =
        inside && pointerEnabled ? (cursorX / innerWidth - 0.5) * 16 : 0;
      const desiredY =
        inside && pointerEnabled ? (cursorY / innerHeight - 0.5) * 12 : 0;
      offsetX += (desiredX - offsetX) * 0.14;
      offsetY += (desiredY - offsetY) * 0.14;
      const desiredProximity = inside && pointerEnabled ? 1 : 0;
      proximity += (desiredProximity - proximity) * 0.14;
      progress += (targetProgress - progress) * 0.14;
      layers.forEach((layer, index) => {
        const depth = (index + 1) / 3;
        layer.style.transform = `translate3d(${(offsetX * depth).toFixed(3)}px,${(offsetY * depth).toFixed(3)}px,0)`;
      });
      if (pointerEnabled || proximity > 0.001) {
        for (const star of stars) {
          const dx =
            cursorX - (fieldLeft + star.x * fieldWidth + offsetX * star.depth);
          const dy =
            cursorY -
            (fieldTop - scrollY + star.y * fieldHeight + offsetY * star.depth);
          const distance = dx * dx + dy * dy;
          const glow =
            distance < 19600 ? (1 - distance / 19600) * proximity : 0;
          // Quantize updates and avoid writes to distant, unchanged stars.
          const rounded = Math.round(glow * 100) / 100;
          if (rounded !== star.glow) {
            star.element.style.setProperty("--proximity", String(rounded));
            star.glow = rounded;
          }
        }
      }
      if (planet) {
        planet.style.setProperty(
          "--saturn-scale",
          (1 + progress * scaleLimit).toFixed(5),
        );
        planet.style.setProperty(
          "--saturn-y",
          `${(-progress * shiftLimit).toFixed(3)}px`,
        );
        planet.style.setProperty(
          "--saturn-opacity",
          (1 - progress * 0.04).toFixed(4),
        );
      }
      const unsettled =
        Math.abs(targetX - cursorX) + Math.abs(targetY - cursorY) > 0.2 ||
        Math.abs(desiredX - offsetX) + Math.abs(desiredY - offsetY) > 0.02 ||
        Math.abs(desiredProximity - proximity) > 0.001 ||
        Math.abs(targetProgress - progress) > 0.0001;
      if (unsettled) schedule();
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      inside = true;
      targetX = event.clientX;
      targetY = event.clientY;
      schedule();
    }
    function leave() {
      inside = false;
      schedule();
    }
    function reset() {
      cancelAnimationFrame(frame);
      frame = 0;
      inside = false;
      offsetX = offsetY = proximity = progress = 0;
      layers.forEach((layer) => layer.style.removeProperty("transform"));
      stars.forEach((star) => {
        star.element.style.removeProperty("--proximity");
        star.glow = -1;
      });
      planet?.style.removeProperty("--saturn-scale");
      planet?.style.removeProperty("--saturn-y");
      planet?.style.removeProperty("--saturn-opacity");
    }
    function configure() {
      reset();
      enabled =
        !reduced.matches &&
        document.documentElement.dataset.motion !== "paused";
      pointerEnabled = enabled && pointer.matches;
      // Remove before adding so preference changes never accumulate listeners.
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", updateScroll);
      if (enabled) {
        if (pointerEnabled) {
          window.addEventListener("pointermove", move, { passive: true });
          document.documentElement.addEventListener("pointerleave", leave);
          window.addEventListener("blur", leave);
        }
        if (planet || pointerEnabled)
          window.addEventListener("scroll", updateScroll, { passive: true });
        measure();
      }
    }
    function visibility() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (enabled) measure();
    }
    const observer = new ResizeObserver(measure);
    observer.observe(field);
    if (hero) observer.observe(hero);
    reduced.addEventListener("change", configure);
    pointer.addEventListener("change", configure);
    narrow.addEventListener("change", configure);
    window.addEventListener(MOTION_CHANGE_EVENT, configure);
    document.addEventListener("visibilitychange", visibility);
    configure();
    return () => {
      enabled = false;
      reset();
      observer.disconnect();
      reduced.removeEventListener("change", configure);
      pointer.removeEventListener("change", configure);
      narrow.removeEventListener("change", configure);
      window.removeEventListener(MOTION_CHANGE_EVENT, configure);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      window.removeEventListener("blur", leave);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);
  return null;
}
