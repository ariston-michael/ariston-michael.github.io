import type { CSSProperties } from "react";
import { CosmicMotion } from "./CosmicMotion";

// Same seeded positions; three lightweight layers add depth without a particle runtime.
export function Starfield() {
  const random = (index: number) => {
    let value = index + 271828;
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
  };
  return (
    <div className="starfield" aria-hidden="true">
      {[0, 1, 2].map((layer) => (
        <div className="star-layer" key={layer} data-depth={(layer + 1) / 3}>
          {Array.from({ length: 24 }, (_, index) => {
            const i = index * 3 + layer;
            const style = {
              left: `${random(i * 7 + 1) * 100}%`,
              top: `${random(i * 7 + 2) * 100}%`,
              width: `${i % 9 === 0 ? 3 : 1.5}px`,
              height: `${i % 9 === 0 ? 3 : 1.5}px`,
              "--brightness": 0.25 + random(i * 7 + 3) * 0.6,
              "--duration": `${4 + random(i * 7 + 4) * 6}s`,
              "--delay": `${-random(i * 7 + 5) * 10}s`,
            } as CSSProperties;
            return (
              <span
                key={i}
                className="star-point"
                data-depth={(layer + 1) / 3}
                data-mobile-hidden={i >= 36 ? "" : undefined}
                style={style}
              >
                <span className="star" />
              </span>
            );
          })}
        </div>
      ))}
      <CosmicMotion />
    </div>
  );
}
