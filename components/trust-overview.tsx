import Link from "next/link";
import { evidenceCards } from "../data/trust-evidence";
export default function TrustOverview() {
  return (
    <section
      className="section container trust-overview"
      aria-label="Компания, источники и документы"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">КОМПАНИЯ · ИСТОЧНИКИ · ДОКУМЕНТЫ</span>
          <h2>Основа для уверенного выбора</h2>
        </div>
        <Link className="inline-link" href="/trust">
          Компания и документы →
        </Link>
      </div>
      <div className="trust-cards">
        {evidenceCards.map((card) => (
          <article key={card.title}>
            <span className="evidence-tag">{card.tag}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            {card.href.startsWith("/") ? (
              <Link href={card.href}>{card.label} →</Link>
            ) : (
              <a href={card.href} target="_blank" rel="noopener noreferrer">
                {card.label}
              </a>
            )}
          </article>
        ))}
      </div>
      <p className="caption">
        Открытые источники проверены 28.10.2026. Сведения компании и внешние
        публикации имеют разный статус; действительность документов оценивается
        отдельно.
      </p>
    </section>
  );
}
