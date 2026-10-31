export function SiteHeader() {
  return (
    <header className="site-header shell">
      <a
        className="wordmark"
        href="#top"
        aria-label="Ariston Michael, back to top"
      >
        <span className="brand-orbit" aria-hidden="true">
          ✦
        </span>{" "}
        AM<span className="text-cyan-200">.</span>
      </a>
      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {["About", "Projects", "Skills", "Contact"].map((label) => (
            <li key={label}>
              <a href={`#${label.toLowerCase()}`}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
