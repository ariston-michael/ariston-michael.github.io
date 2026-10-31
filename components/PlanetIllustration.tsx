export function PlanetIllustration() {
  return (
    <figure className="planet-scene">
      <svg
        className="planet"
        viewBox="0 0 640 540"
        role="img"
        aria-labelledby="planet-title planet-desc"
      >
        <title id="planet-title">A quiet orbit</title>
        <desc id="planet-desc">
          Original illustration of a blue and violet Saturn-inspired planet,
          encircled by luminous rings.
        </desc>
        <defs>
          <radialGradient id="atmosphere">
            <stop stopColor="#555be0" stopOpacity=".32" />
            <stop offset="1" stopColor="#555be0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="surface" cx=".3" cy=".22" r=".85">
            <stop stopColor="#b4ddf4" />
            <stop offset=".25" stopColor="#7478ba" />
            <stop offset=".6" stopColor="#393465" />
            <stop offset="1" stopColor="#0c1026" />
          </radialGradient>
          <linearGradient id="rings">
            <stop stopColor="#8abfe4" stopOpacity=".12" />
            <stop offset=".35" stopColor="#b1a0e4" stopOpacity=".75" />
            <stop offset=".7" stopColor="#80b8d5" stopOpacity=".4" />
            <stop offset="1" stopColor="#aaa3e9" stopOpacity=".12" />
          </linearGradient>
          <clipPath id="planet-clip">
            <circle cx="320" cy="267" r="132" />
          </clipPath>
        </defs>
        <circle cx="320" cy="267" r="245" fill="url(#atmosphere)" />
        <g fill="none" stroke="#9aace0" opacity=".16">
          <circle cx="320" cy="267" r="213" strokeDasharray="2 10" />
          <path d="M320 32v28M320 474v28M85 267h28M527 267h28" />
        </g>
        <g transform="rotate(-26 320 267)" fill="none" stroke="url(#rings)">
          <ellipse cx="320" cy="267" rx="278" ry="75" strokeWidth="22" />
          <ellipse cx="320" cy="267" rx="302" ry="84" strokeWidth="2" />
        </g>
        <circle
          cx="320"
          cy="267"
          r="132"
          fill="url(#surface)"
          stroke="#b1bfef"
          strokeOpacity=".35"
        />
        <g
          clipPath="url(#planet-clip)"
          fill="none"
          stroke="#d4b6e7"
          strokeWidth="10"
          opacity=".09"
          transform="rotate(-26 320 267)"
        >
          <path d="M150 200Q320 240 480 200M150 230Q320 270 480 230M150 290Q320 330 480 290M150 325Q320 365 480 325" />
        </g>
        <g transform="rotate(-26 320 267)" fill="none" stroke="url(#rings)">
          <path d="M42 267a278 75 0 0 0 556 0" strokeWidth="22" />
          <path d="M18 267a302 84 0 0 0 604 0" strokeWidth="2" />
        </g>
        <circle cx="512" cy="108" r="4" fill="#b3e8f1" />
        <path d="M512 94v28m-14-14h28" stroke="#b3e8f1" strokeOpacity=".5" />
      </svg>
      <figcaption>
        <span className="orbit-dot" /> ORIGINAL ILLUSTRATION{" "}
        <span className="caption-divider">/</span> A QUIET ORBIT
      </figcaption>
    </figure>
  );
}
