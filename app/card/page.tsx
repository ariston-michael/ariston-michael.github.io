import Link from "next/link";
import type { Metadata } from "next";
import { OSWindow } from "@/components/OSWindow";
import { email, githubUrl, linkedInUrl } from "@/lib/content";
import { siteUrl, socialImage } from "@/lib/site";
export const metadata: Metadata = {
  title: "Ariston Michael | Ariston OS Contact Card",
  description:
    "Connect with Ariston Michael, Computer Science student specializing in Cloud Computing. Save contact details or explore the portfolio.",
  alternates: { canonical: "/card/" },
  openGraph: {
    title: "Ariston Michael — Contact Card",
    description: "Software, cloud computing, and a good conversation.",
    url: "/card/",
    type: "profile",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ariston Michael | Ariston OS Contact Card",
    description:
      "Connect with Ariston Michael. Save contact details or explore the portfolio.",
    images: [socialImage.url],
  },
};
export default function ContactCard() {
  return (
    <div id="top" className="card-site">
      <header className="card-header">
        <Link prefetch={false} href="/" className="card-brand">
          ▦ Ariston OS
        </Link>
        <span>CONTACT EDITION</span>
      </header>
      <main id="main" className="card-main" tabIndex={-1}>
        <OSWindow title="ariston.contact" meta="LET’S CONNECT">
          <div className="card-profile">
            <div
              className="portrait-placeholder"
              role="img"
              aria-label="Portrait placeholder — photo not yet supplied"
            >
              <span aria-hidden="true">AM</span>
              <span>PHOTO TO COME</span>
            </div>
            <p className="eyebrow">HELLO, I’M</p>
            <h1>Ariston Michael</h1>
            <p className="card-role">
              Computer Science student
              <br />
              Cloud Computing specialization
            </p>
            <p className="card-school">Sheridan College · Oakville, ON</p>
            <p className="status-label">
              <span />
              Seeking Summer 2027 internships
            </p>
          </div>
          <nav className="card-links" aria-label="Contact links">
            <a
              className="button button-primary"
              href="/ariston-michael.vcf"
              download="Ariston-Michael.vcf"
            >
              <span>
                Save contact
                <span className="button-note">
                  Download vCard · name, email & website
                </span>
              </span>
              <span aria-hidden="true">↓</span>
            </a>
            <a className="button" href={`mailto:${email}`}>
              <span>
                Email<span className="button-note">{email}</span>
              </span>
              <span aria-hidden="true">↗</span>
            </a>
            <a className="button" href={linkedInUrl}>
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
            <a className="button" href={githubUrl}>
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className="button" href={`${siteUrl}/`}>
              Portfolio website <span aria-hidden="true">↗</span>
            </a>
          </nav>
          <div className="window-status">
            <span>A small card. A new connection.</span>
            <span aria-hidden="true">:)</span>
          </div>
        </OSWindow>
        <p className="card-help">
          After downloading, open the contact file to add it to your address
          book.
        </p>
      </main>
      <footer className="card-footer">
        <Link prefetch={false} href="/">
          Explore Ariston OS <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </div>
  );
}
