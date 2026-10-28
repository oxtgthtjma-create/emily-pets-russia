"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
function Cat({ wave }: { wave: number }) {
  return (
    <svg
      key={wave}
      className={wave ? "pet-cat pet-wave" : "pet-cat"}
      viewBox="0 0 80 80"
      width="48"
      height="48"
      aria-hidden="true"
    >
      <path
        d="m16 30 2-22 20 15h5L64 8l2 25c12 30-2 41-26 41S3 60 16 30Z"
        fill="#e9dfc8"
        stroke="#173f35"
        strokeWidth="2"
      />
      <path d="m22 24 1-9 9 10m17 0 10-10 1 10" fill="#e6b5a3" />
      <ellipse cx="28" cy="43" rx="3" ry="4" fill="#173f35" />
      <ellipse cx="52" cy="43" rx="3" ry="4" fill="#173f35" />
      <path
        d="m36 52 4 3 4-3m-4 3v5m-14-8-13-3m13 9-14 2m42-8 13-3m-13 9 14 2"
        stroke="#173f35"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M55 68q14-19 16-6t-8 14"
        fill="#e9dfc8"
        stroke="#173f35"
        strokeWidth="2"
      />
    </svg>
  );
}
export default function PetAssistant() {
  const [open, setOpen] = useState(false);
  const [pets, setPets] = useState(0);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (open) close.current?.focus();
  }, [open]);
  function dismiss() {
    setOpen(false);
    toggle.current?.focus();
  }
  return (
    <div
      className="pet-assistant"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          dismiss();
        }
      }}
    >
      {open && (
        <aside id="pet-assistant-panel" aria-label="Помощник по сайту">
          <div className="pet-panel-heading">
            <h2>Давайте познакомимся!</h2>
            <button
              ref={close}
              type="button"
              onClick={dismiss}
              aria-label="Закрыть помощника"
            >
              ×
            </button>
          </div>
          <p>Я помогу найти интересное на сайте.</p>
          <div className="pet-play">
            <Cat wave={pets} />
            <button type="button" onClick={() => setPets(pets + 1)}>
              Погладить кота
            </button>
          </div>
          <p className="pet-tip" role="status">
            {pets === 0
              ? "Выберите, что хотите попробовать."
              : [
                  "Мур! Попробуйте собрать цветовой эскиз упаковки.",
                  "Мур-мур! В тесте всего три вопроса.",
                  "Спасибо! Нажмите на материал и узнайте его параметры.",
                ][(pets - 1) % 3]}
          </p>
          <nav aria-label="Подсказки помощника">
            <Link href="/explore#studio" onClick={() => setOpen(false)}>
              Упаковка на вашей полке →
            </Link>
            <Link href="/explore#quiz" onClick={() => setOpen(false)}>
              Короткий тест по ассортименту →
            </Link>
            <Link href="/explore#materials" onClick={() => setOpen(false)}>
              Интерактивные материалы →
            </Link>
            <Link href="/tools" onClick={() => setOpen(false)}>
              Калькуляторы покупателя →
            </Link>
          </nav>
        </aside>
      )}
      <button
        className="pet-toggle"
        type="button"
        ref={toggle}
        aria-label={open ? "Свернуть помощника" : "Открыть помощника по сайту"}
        aria-expanded={open}
        aria-controls={open ? "pet-assistant-panel" : undefined}
        onClick={() => (open ? dismiss() : setOpen(true))}
      >
        <Cat wave={0} />
      </button>
    </div>
  );
}
