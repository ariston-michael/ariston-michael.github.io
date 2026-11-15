import { rocketModules } from "@/lib/rocket";

/** Static companion drawing; never requires hydration or motion. */
export function RocketSketch() {
  return <svg className="recovery-rocket" viewBox="0 -10 160 630" role="img" aria-label="An assembled six-stage rocket, drawn in technical linework">
    {rocketModules.map(item => <g key={item.target} transform={`translate(0 ${item.y})`}>
      <path className="module-outline" d={item.path} />
      <path className="module-detail" d={item.detail} />
    </g>)}
  </svg>;
}
