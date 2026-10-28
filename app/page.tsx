import TrustOverview from "../components/trust-overview";
import PurchaseOptions from "../components/purchase-options";
import Image from "next/image";
import Link from "next/link";
import CategoryCards from "../components/category-cards";
import ProductShowcase from "../components/product-showcase";
import BlogPreview from "../components/article-card";
import ProjectCta from "../components/project-cta";
import {
  Arrow,
  BoxIcon,
  Chevron,
  DocumentIcon,
  DownloadIcon,
} from "../components/icons";
export const metadata = { alternates: { canonical: "/" } };
const steps = [
  {
    title: "Выберите направление",
    text: "Укажите категории: наполнители для кошек, подстилки для мелких животных или оба направления.",
    Icon: BoxIcon,
  },
  {
    title: "Уточните детали",
    text: "Опишите ключевые параметры: материал, упаковку, объём, особенности и пожелания.",
    Icon: DocumentIcon,
  },
  {
    title: "Сохраните проект",
    text: "Скачайте файл с собранными параметрами, чтобы обсудить конкретные условия.",
    Icon: DownloadIcon,
  },
];
const questions = [
  {
    title: "Можно объединить наполнители и подстилки?",
    answer:
      "Да. Выберите «Наполнители и подстилки» в форме проекта. В описании укажите каждую позицию отдельно: материал, фасовку и количество.",
  },
  {
    title: "Что делать, если параметры ещё не определены?",
    answer:
      "Запишите известные требования, а остальные отметьте как «на согласование». MOQ, сроки, документы и логистика подтверждаются поставщиком для конкретного проекта.",
  },
  {
    title: "Отправляется ли документ поставщику?",
    answer:
      "Нет. Файл создаётся в вашем браузере и скачивается на ваше устройство. Сайт не отправляет его поставщику и не оформляет заказ.",
  },
];
export default function Home() {
  return (
    <>
      <section className="hero container">
        <Image
          className="hero-image"
          src="/images/hero-cat.webp"
          alt="Кошка рядом с образцами гранул и древесной стружки — иллюстрация направлений ассортимента"
          fill
          sizes="100vw"
          priority
        />
        <div className="hero-copy">
          <h1>
            Забота о питомцах.
            <br />
            Продуманный ассортимент.
          </h1>
          <p>
            Наполнители и подстилки Emily pets
            <br className="desktop-break" /> для закупочных команд российского
            рынка.
          </p>
          <div className="hero-actions">
            <Link className="button" href="#directions">
              Выбрать направление
            </Link>
            <Link className="inline-link" href="/project">
              Подготовить проект
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <PurchaseOptions />
      <div className="benefits container">
        <div>
          <span className="benefit-icon">
            <BoxIcon />
          </span>
          <div>
            <h2>Две категории</h2>
            <p>Наполнители для кошек и подстилки для мелких животных.</p>
          </div>
        </div>
        <div>
          <span className="benefit-icon">
            <DocumentIcon />
          </span>
          <div>
            <h2>Понятная спецификация</h2>
            <p>Материал, фасовка и параметры для согласования.</p>
          </div>
        </div>
        <div>
          <span className="benefit-icon">
            <DownloadIcon />
          </span>
          <div>
            <h2>Один документ проекта</h2>
            <p>Ваши требования в файле для дальнейшего обсуждения.</p>
          </div>
        </div>
      </div>
      <TrustOverview />
      <section id="directions" className="section container">
        <div className="section-heading">
          <h2>Начните с вашего направления</h2>
          <p>Выберите категорию и соберите требования к закупке.</p>
        </div>
        <CategoryCards />
      </section>
      <section className="section container home-products">
        <div className="section-heading">
          <h2>Материалы для вашего проекта</h2>
          <Link className="inline-link" href="/assortment">
            Весь ассортимент
            <Arrow />
          </Link>
        </div>
        <ProductShowcase />
      </section>
      <section className="brief-banner container">
        <Image src="/images/project-brief.webp" alt="" fill sizes="100vw" />
        <div>
          <h2>Отдельные позиции. Единый проект.</h2>
          <p>
            Зафиксируйте SKU, версию упаковки и объём партии в одном документе.
          </p>
          <Link className="button" href="/project">
            Собрать спецификацию
            <Arrow />
          </Link>
        </div>
      </section>
      <section id="how-it-works" className="section container">
        <h2>От выбора — к ясному заданию</h2>
        <div className="steps">
          {steps.map(({ title, text, Icon }, i) => (
            <article key={title}>
              <span className="step-number">0{i + 1}</span>
              <Icon className="step-icon" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <BlogPreview />
      <section className="faq section container">
        <h2>Перед началом проекта</h2>
        {questions.map((q) => (
          <details key={q.title}>
            <summary>
              {q.title}
              <Chevron />
            </summary>
            <p>{q.answer}</p>
          </details>
        ))}
      </section>
      <ProjectCta />
    </>
  );
}
