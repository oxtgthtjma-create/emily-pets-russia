"use client";
import { useRef, type ReactNode } from "react";

export default function MobileMenu({ children }: { children: ReactNode }) {
  const details = useRef<HTMLDetailsElement>(null);
  return (
    <details
      className="mobile-menu"
      ref={details}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a") && details.current)
          details.current.open = false;
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && details.current) {
          details.current.open = false;
          details.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary>
        Меню
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M4 6h16M4 12h16M4 18h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </svg>
      </summary>
      <nav aria-label="Мобильная навигация">{children}</nav>
    </details>
  );
}
