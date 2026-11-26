import { buildVCard, vCardFileName } from "@/lib/card";

// Generated once at build time into out/card/ariston-michael.vcf.
// GitHub Pages serves .vcf as text/vcard from the extension; these headers
// apply to `next dev` only.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildVCard(), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${vCardFileName}"`,
    },
  });
}
