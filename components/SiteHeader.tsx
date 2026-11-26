export function SiteHeader({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return (
    <header className="site-header shell">
      <a
        className="wordmark"
        href={home ? "#top" : "/"}
        aria-label="Ariston OS — homepage"
      >
        <span className="brand-icon" aria-hidden="true">
          a<span>o</span>
        </span>
        <span>
          Ariston OS<span className="brand-caption">PERSONAL WORKSPACE</span>
        </span>
      </a>
      <nav aria-label="Main navigation">
        <ul>
          {["Projects", "Experience", "Skills", "Contact"].map((label) => (
            <li key={label}>
              <a href={`${prefix}#${label.toLowerCase()}`}>{label}</a>
            </li>
          ))}
          <li>
            <a className="nav-card" href="/card/">
              Contact card <span aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
