export const clamp = (value: number) => Math.min(1, Math.max(0, value));
export const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

// One timeline: approach, pass through the rings, then arrive at the explorer.
export function cinemaAt(progress: number) {
  return {
    approach: smoothstep(progress / 0.44),
    morph: smoothstep((progress - 0.42) / 0.4),
    exit: smoothstep((progress - 0.78) / 0.22),
  };
}

// Each half ellipse and its straight destination share two cubic segments.
// The same visible paths survive the entire journey; no swapped trail asset.
export function ringPath(index: number, front: boolean, morph = 0) {
  const rx = 278 + index * 12;
  const ry = 75 + index * 4.5;
  const side = front ? 1 : -1;
  const k = 0.55228475;
  const curve = [
    320 - rx,
    267,
    320 - rx,
    267 + side * ry * k,
    320 - rx * k,
    267 + side * ry,
    320,
    267 + side * ry,
    320 + rx * k,
    267 + side * ry,
    320 + rx,
    267 + side * ry * k,
    320 + rx,
    267,
  ];
  const y = (front ? 238 : 185) + index * 17;
  const line = [-640, y, -320, y, 0, y, 320, y, 640, y, 960, y, 1280, y];
  const v = curve.map((value, i) =>
    (value + (line[i] - value) * morph).toFixed(2),
  );
  return `M${v[0]} ${v[1]}C${v.slice(2, 8).join(" ")}C${v.slice(8).join(" ")}`;
}
