export function SiteHeader({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <header className="site-header shell">
      <a
        className="wordmark"
        href={`${prefix}#top`}
        aria-label="AM. — Ariston Michael, back to top"
      >
        <span className="brand-orbit" aria-hidden="true">
          ✦
        </span>{" "}
        AM<span className="text-cyan-200">.</span>
      </a>
      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {["About", "Projects", "Experience", "Skills", "Contact"].map(
            (label) => (
              <li key={label}>
                <a href={`${prefix}#${label.toLowerCase()}`}>{label}</a>
              </li>
            ),
          )}
        </ul>
      </nav>
    </header>
  );
}
