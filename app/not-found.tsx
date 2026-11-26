import Link from "next/link";
import { OSWindow } from "@/components/OSWindow";
import { PixelCompanion } from "@/components/PixelCompanion";
export default function NotFound() {
  return (
    <main id="main" className="shell not-found" tabIndex={-1}>
      <OSWindow title="system.message" meta="404">
        <div className="recovery-content">
          <PixelCompanion />
          <p className="eyebrow">404 / FILE NOT FOUND</p>
          <h1>A little off desktop.</h1>
          <p>This page isn’t in the workspace. Let’s get you back.</p>
          <Link prefetch={false} href="/" className="button button-primary">
            Return to Ariston OS ↗
          </Link>
          <a href="/card/" className="back-link">
            Looking for my contact card?
          </a>
        </div>
      </OSWindow>
    </main>
  );
}
