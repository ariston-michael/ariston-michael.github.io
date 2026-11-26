export function Footer({ home = true }: { home?: boolean }) {
  return (
    <footer className="shell footer">
      <p>
        Ariston OS <span aria-hidden="true">/</span> A workspace by Ariston
        Michael.
      </p>
      <div>
        <a href="/card/">Digital contact card ↗</a>
        <a href={home ? "#top" : "/#top"}>Back to top ↑</a>
      </div>
    </footer>
  );
}
