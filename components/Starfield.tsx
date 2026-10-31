import type { CSSProperties } from "react";

// Stable integer arithmetic: identical markup at every build, no client particles.
export function Starfield() {
  const random = (index: number) => {
    let value = index + 271828;
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    value = Math.imul(value ^ (value >>> 16), 0x45d9f3b);
    return ((value ^ (value >>> 16)) >>> 0) / 4294967296;
  };
  const stars = Array.from({ length: 72 }, (_, i) => {
    const style = {
      left: `${random(i * 7 + 1) * 100}%`,
      top: `${random(i * 7 + 2) * 100}%`,
      width: `${i % 9 === 0 ? 3 : 1.5}px`,
      height: `${i % 9 === 0 ? 3 : 1.5}px`,
      "--brightness": 0.25 + random(i * 7 + 3) * 0.6,
      "--duration": `${4 + random(i * 7 + 4) * 6}s`,
      animationDelay: `${-random(i * 7 + 5) * 10}s`,
    } as CSSProperties;
    return <span key={i} className="star" style={style} />;
  });
  return (
    <div className="starfield" aria-hidden="true">
      {stars}
    </div>
  );
}
