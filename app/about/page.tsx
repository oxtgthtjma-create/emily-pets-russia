import Image from "next/image";
import Link from "next/link";
import ProjectCta from "../../components/project-cta";
import { Arrow, BoxIcon, DocumentIcon } from "../../components/icons";
import { ArticleCard } from "../../components/article-card";
import { articles } from "../../data/articles";
export const metadata = {
  title: "О компании и бренде Emily pets",
  description:
    "Emily pets и Puyuan (Dalian) Pet Products Co., Ltd.: направления продукции и работа с требованиями российского закупочного проекта.",
  alternates: { canonical: "/about" },
};
const facts = [
  ["Бренд", "Emily pets"],
  ["Компания", "Puyuan (Dalian) Pet Products Co., Ltd."],
  ["Город", "Далянь, Китай"],
  ["Направления", "Наполнители и подстилки"],
];
export default function About() {
  return (
    <>
      <section className="company-hero container">
        <div className="company-hero-copy">
          <h1>
            Emily pets.
            <br />
            От материала —<br />к ассортименту.
          </h1>
          <p>
            Наполнители для кошек и подстилки для мелких животных — в понятной
            структуре для закупочных команд.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/assortment">
              Ассортимент
            </Link>
            <Link className="inline-link" href="/project">
              Подготовить проект
              <Arrow />
            </Link>
          </div>
        </div>
        <Image
          src="/images/hero-cat.webp"
          alt="Иллюстрация направлений Emily pets: кошка и образцы материалов"
          fill
          sizes="100vw"
          priority
        />
      </section>
      <section className="section container company-identity">
        <div>
          <h2>Бренд и компания</h2>
          <p>
            Emily pets — бренд компании Puyuan (Dalian) Pet Products Co., Ltd.
            Компания находится в Даляне, Китай.
          </p>
          <p>
            Эта связь указана в профиле на основном сайте Emily pets. Здесь мы
            сосредоточены на наполнителях для кошек и подстилках для мелких
            животных — и требованиях к вашему закупочному проекту.
          </p>
          <a className="inline-link" href="https://emilypets.com/about-us/">
            Профиль на основном сайте
            <Arrow />
          </a>
        </div>
        <dl className="company-facts">
          {facts.map(([name, value]) => (
            <div key={name}>
              <dt>{name}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="company-principles container">
        <h2>Один язык. Ясные требования.</h2>
        <p>
          Российский сайт помогает собрать позиции, фасовку и версию закупочного
          проекта в одном документе.
        </p>
        <div className="principle-grid">
          <article>
            <BoxIcon />
            <h3>Материал</h3>
            <p>
              Название и состав — по согласованной спецификации. Каждый вариант
              сохраняется отдельной позицией.
            </p>
          </article>
          <article>
            <BoxIcon />
            <h3>Упаковка</h3>
            <p>
              Версия макета и фасовка — для каждой позиции. Условия и оформление
              подтверждаются отдельно.
            </p>
          </article>
          <article>
            <DocumentIcon />
            <h3>Партия</h3>
            <p>
              Количество, единица измерения и направление — исходные данные для
              обсуждения конкретных условий.
            </p>
          </article>
        </div>
      </section>
      <section className="company-workflow container">
        <div>
          <h2>
            От первого списка
            <br />к предметному разговору.
          </h2>
          <p>
            Систематизируйте запрос в понятный проект: с выбранными материалами,
            упаковкой и параметрами партии.
          </p>
          <p className="caption">
            Файл формируется в вашем браузере. Он не подтверждает заказ или
            наличие и не отправляется поставщику автоматически.
          </p>
        </div>
        <ol>
          {[
            [
              "Выберите направление",
              "Определите категории и позиции, которые вам интересны.",
            ],
            [
              "Зафиксируйте параметры",
              "Укажите материал, упаковку и объём партии.",
            ],
            ["Сохраните проект", "Получите файл для дальнейшего обсуждения."],
          ].map(([title, text], i) => (
            <li key={title}>
              <span>0{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <section className="section container">
        <h2>Полезно перед началом проекта</h2>
        <div className="article-grid related-articles">
          {[articles[0], articles[2]].map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
      <ProjectCta />
      <aside className="company-source container">
        <p>
          Сведения о бренде и компании:{" "}
          <a href="https://emilypets.com/about-us/">основной сайт Emily pets</a>
          . Изображения материалов и животных иллюстративные. Актуальные
          характеристики, документы и коммерческие условия подтверждаются для
          конкретной поставки.
        </p>
      </aside>
    </>
  );
}
