import type { ReactNode } from "react";
import { rocketModules } from "@/lib/rocket";

export type LaunchMedia = {
  /** Approved local media only; optional and never needed for the layout. */
  src: string; poster: string; width: number; height: number;
  label: string; credit: string;
};

/** A real HTML command body inside an original vector hull; no raster/video dependency. */
export function LaunchVehicle({ children, media }: { children: ReactNode; media?: LaunchMedia }) {
  return <div className="launch-vehicle shell" aria-label="Assembled portfolio rocket">
    <div className="vehicle-registration" aria-hidden="true"><span>AM—01</span><span>STAGE SEPARATION</span><span>PORTFOLIO VEHICLE</span></div>
    <div className="vehicle-hull">
      <svg className="vehicle-outline" viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
        <path className="vehicle-skin" d="M90 160 V150 C170 48 475 18 500 5 C525 18 830 48 910 150 V160Z" />
        <path d="M90 150 H910 M500 12 V72 M480 76 H520" />
      </svg>
      <svg className="vehicle-base" viewBox="0 0 1000 50" preserveAspectRatio="none" aria-hidden="true">
        <path d="M90 0 L20 45 L90 30 H910 L980 45 L910 0 M90 0 H910" />
      </svg>
      <span className="vehicle-star vehicle-star-left" aria-hidden="true">✧</span>
      <span className="vehicle-star vehicle-star-right" aria-hidden="true">+</span>
      <div className="command-body">
        <p className="command-registration"><span>01 / COMMAND MODULE</span><span>CREW · ARISTON MICHAEL</span></p>
        {children}
        {media && <details className="command-media">
          <summary>{media.label}</summary>
          <figure>
            <video controls playsInline preload="none" poster={media.poster} width={media.width} height={media.height} aria-label={media.label}>
              <source src={media.src} type="video/mp4" />
              <a href={media.src}>Open the video</a>
            </video>
            <figcaption>{media.credit}</figcaption>
          </figure>
        </details>}
      </div>
      <nav className="vehicle-stages" aria-label="Assembled rocket stages">
        {rocketModules.slice(1).map((module, i) => <a key={module.target} href={`#${module.target}`}>
          <span>0{i + 2}</span><span>{module.name}</span><span>{module.caption}</span><span aria-hidden="true">↓</span>
        </a>)}
      </nav>
      <div className="vehicle-nozzle" aria-hidden="true"><i /><i /><i /></div>
    </div>
    <p className="vehicle-caption"><span>ONE VEHICLE. SIX STAGES.</span><span>SCROLL TO EXPLORE ↓</span></p>
  </div>;
}
