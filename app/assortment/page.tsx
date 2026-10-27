import Image from "next/image";
import Link from "next/link";
import ProjectCta from "../../components/project-cta";
import { Arrow } from "../../components/icons";
import { categories } from "../../data/categories";
export const metadata = {
  title: "Ассортимент закупочного проекта",
  description:
    "Согласуйте позиции наполнителей и подстилок в одном проекте для российского рынка.",
  alternates: { canonical: "/assortment" },
};
export default function Assortment() {
  return (
    <>
      <section className="page-intro container">
        <Link className="breadcrumb" href="/">
          Главная
        </Link>
        <h1>
          Два направления.
          <br />
          Ваш ассортимент.
        </h1>
        <p className="lead">
          Выберите категории, которые планируете включить в закупочный проект.
          Конкретные исполнения и условия требуют подтверждения.
        </p>
        <div className="category-shortcuts">
          {categories.map((c) => (
            <a href={`#${c.id}`} key={c.id}>
              {c.title}
              <Arrow />
            </a>
          ))}
        </div>
      </section>
      <div className="container">
        {categories.map((c) => (
          <section className="category-detail" key={c.id} id={c.id}>
            <div className="detail-image">
              <Image
                src={c.image}
                alt={c.alt}
                fill
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2>{c.title}</h2>
              <p>{c.description}</p>
              <div className="material-list">
                {c.materials.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <h3>Что указать в проекте</h3>
              <ul className="input-list">
                {c.inputs.map((input) => (
                  <li key={input}>{input}</li>
                ))}
              </ul>
              <p className="caption">{c.note}</p>
              <Link className="button" href={`/project?category=${c.id}`}>
                Добавить в проект
                <Arrow />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <aside className="source-note container">
        <div>
          <h2>Нужны сведения о конкретном продукте?</h2>
          <p>
            Описания продукции и информация о производстве — на основном сайте
            Emily pets. Изображения здесь иллюстрируют категории и не заменяют
            спецификацию.
          </p>
        </div>
        <a className="inline-link" href="https://emilypets.com/ru/product/">
          Продукция Emily pets
          <Arrow />
        </a>
      </aside>
      <ProjectCta />
    </>
  );
}
