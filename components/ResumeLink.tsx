import { resumeUrl } from "@/lib/content";

export function ResumeLink() {
  return (
    <a
      href={resumeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Resume Google Drive — Ariston Michael (opens in a new tab)"
    >
      Resume{" "}
      <span className="todo-inline">
        Google Drive <span aria-hidden="true">↗</span>
      </span>
    </a>
  );
}
