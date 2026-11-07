import { MotionToggle } from "./MotionToggle";
export function Footer({ home = true }: { home?: boolean }) {
  const top = home ? "#top" : "/#top";
  return (
    <footer className="shell footer">
      <a className="wordmark" href={top}>
        AM<span className="text-cyan-200">.</span>
      </a>
      <p>
        Ariston Michael <span aria-hidden="true">/</span> Made with curiosity.
      </p>
      <MotionToggle />
      <a href="#top">Back to top ↑</a>
    </footer>
  );
}
