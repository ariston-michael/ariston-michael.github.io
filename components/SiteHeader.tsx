export function SiteHeader({ home = true }: { home?: boolean }) {
  const prefix = home ? "" : "/";
  return <header className="site-header shell">
    <a className="wordmark" href={`${prefix}#top`} aria-label="AM. / Stage Separation — Ariston Michael, back to top">AM<span>.</span><span className="header-edition" aria-hidden="true">/ STAGE SEPARATION</span></a>
    <nav aria-label="Main navigation"><ul className="flex flex-wrap items-center gap-x-6 gap-y-2">{["Projects", "Experience", "About", "Contact"].map(label => <li key={label}><a href={`${prefix}#${label.toLowerCase()}`}>{label}</a></li>)}</ul></nav>
  </header>;
}
