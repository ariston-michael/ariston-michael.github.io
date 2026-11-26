import type { ReactNode } from "react";

/** Window chrome is decorative; only real actions are rendered as controls. */
export function WindowBar({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="window-bar">
      <span className="window-mark" aria-hidden="true">
        ▦
      </span>
      <span>{title}</span>
      <span className="window-meta">{meta}</span>
      <span className="window-chrome" aria-hidden="true">
        ━ □
      </span>
    </div>
  );
}
export function OSWindow({
  title,
  meta,
  children,
  className = "",
}: {
  title: string;
  meta?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`os-window ${className}`}>
      <WindowBar title={title} meta={meta} />
      {children}
    </div>
  );
}
