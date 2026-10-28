import PublishedDocuments from "../../components/published-documents";
import Link from "next/link";
import TrustOverview from "../../components/trust-overview";
import { documentTypes, documentRequest } from "../../data/trust-evidence";
export const metadata = {
  title: "Компания, документы и проверка сведений",
  description:
    "Открытые сведения о компании Emily pets, источники характеристик, внешняя карточка товара и порядок запроса документов.",
  alternates: { canonical: "/trust" },
};
const companySchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Puyuan (Dalian) Pet Products Co., Ltd.",
  url: "https://emilypets.com/",
  telephone: "+86-411-39020511",
  email: "emily@emilypets.com",
  brand: { "@type": "Brand", name: "Emily pets" },
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "704/705/706 Europark Soho A1, No. 96 Changjiang East Road, Zhongshan District",
    addressLocality: "Dalian",
    addressCountry: "CN",
  },
};
export default function Trust() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(companySchema).replace(/</g, "\\u003c"),
        }}
      />
      <section className="page-intro container">
        <Link href="/" className="breadcrumb">
          Главная
        </Link>
        <h1>
          Доверие начинается
          <br />с открытых документов.
        </h1>
        <p className="lead">
          Узнайте, кто стоит за брендом, откуда взяты характеристики и какие
          документы запросить по вашему продукту.
        </p>
        <nav className="tools-shortcuts" aria-label="Документы и источники">
          <a href="#published-documents">Опубликованные документы ↓</a>
          <a href="#documents">Проверка области ↓</a>
          <a href="#verification">Порядок проверки ↓</a>
          <Link href="/about">О компании →</Link>
        </nav>
      </section>
      <TrustOverview />
      <PublishedDocuments />
      <section className="section container trust-documents" id="documents">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ДОКУМЕНТЫ ПО ВАШЕМУ ПРОЕКТУ</span>
            <h2>Проверьте область применения</h2>
          </div>
          <p>
            На основном сайте перечислены ISO 9001, SGS, BSCI, Sedex и MSDS.
          </p>
        </div>
        <div className="document-note">
          <strong>Статус документов на этом сайте</strong>
          <p>
            Опубликованные копии показаны выше. Для закупки запросите полные
            версии и сопоставьте держателя, площадку, область и текущий статус с
            выдавшей стороной. Упоминание стандарта или наличие копии не
            означают подтверждённую сертификацию всей продукции.
          </p>
          <a
            href="https://emilypets.com/about-us/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Посмотреть исходное упоминание ↗
          </a>
        </div>
        <div className="document-grid">
          {documentTypes.map((doc) => (
            <article key={doc.name}>
              <span className="evidence-tag">Проверяйте полный документ</span>
              <h3>{doc.name}</h3>
              <p className="document-type">{doc.type}</p>
              <p>{doc.scope}</p>
              <details>
                <summary>Что запросить и сопоставить</summary>
                <p>{doc.request}</p>
                <a href={doc.guide} target="_blank" rel="noopener noreferrer">
                  {doc.label}
                </a>
              </details>
              <a className="inline-link" href={documentRequest(doc.name)}>
                Запросить документ по email →
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="section container" id="verification">
        <div className="trust-verification">
          <div>
            <h2>От источника — к вашей партии</h2>
            <p>
              Название стандарта или логотип не заменяют проверку конкретного
              документа.
            </p>
            <a
              className="button"
              href={documentRequest("Пакет документов для закупочного проекта")}
            >
              Открыть запрос по email
            </a>
            <p className="caption">
              Откроется почтовая программа. Вы проверяете и отправляете письмо
              самостоятельно.
            </p>
          </div>
          <ol>
            <li>
              <strong>Уточните продукт и площадку</strong>
              <p>
                Код позиции, состав, фасовка и юридическое лицо в документе
                должны соответствовать предмету закупки.
              </p>
            </li>
            <li>
              <strong>Сопоставьте реквизиты</strong>
              <p>
                Номер, даты, область и адрес площадки; для испытаний — образец,
                показатели и методика.
              </p>
            </li>
            <li>
              <strong>Проверьте у выдавшей стороны</strong>
              <p>
                Используйте официальный реестр или контакт органа выдачи. Общая
                ссылка на организацию не подтверждает документ.
              </p>
            </li>
            <li>
              <strong>Согласуйте пакет для поставки</strong>
              <p>
                Перед заказом сопоставьте документы со спецификацией и
                требованиями вашего импортёра.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
