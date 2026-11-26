// Original pixel art drawn from character grids. Horizontal runs of the same
// colour merge into one <rect>, keeping the SVG small and edges crisp.

type Palette = Readonly<Record<string, string>>;

type PixelArtProps = {
  rows: readonly string[];
  palette: Palette;
  className?: string;
};

export function PixelArt({ rows, palette, className }: PixelArtProps) {
  const width = Math.max(...rows.map((row) => row.length));
  const rects: { x: number; y: number; w: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x];
      const fill = palette[key];
      let end = x + 1;
      while (end < row.length && row[end] === key) end++;
      if (fill) rects.push({ x, y, w: end - x, fill });
      x = end;
    }
  });
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${rows.length}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
    >
      {rects.map((r) => (
        <rect
          key={`${r.x}-${r.y}`}
          x={r.x}
          y={r.y}
          width={r.w}
          height={1}
          fill={r.fill}
        />
      ))}
    </svg>
  );
}

const ink = { "#": "currentColor" } as const;

const icons = {
  // "in" letterform on a rounded tile.
  linkedin: [
    "............",
    ".##.........",
    ".##.........",
    "............",
    ".##.##.###..",
    ".##.#######.",
    ".##.###..##.",
    ".##.##...##.",
    ".##.##...##.",
    ".##.##...##.",
    ".##.##...##.",
    "............",
  ],
  // Branching commit graph.
  github: [
    "............",
    "..##....##..",
    ".####..####.",
    "..##....##..",
    "..##....##..",
    "..##...##...",
    "..##..##....",
    "..####......",
    "..##........",
    ".####.......",
    "..##........",
    "............",
  ],
  // Browser window with address bar.
  portfolio: [
    "............",
    "###########.",
    "#.#.#......#",
    "############",
    "#..........#",
    "#.####.....#",
    "#.####.###.#",
    "#.####.....#",
    "#......###.#",
    "#..........#",
    "############",
    "............",
  ],
  email: [
    "............",
    "............",
    "############",
    "##........##",
    "#.#......#.#",
    "#..##..##..#",
    "#....##....#",
    "#..........#",
    "#..........#",
    "############",
    "............",
    "............",
  ],
  // Floppy disk: the original "save" glyph.
  save: [
    "##########..",
    "#.#....#.##.",
    "#.#....#..##",
    "#.######...#",
    "#..........#",
    "#.########.#",
    "#.#......#.#",
    "#.#......#.#",
    "#.#......#.#",
    "#.#......#.#",
    "############",
    "............",
  ],
  arrow: [
    "...#....",
    "...##...",
    "#######.",
    "########",
    "#######.",
    "...##...",
    "...#....",
  ],
  cap: [
    "......##......",
    "...########...",
    "##############",
    "...########.#.",
    "....######..#.",
    "....######..##",
    "......##......",
  ],
  cloud: [
    "....####....",
    "..########..",
    ".##########.",
    "############",
    "############",
    ".##########.",
  ],
} as const;

export type IconName = keyof typeof icons;

export function PixelIcon({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  return <PixelArt rows={icons[name]} palette={ink} className={className} />;
}

// 16×16 original avatar bust: a deliberate placeholder, not a likeness.
const avatarRows = [
  "................",
  ".....hhhhhh.....",
  "....hhhhhhhh....",
  "...hhhhhhhhhh...",
  "...hhsssssshh...",
  "...hssssssssh...",
  "...sseesseess...",
  "...ssssssssss...",
  "....sssmmsss....",
  ".....ssssss.....",
  "......ssss......",
  "..ccccwwwwcccc..",
  ".cccccwwwwccccc.",
  ".ccccccwwcccccc.",
  "cccccccwwccccccc",
  "cccccccccccccccc",
];
const avatarPalette = {
  h: "#1b2a44",
  s: "#e7c4a9",
  e: "#10243f",
  m: "#a34f2e",
  c: "#2e493e",
  w: "#f3ebc2",
} as const;

export function PixelAvatar({ className }: { className?: string }) {
  return (
    <PixelArt rows={avatarRows} palette={avatarPalette} className={className} />
  );
}

// Brand mark: a tiny monitor with a cyan "A" prompt.
const brandRows = [
  "############",
  "#..........#",
  "#....##....#",
  "#...#..#...#",
  "#...####...#",
  "#...#..#...#",
  "#..........#",
  "############",
  "....####....",
  "..########..",
];

export function PixelBrand({ className }: { className?: string }) {
  return (
    <PixelArt
      rows={brandRows}
      palette={{ "#": "#f3ebc2", ".": "#10243f" }}
      className={className}
    />
  );
}

// Four-point sparkle used as desktop decoration.
export function PixelSparkle({ className }: { className?: string }) {
  return (
    <PixelArt
      rows={["..#..", "..#..", "##.##", "..#..", "..#.."]}
      palette={ink}
      className={className}
    />
  );
}
