import styles from "./Sketch.module.css";

export type SketchVariant = "hand" | "grid" | "ember" | "wave";

// Original schematic line drawings used only where authentic media is not yet
// available. They are decorative and always paired with a visible
// "illustration" label, never presented as screenshots.
const HAND: readonly [number, number][] = [
  [200, 212], // wrist
  [168, 196], [146, 176], [134, 154], [124, 134], // thumb
  [176, 150], [170, 116], [166, 94], [163, 74], // index
  [198, 146], [198, 106], [198, 82], [198, 60], // middle
  [218, 150], [224, 114], [228, 92], [231, 74], // ring
  [236, 160], [248, 134], [255, 118], [261, 102], // pinky
];
const BONES: readonly [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

function HandSketch() {
  return (
    <>
      <rect x="112" y="48" width="164" height="178" className={styles.dash} />
      {BONES.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={HAND[a][0]}
          y1={HAND[a][1]}
          x2={HAND[b][0]}
          y2={HAND[b][1]}
          className={styles.line}
        />
      ))}
      {HAND.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={index === 8 ? 4.5 : 2.6}
          className={index === 8 ? styles.accentDot : styles.dot}
        />
      ))}
      <path d="M163 74 L300 64" className={styles.leader} />
      <g transform="translate(316 62)">
        <path d="M0 -12 V12 M-12 0 H12" className={styles.accent} />
        <circle r="6" className={styles.accent} />
      </g>
      <text x="112" y="40" className={styles.label}>LANDMARKS · 21</text>
      <text x="292" y="92" className={styles.label}>CURSOR</text>
    </>
  );
}

function GridSketch() {
  const nodes: readonly [number, number, string?][] = [
    [96, 170], [142, 84, "1"], [214, 140, "2"], [290, 94, "3"], [318, 190], [178, 196], [252, 214],
  ];
  return (
    <>
      <path d="M60 210 C110 150 150 190 200 120 S300 70 350 60" className={styles.dash} />
      <path d="M50 120 C100 90 150 60 230 70 S320 140 352 150" className={styles.line} />
      {nodes.map(([x, y, rank]) =>
        rank ? (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="13" className={styles.accent} />
            <circle cx={x} cy={y} r="3.5" className={styles.accentDot} />
            <text x={x + 18} y={y - 10} className={styles.label}>{`#${rank}`}</text>
          </g>
        ) : (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="3" className={styles.dot} />
        ),
      )}
      <text x="40" y="22" className={styles.label}>CANDIDATE SITES · RANKED</text>
    </>
  );
}

function EmberSketch() {
  const embers: readonly [number, number, number][] = [
    [120, 150, 3], [150, 132, 4], [176, 118, 3], [204, 104, 5], [232, 96, 3], [258, 84, 4], [290, 76, 3], [190, 140, 2.5], [244, 122, 2.5],
  ];
  return (
    <>
      <path d="M30 210 L90 170 L130 186 L190 150 L250 172 L310 140 L370 160" className={styles.line} />
      <path d="M30 228 H370" className={styles.dash} />
      {[70, 110, 330].map((x) => (
        <path key={x} d={`M${x} ${x === 330 ? 152 : 182} l-10 26 h20 z`} className={styles.line} />
      ))}
      {embers.map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} className={styles.accentDot} />
      ))}
      <path d="M60 60 H160 M140 48 L160 60 L140 72" className={styles.leader} />
      <text x="60" y="44" className={styles.label}>WIND</text>
    </>
  );
}

function WaveSketch() {
  return (
    <>
      {[34, 64, 94].map((r) => (
        <circle key={r} cx="200" cy="130" r={r} className={r === 94 ? styles.dash : styles.line} />
      ))}
      <path d="M200 20 V240 M60 130 H340" className={styles.grid} />
      <circle cx="200" cy="130" r="5" className={styles.accentDot} />
      {[[258, 62], [118, 88], [286, 176], [140, 196]].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path d="M-7 -7 L7 7 M7 -7 L-7 7" className={styles.line} />
        </g>
      ))}
      <text x="40" y="34" className={styles.label}>WAVE 01 → 02 → 03</text>
    </>
  );
}

export function Sketch({ variant }: { variant: SketchVariant }) {
  return (
    <svg
      className={styles.sketch}
      viewBox="0 0 400 260"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {variant === "hand" && <HandSketch />}
      {variant === "grid" && <GridSketch />}
      {variant === "ember" && <EmberSketch />}
      {variant === "wave" && <WaveSketch />}
    </svg>
  );
}
