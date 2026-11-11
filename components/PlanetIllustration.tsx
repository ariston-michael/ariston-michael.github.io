import { ringPath } from "@/lib/cinema";

function RingHalves({
  front,
  cinematic,
  prefix,
}: {
  front: boolean;
  cinematic: boolean;
  prefix: string;
}) {
  return (
    <g
      className="ring-frame"
      transform="rotate(-26 320 267)"
      fill="none"
      stroke={`url(#${prefix}rings)`}
    >
      {[0, 1, 2].map((index) => (
        <path
          key={index}
          data-ring={cinematic ? index : undefined}
          data-front={front ? "true" : "false"}
          d={ringPath(index, front)}
          strokeWidth={index === 0 ? 22 : 2}
        />
      ))}
    </g>
  );
}

export function PlanetIllustration({
  cinematic = false,
  idPrefix = "",
}: {
  cinematic?: boolean;
  idPrefix?: string;
}) {
  return (
    <figure className={`planet-scene${cinematic ? " cinematic-planet" : ""}`}>
      <div className="planet-window">
        <div className="planet-approach">
          <svg
            className="planet"
            viewBox="0 0 640 540"
            role="img"
            aria-labelledby={`${idPrefix}planet-title ${idPrefix}planet-desc`}
          >
            <title id={`${idPrefix}planet-title`}>A quiet orbit</title>
            <desc id={`${idPrefix}planet-desc`}>
              Original illustration of a blue and violet Saturn-inspired planet,
              encircled by luminous rings.
            </desc>
            <defs>
              <radialGradient id={`${idPrefix}atmosphere`}>
                <stop stopColor="#555be0" stopOpacity=".32" />
                <stop offset="1" stopColor="#555be0" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id={`${idPrefix}surface`}
                cx=".3"
                cy=".22"
                r=".85"
              >
                <stop stopColor="#b4ddf4" />
                <stop offset=".15" stopColor="#a5bfd3" />
                <stop offset=".32" stopColor="#7b7fa9" />
                <stop offset=".6" stopColor="#393465" />
                <stop offset="1" stopColor="#0c1026" />
              </radialGradient>
              <linearGradient
                id={`${idPrefix}rings`}
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="267"
                x2="640"
                y2="267"
              >
                <stop stopColor="#8abfe4" stopOpacity=".12" />
                <stop offset=".35" stopColor="#b1a0e4" stopOpacity=".75" />
                <stop offset=".7" stopColor="#80b8d5" stopOpacity=".4" />
                <stop offset="1" stopColor="#aaa3e9" stopOpacity=".12" />
              </linearGradient>
              <linearGradient
                id={`${idPrefix}cloud-bands`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop stopColor="#e8d7d0" stopOpacity=".32" />
                <stop offset=".45" stopColor="#94b9df" stopOpacity=".05" />
                <stop offset="1" stopColor="#8574b8" stopOpacity=".22" />
              </linearGradient>
              <clipPath id={`${idPrefix}planet-clip`}>
                <circle cx="320" cy="267" r="132" />
              </clipPath>
            </defs>
            <circle
              className="planet-atmosphere"
              cx="320"
              cy="267"
              r="245"
              fill={`url(#${idPrefix}atmosphere)`}
            />
            <g
              className="planet-orbit"
              fill="none"
              stroke="#9aace0"
              opacity=".16"
            >
              <circle cx="320" cy="267" r="213" strokeDasharray="2 10" />
              <path d="M320 32v28M320 474v28M85 267h28M527 267h28" />
            </g>
            <RingHalves front={false} cinematic={cinematic} prefix={idPrefix} />
            <g className="planet-body">
              <circle
                cx="320"
                cy="267"
                r="132"
                fill={`url(#${idPrefix}surface)`}
                stroke="#b1bfef"
                strokeOpacity=".35"
              />
              <g
                clipPath={`url(#${idPrefix}planet-clip)`}
                fill="none"
                stroke="#d4b6e7"
                strokeWidth="10"
                opacity=".09"
                transform="rotate(-26 320 267)"
              >
                <path d="M150 200Q320 240 480 200M150 230Q320 270 480 230M150 290Q320 330 480 290M150 325Q320 365 480 325" />
              </g>
              <g
                clipPath={`url(#${idPrefix}planet-clip)`}
                transform="rotate(-26 320 267)"
                fill="none"
                stroke={`url(#${idPrefix}cloud-bands)`}
              >
                <path
                  d="M170 173Q320 218 470 173M170 192Q320 237 470 192M170 249Q320 294 470 249M170 272Q320 317 470 272M170 340Q320 385 470 340"
                  strokeWidth="5"
                />
              </g>
            </g>
            <RingHalves front cinematic={cinematic} prefix={idPrefix} />
            <circle cx="512" cy="108" r="4" fill="#b3e8f1" />
            <path
              d="M512 94v28m-14-14h28"
              stroke="#b3e8f1"
              strokeOpacity=".5"
            />
          </svg>
        </div>
      </div>
      <figcaption>
        <span className="orbit-dot" /> ORIGINAL ILLUSTRATION{" "}
        <span className="caption-divider">/</span> A QUIET ORBIT
      </figcaption>
    </figure>
  );
}
