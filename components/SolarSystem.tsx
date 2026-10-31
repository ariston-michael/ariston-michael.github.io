"use client";
import { useState, type CSSProperties } from "react";
import { solarDestinations } from "@/lib/solar";

export function SolarSystem() {
  const [selected, setSelected] = useState<string>("sun");
  const current =
    solarDestinations.find((world) => world.id === selected) ??
    solarDestinations[0];
  return (
    <section
      className="section solar-section shell"
      id="solar-system"
      aria-labelledby="solar-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">A DIFFERENT WAY TO EXPLORE</p>
          <h2 id="solar-title">
            A small system.
            <br />
            <span>A world of possibilities.</span>
          </h2>
        </div>
        <p>
          An imaginative map of this portfolio.
          <br />
          Sizes and paths are illustrative.
        </p>
      </div>
      <p className="solar-instructions">
        Choose a world to preview its destination. Use Tab and Enter, a mouse,
        or a tap.
      </p>
      <div
        className="solar-map"
        role="group"
        aria-label="Sun and eight planets: portfolio destinations"
      >
        <svg
          className="solar-orbits"
          viewBox="0 0 1200 370"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="orbit-light">
              <stop stopColor="#f4c980" stopOpacity=".2" />
              <stop offset="1" stopColor="#8097d1" stopOpacity=".07" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#orbit-light)">
            <ellipse cx="180" cy="185" rx="160" ry="70" />
            <ellipse cx="180" cy="185" rx="330" ry="110" />
            <ellipse cx="180" cy="185" rx="550" ry="140" />
            <ellipse cx="180" cy="185" rx="820" ry="170" />
            <path d="M20 185h1160" strokeDasharray="2 12" />
          </g>
        </svg>
        {solarDestinations.map((world) => (
          <button
            key={world.id}
            type="button"
            className={`world world-${world.id}`}
            style={
              {
                "--world-x": `${world.x}%`,
                "--world-y": `${world.y}%`,
              } as CSSProperties
            }
            aria-pressed={selected === world.id}
            aria-controls="solar-panel"
            onClick={() => setSelected(world.id)}
          >
            <span
              className={`world-surface surface-${world.id}`}
              aria-hidden="true"
            />
            <span className="world-name">{world.name}</span>
            <span className="world-section">{world.section}</span>
          </button>
        ))}
      </div>
      <div
        className="solar-panel"
        id="solar-panel"
        role="region"
        aria-labelledby="solar-panel-title"
        aria-live="polite"
        aria-atomic="true"
      >
        <div>
          <p className="eyebrow">
            {current.name.toUpperCase()} / {current.section.toUpperCase()}
          </p>
          <h3 id="solar-panel-title">{current.title}</h3>
          <p>{current.description}</p>
        </div>
        <a className="button button-secondary" href={current.href}>
          {current.action} <span aria-hidden="true">↗</span>
        </a>
      </div>
      <nav className="solar-direct" aria-label="Solar system direct navigation">
        <p>Prefer a direct route?</p>
        <ul>
          {solarDestinations.map((world) => (
            <li key={world.id}>
              <a href={world.href}>{world.section}</a>
            </li>
          ))}
        </ul>
      </nav>
      <noscript>
        <style>{`.solar-map, .solar-instructions { display: none; }`}</style>
      </noscript>
    </section>
  );
}
