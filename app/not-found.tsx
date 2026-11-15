import Link from "next/link";
import { RocketSketch } from "@/components/RocketSketch";
export default function NotFound() {
  return (
    <main id="main" className="not-found shell rocket-recovery" tabIndex={-1}>
      <div>
        <p className="eyebrow">404 / FLIGHT PATH NOT FOUND</p>
        <h1>
          A little
          <br />
          <span>off course.</span>
        </h1>
        <p className="section-copy">
          This route is off the flight plan. Head back to explore the projects.
        </p>
        <Link href="/" prefetch={false} className="button button-primary">
          Return to the portfolio <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <RocketSketch />
    </main>
  );
}
