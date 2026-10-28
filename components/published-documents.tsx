import Image from "next/image";
const documents = [
  {
    title: "Оценка поставщика Alibaba.com",
    image: "supplier-assessment-published.jpg",
    original: "CERTIFICATION.jpg",
    type: "Gold Plus Supplier Assessment",
    description:
      "На копии указан Puyuan (Dalian) Pet Products Co., Ltd.; оценка площадки проведена SGS. Это оценка поставщика для платформы, а не сертификат качества каждого товара.",
    details:
      "Номер на копии: 483522203_T. Указанный период: 14.01.2026–13.01.2027. Текущий статус у эмитента отдельно не проверен.",
  },
  {
    title: "SGS · SDS для Tofu Cat Litter",
    image: "sgs-tofu-sds-published.jpg",
    original: "SGS-1.jpg",
    type: "Первая страница паспорта безопасности",
    description:
      "На странице указаны TOFU CAT LITTER, Puyuan (Dalian) Pet Products Co., Ltd. и SGS-CSTC (Qingdao). Паспорт безопасности не является сертификатом качества продукта.",
    details:
      "Номер на копии: DLF26-0003626-01A. Дата инспекции: 14.02.2026; подписи: 25.02.2026. На странице указана основа USA OSHA HCS-2024; это не подтверждение требований России.",
  },
  {
    title: "PTC · MSDS для Cat Litter",
    image: "ptc-msds-published.jpg",
    original: "MSDS-1.jpg",
    type: "Страница 1 из 9",
    description:
      "На опубликованной странице указаны CAT LITTER и Puyuan (Dalian) Pet Products Co., Ltd. Для состава и рекомендаций нужна полная версия для выбранного продукта.",
    details:
      "Дата выдачи на копии: 11.03.2025. Издатель: Precise Testing & Certification (Guangdong) Co., Ltd. Остальные страницы здесь не представлены.",
  },
  {
    title: "SMETA · CAPR, версия 7",
    image: "smeta-cover-published.jpg",
    original: "sedex_-1.jpg",
    type: "Опубликованная обложка отчёта",
    description:
      "На основном сайте размещена обложка Corrective Action Plan Report. На ней не видны проверяемые реквизиты площадки, дата и результаты аудита.",
    details:
      "Для оценки запросите полный отчёт и реквизиты площадки. Одна обложка не подтверждает прохождение аудита компанией.",
  },
];
export default function PublishedDocuments() {
  return (
    <section className="section container" id="published-documents">
      <div className="section-heading">
        <div>
          <span className="eyebrow">ОПУБЛИКОВАНО НА EMILYPETS.COM</span>
          <h2>Посмотрите документы сами</h2>
        </div>
        <p>Копии с основного сайта, просмотренные 28.10.2026.</p>
      </div>
      <div className="published-documents">
        {documents.map((doc) => (
          <article key={doc.image}>
            <a
              href={"/documents/" + doc.image}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={"Увеличить: " + doc.title + " (новая вкладка)"}
            >
              <Image
                src={"/documents/" + doc.image}
                alt={doc.title + " — опубликованная копия"}
                width={600}
                height={848}
                sizes="(max-width:560px) 100vw, (max-width:1000px) 50vw, 25vw"
              />
            </a>
            <div>
              <span className="evidence-tag">{doc.type}</span>
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
              <p className="caption">{doc.details}</p>
              <a
                href={
                  "https://emilypets.com/wp-content/uploads/2026/09/" +
                  doc.original
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Источник изображения ↗
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="caption published-note">
        Изображения не изменены. Наличие опубликованной копии и чтение её
        реквизитов не заменяют проверку подлинности, полного содержания и
        текущего статуса у выдавшей стороны.
      </p>
    </section>
  );
}
