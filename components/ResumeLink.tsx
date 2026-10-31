import { resumeUrl } from "@/lib/content";

export function ResumeLink() {
  return resumeUrl ? (
    <a href={resumeUrl} download="Ariston_Michael.pdf">
      Resume <span className="todo-inline">Download PDF</span>
    </a>
  ) : (
    <span>
      Resume <span className="todo-inline">PDF not yet available</span>
    </span>
  );
}
