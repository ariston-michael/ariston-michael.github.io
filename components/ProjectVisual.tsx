/** Original abstract artwork, not a screenshot or a project architecture claim. */
export function ProjectVisual({ id }: { id: string }) {
  return (
    <div className={`project-art art-${id}`} aria-hidden="true">
      <svg viewBox="0 0 520 190" fill="none">
        <g className="art-grid" stroke="currentColor" opacity=".12">
          {[60, 110, 160, 210, 260, 310, 360, 410, 460].map((x) => (
            <path key={x} d={`M${x} 20v150`} />
          ))}
          {[45, 95, 145].map((y) => (
            <path key={y} d={`M45 ${y}h430`} />
          ))}
        </g>
        {id === "aircontrol" && (
          <g stroke="currentColor" strokeWidth="2">
            <circle
              cx="260"
              cy="95"
              r="66"
              opacity=".2"
              strokeDasharray="3 8"
            />
            <path
              d="m214 132-19-32q-4-12 6-13 6 0 13 15V62q0-12 10-12t10 12V39q0-12 10-12t10 12v21-28q0-12 10-12t10 12v31-18q0-12 10-12t10 12v53q0 36-24 48h-42z"
              fill="currentColor"
              fillOpacity=".07"
            />
            <path d="M141 70h25m-12-12v25M354 110h27m-13-13v27" opacity=".6" />
            <circle cx="224" cy="99" r="4" fill="currentColor" />
            <circle cx="264" cy="80" r="4" fill="currentColor" />
          </g>
        )}
        {id === "energy" && (
          <g stroke="currentColor" strokeWidth="2">
            <path d="m103 145 65-49 74 17 57-64 117 18" opacity=".5" />
            <path
              d="M170 96h69m60-47 19 66-76-2m76 2 98-48"
              strokeDasharray="5 6"
              opacity=".5"
            />
            {[
              [103, 145],
              [170, 96],
              [242, 113],
              [299, 49],
              [318, 115],
              [416, 67],
            ].map(([x, y], i) => (
              <g key={x}>
                <circle cx={x} cy={y} r={i === 2 ? 18 : 8} fill="#101a2e" />
                <circle cx={x} cy={y} r={i === 2 ? 5 : 2} fill="currentColor" />
              </g>
            ))}
          </g>
        )}
        {id === "fireguard" && (
          <g stroke="currentColor" strokeWidth="2">
            <path
              d="m260 30 64 27v42q0 34-64 64-64-30-64-64V57z"
              fill="currentColor"
              fillOpacity=".05"
            />
            <path d="m240 77-18 18 18 18m40-36 18 18-18 18m-15-44-10 52" />
            <circle
              cx="260"
              cy="95"
              r="78"
              opacity=".15"
              strokeDasharray="2 8"
            />
          </g>
        )}
        {id === "chicken" && (
          <g stroke="currentColor" strokeWidth="2">
            <path
              d="m260 37 52 30v60l-52 30-52-30V67zM208 67l52 30 52-30m-52 30v60"
              fill="currentColor"
              fillOpacity=".05"
            />
            <path
              d="m147 112 22-13 22 13v26l-22 13-22-13zm182-49 22-13 22 13v26l-22 13-22-13z"
              opacity=".4"
            />
            <path d="M135 162h250" opacity=".2" />
          </g>
        )}
      </svg>
      <span>ORIGINAL CONCEPT ART</span>
    </div>
  );
}
