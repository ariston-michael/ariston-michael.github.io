import Link from "next/link";
import { PlanetIllustration } from "@/components/PlanetIllustration";
export default function NotFound() {
  return (
    <main id="main" className="not-found shell" tabIndex={-1}>
      <div>
        <p className="eyebrow">404 / OUTSIDE THIS ORBIT</p>
        <h1>
          A little
          <br />
          <span>off course.</span>
        </h1>
        <p className="section-copy">
          This page isn’t in the constellation. Head back to explore the
          projects.
        </p>
        <Link href="/" prefetch={false} className="button button-primary">
          Return to the portfolio <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <PlanetIllustration />
    </main>
  );
}
