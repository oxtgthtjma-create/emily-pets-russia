import Link from "next/link";
import ProjectForm from "../../components/project-form";
import { DocumentIcon } from "../../components/icons";
import { projectCategoryNames } from "../../data/categories";
import { purchaseModes } from "../../data/product-facts";
import { getShowcaseProduct } from "../../data/products";
export const metadata = {
  title: "Русскоязычная спецификация закупочного проекта",
  description:
    "Создайте локальный файл проекта с категориями, SKU, фасовкой и вопросами для согласования.",
  alternates: { canonical: "/project" },
};
export default async function Project({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string | string[];
    product?: string | string[];
    mode?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const product = getShowcaseProduct(
    typeof query.product === "string" ? query.product : undefined,
  );
  const selectedMode =
    typeof query.mode === "string" && Object.hasOwn(purchaseModes, query.mode)
      ? query.mode
      : "brand";
  const category = product?.category ?? query.category;
  const selectedCategory =
    typeof category === "string" &&
    Object.hasOwn(projectCategoryNames, category)
      ? category
      : "";
  return (
    <section className="container project-page">
      <div className="page-intro">
        <Link className="breadcrumb" href="/">
          Главная
        </Link>
        <h1>
          Соберите свой
          <br />
          закупочный проект.
        </h1>
        <p className="lead">
          От категории и упаковки — до вопросов, которые важно согласовать.
        </p>
      </div>
      <div className="project-layout">
        <ProjectForm
          key={selectedCategory + (product?.id ?? "") + selectedMode}
          initialMode={selectedMode}
          initialCategory={selectedCategory}
          initialItems={
            product
              ? product.name +
                ": фасовка, упаковка и количество на согласование."
              : ""
          }
        />
        <aside className="project-help">
          <DocumentIcon />
          <h2>Ясное задание для следующего шага</h2>
          <p>
            Для каждой позиции укажите материал, фасовку и количество. Если
            параметр неизвестен, напишите «на согласование».
          </p>
          <ol>
            <li>Заполните требования.</li>
            <li>Скачайте документ.</li>
            <li>Передайте его поставщику самостоятельно.</li>
          </ol>
          <p className="caption">
            Файл создаётся на вашем устройстве. Данные не отправляются и не
            сохраняются на сервере. Не включайте персональные или
            конфиденциальные сведения.
          </p>
          <Link className="inline-link" href="/assortment">
            Вернуться к направлениям
          </Link>
        </aside>
      </div>
    </section>
  );
}
