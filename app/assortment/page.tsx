import PurchaseOptions from "../../components/purchase-options";
import Link from "next/link";
import ProductShowcase from "../../components/product-showcase";
import ProjectCta from "../../components/project-cta";
import { categories } from "../../data/categories";
import { Arrow } from "../../components/icons";
export const metadata = {
  title: "Ассортимент закупочного проекта",
  description:
    "Шесть направлений наполнителей и подстилок: выберите материал и добавьте его в русскоязычный закупочный проект.",
  alternates: { canonical: "/assortment" },
};
export default async function Assortment({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[] }>;
}) {
  const candidate = (await searchParams).category;
  const initialCategory =
    typeof candidate === "string" &&
    ["cat-litter", "bedding"].includes(candidate)
      ? candidate
      : "all";
  return (
    <>
      <section className="page-intro container">
        <Link className="breadcrumb" href="/">
          Главная
        </Link>
        <h1>
          Ассортимент, который
          <br />
          можно собрать в проект.
        </h1>
        <p className="lead">
          Продукция в упаковке Emily pets и под вашей маркой: сравните фасовки и
          характеристики.
        </p>
      </section>
      <div className="container tools-entry">
        <div>
          <strong>Сравните фасовки и подготовьте партию</strong>
          <p>Короба, цена за кг или литр и список вопросов до заказа.</p>
        </div>
        <Link className="inline-link" href="/tools">
          Инструменты покупателя <Arrow />
        </Link>
      </div>
      <PurchaseOptions />
      <section
        className="container catalog-section"
        aria-label="Направления продукции"
      >
        <ProductShowcase
          key={initialCategory}
          initialCategory={initialCategory}
        />
      </section>
      <section className="section container procurement-inputs">
        <div className="section-heading">
          <h2>
            За каждой позицией —<br />
            понятные параметры.
          </h2>
          <p>Неизвестные значения можно оставить на согласование.</p>
        </div>
        <div className="input-category-grid">
          {categories.map((category) => (
            <article id={category.id} key={category.id}>
              <h3>{category.title}</h3>
              <ul className="input-list">
                {category.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
              <p className="caption">{category.note}</p>
              <Link
                className="inline-link"
                href={"/project?category=" + category.id}
              >
                Перейти к проекту
                <Arrow />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <ProjectCta />
    </>
  );
}
